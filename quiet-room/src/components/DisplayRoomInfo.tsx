import React, { useEffect, useState } from 'react'
import { uuid } from 'uuidv4'
import axios from 'axios'
import { useRouter } from 'next/router'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import {
  Alert,
  Box,
  Collapse,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material'
import buildingsList from '@/api/buildings.json'
import MechButton from './MechButton'
import CardRoomInfo from './CardRoomInfo'
import CloseIcon from '@mui/icons-material/Close'
import Event from '@/interfaces/Event'
import Scheduler from './Scheduler'

// Convert API returned time format to output format
function convertTime(timeVal: string) {
  let hour = parseInt(timeVal.substring(0, 2))
  let min = timeVal.substring(2, 4)
  let opt = 'AM'

  if (hour == 12) {
    opt = 'PM'
  }
  if (hour > 12) {
    hour -= 12
    opt = 'PM'
  }
  if (hour == 0) {
    hour = 12
  }

  return hour.toString() + ':' + min + ' ' + opt
}

// Determine current data based on end date
function isValidEndDate(dateVal: string) {
  // Get current date
  let today = new Date()

  // Parse dateVal to create date object
  let year = parseInt(dateVal.substring(0, 4))
  let month = parseInt(dateVal.substring(5, 7))
  let day = parseInt(dateVal.substring(8, 10))

  // Create date object for dateVal
  let endDate = new Date()
  endDate.setFullYear(year)
  endDate.setMonth(month - 1)
  endDate.setDate(day)

  // If end date is in the PAST, not valid: return false
  if (endDate < today) {
    return false
  } else {
    return true
  }
}

// Determine current data based on start date
function isValidStartDate(dateVal: string) {
  // Get current date
  let today = new Date()

  // Parse dateVal to create date object
  let year = parseInt(dateVal.substring(0, 4))
  let month = parseInt(dateVal.substring(5, 7))
  let day = parseInt(dateVal.substring(8, 10))

  // Create date object for dateVal
  let startDate = new Date()
  startDate.setFullYear(year)
  startDate.setMonth(month - 1)
  startDate.setDate(day)

  // Add buffer for new semester, 2 weeks = 14 days
  today.setDate(today.getDate() + 14)
  console.log(startDate + ' > ' + today)

  // If start date is in the FUTURE, not valid: return false
  if (startDate > today) {
    return false
  } else {
    return true
  }
}

// Determine current semester data
function cleanEvents(arr: any) {
  let newArr = []

  for (let i = 0; i < arr.length; i++) {
    let endDate = arr[i].EndDate
    let startDate = arr[i].StartDate

    // If end date is in the future, push event to new array
    if (isValidEndDate(endDate) && isValidStartDate(startDate)) {
      newArr.push(arr[i])
    }
  }

  return newArr
}

// Convert API returned date format to output format
function parseDate(dateVal: string) {
  
  // Parse dateVal to create date object
  let year = parseInt(dateVal.substring(0, 4))
  let month = parseInt(dateVal.substring(5, 7))
  let day = parseInt(dateVal.substring(8, 10))

  // console.log month.toString() + '/' + day.toString() + '/' + year.toString()
  return month.toString() + '/' + day.toString() + '/' + year.toString()
  
}

// Define list component columns
const columns: GridColDef[] = [
  { field: 'Name', headerName: 'Classname', width: 100 },
  { field: 'DaysMet', headerName: 'Days Met', sortingOrder: ['desc', 'asc'], width: 220 },
  { field: 'StartTime', headerName: 'Start Time', width: 100 },
  { field: 'EndTime', headerName: 'End Time', width: 100 },
  { field: 'StartDate', headerName: 'Start Date', width: 100 },
  { field: 'EndDate', headerName: 'End Date', width: 100 },
]


export default function DisplayRoomInfo() {
  let getBuildingQ = useRouter()?.query?.building
  let getNumQ = useRouter()?.query?.num
  // Toggle states
  const [submitToggle, setSubmitToggle] = useState(false) // Submit toggle
  const [invalidAlertOpen, setInvalidAlertOpen] = useState(false) // Input error alert toggle
  const [disabledAlertOpen, setdisabledAlertOpen] = useState(false) // Disabled select alert toggle
  const [buildingInvalid, setBuildingInvalid] = useState(false) // Building input validation status
  const [roomInvalid, setRoomInvalid] = useState(false) // Room number input validation status
  const [roomDisabled, setRoomDisabled] = useState(true) // Room number input disabled status

  // Room information
  const [events, setEvents] = useState<Event[]>([])
  const [building, setBuilding] = useState<string>(getBuildingQ != null ? getBuildingQ.toString() : '') // Set to query?.building, otherwise empty
  const [num, setNum] = useState<string>(getNumQ != null ? getNumQ.toString : '') // Set to query?.num, otherwise empty
  const [roomsList, setRoomsList] = useState<string[]>([])  // Set list of rooms for selected building

  // Card information
  const [cardTitle, setCardTitle] = useState('')
  const [cardCapacity, setCardCapacity] = useState('')
  const [cardRoomType, setCardRoomType] = useState('')
  const [cardIcon, setCardIcon] = useState('')

  // Loading states
  const [loadingData, setLoadingData] = useState<boolean>(false) // Data grid loading state
  const [cardLoading, setCardLoading] = useState('empty') // Card loading state
  const [schedulerToggle, setSchedulerToggle] = useState(true) // Scheduler component loading state

  // API CALL -> Get room info for given building and room number
  const getRoomInfo = async () => {
    try {
      setLoadingData(true)
      setCardLoading('loading')
      await axios.get(`https://uah.quietroom.app/building/${building}/room/${num}`).then((response) => {
        console.log(`https://uah.quietroom.app/building/${building}/room/${num}`)
        console.log(response)
        let readRooms = response?.data.Events
        readRooms = cleanEvents(readRooms)
        let addID = readRooms.map((element: any) => ({
          ...element,
          DaysMet: element.DaysMet.toString().replaceAll(',', ' - '),
          StartTime: convertTime(element.StartTime),
          EndTime: convertTime(element.EndTime),
          RawStartTime: element.StartTime,
          RawEndTime: element.EndTime,
          StartDate: parseDate(element.StartDate),
          EndDate: parseDate(element.EndDate),
          EventID: uuid(),
        }))

        setEvents(addID)

        // Set card Title and Capacity
        setCardTitle(response?.data.BuildingCode + ' ' + response?.data.RoomNumber)
        setCardCapacity(response?.data.Capacity)

        // Set card Room Type
        const tempType = response?.data.RoomType
        if (tempType.includes('Lab')) setCardRoomType(tempType.substring(0, 3) + ' - ' + tempType.substring(4))
        else if (tempType.includes('*')) setCardRoomType(tempType.substring(1))
        else setCardRoomType(response?.data.RoomType)

        // Set card Icon
        if (tempType.includes('Classroom')) {
          setCardIcon('book-solid.svg')
        } else if (tempType.includes('Computer') || tempType.includes('Graphics')) {
          setCardIcon('desktop-solid.svg')
        } else if (tempType.includes('Lab')) {
          setCardIcon('flask-solid.svg')
        } else if (tempType.includes('Auditorium')) {
          setCardIcon('auditorium.png')
        } else {
          setCardIcon('info.png')
        }

        setLoadingData(false)
        setCardLoading('set')
      })
    } catch (error: any) {
      console.log(error?.message) // Log error message to console

      setLoadingData(false)
      setCardLoading('empty')
    }
  }

  // API CALL -> Get rooms list for selected building
  const getBuildingRooms = async (buildingID: string) => {
    try {
      await axios.get(`https://uah.quietroom.app/building/${buildingID}/rooms`).then((response) => {
        let data = response?.data
        let readRooms: string[] = []
        data.map((item: any) => {
          readRooms.push(item.roomNumber)
          console.log(building + ' ' + item.roomNumber)
        })
        readRooms.sort()
        setRoomsList(readRooms)
      })
    } catch (error: any) {
      console.log(error)
    }
  }

  // On submit, make API call
  const handleSubmit = (e: any) => {

    setBuildingInvalid(false)
    setRoomInvalid(false)
    
    if (building != '' && num != '') {
      setInvalidAlertOpen(false)
      setdisabledAlertOpen(false)
      setSchedulerToggle(!schedulerToggle)
      setSubmitToggle(!submitToggle)

      getRoomInfo()
    } else {
      console.log('ERROR: Invalid input')
      setInvalidAlertOpen(true)
      setdisabledAlertOpen(false)
    }
    if (building == '') {
      setBuildingInvalid(true)
    }
    if (num == '') {
      setRoomInvalid(true)
    }
  }

  // Set building number
  const handleBuilding = (e: any) => {
    console.log(e.target.value)
    setRoomDisabled(false)
    setdisabledAlertOpen(false)

    if (building != e.target.value) {
      setBuilding(e.target.value)
      setNum('')
    }
    getBuildingRooms(e.target.value)
  }

  // Set room number
  const handleRoomNumber = (e: any) => {
    console.log(e.target.value)
    setNum(e.target.value.toUpperCase())
  }

  // Set room number message status
  const handleRoomNumberMessage = (e: any) => {
    if (building == '') {
      console.log('No building is selected, no room list available')
      setdisabledAlertOpen(true)
    }
  }

  // Use Effect: Update local storage for building
  useEffect(() => {
    localStorage.setItem('building', JSON.stringify(building))
  }, [building])

  // Use Effect: Update local storage for room number
  useEffect(() => {
    localStorage.setItem('num', JSON.stringify(num))
  }, [num])

  // Use Effect: Search based on query on first render
  useEffect(() => {
    if (building != '' && num != '') {
      setRoomDisabled(false)
      getRoomInfo()
    }
    if (building != '') {
      setRoomDisabled(false)
      getBuildingRooms(building)
    }
  }, [])

  // Loading state for page
  if (events === undefined) {
    return <>Still loading...</>
  }

  return (
    <>

      <Grid container columns={{xs: 3, sm: 9, md: 12}} rowGap={2}
        width={'100%'} justifyContent={'space-between'} alignItems={'center'}
      >
        <Grid item xs={3} sm={3} md={4}>
          <FormControl error={buildingInvalid} sx={{ width: '100%' }}>
            <InputLabel id="building-select-label">Building</InputLabel>
            <Select
              labelId="building-select-label"
              id="building-select"
              defaultValue={getBuildingQ}
              value={building}
              onChange={handleBuilding}
              variant="outlined"
              label="Building"
              sx={{ width: '100%', borderRadius: '15px' }}
            >
              {buildingsList.map((buildingID: any) => (
                <MenuItem value={buildingID} key={buildingID}>
                  {buildingID}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3} sm={3} md={4}>
          <FormControl error={roomInvalid} sx={{ width: '100%' }} disabled={roomDisabled} onClick={handleRoomNumberMessage}>
            <InputLabel id="room-select-label">Room Number</InputLabel>
            <Select
              labelId="room-select-label"
              id="room-select"
              defaultValue={getNumQ}
              value={num}
              onChange={handleRoomNumber}
              variant="outlined"
              label="Room Number"
              sx={{ width: '100%', borderRadius: '15px' }}
            >
              {roomsList.map((roomNumber: any) => (
                <MenuItem value={roomNumber} key={roomNumber}>
                  {roomNumber}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3} sm={2} md={3}>
          <div onClick={handleSubmit}>
            <MechButton href={''} text={'Search'} width={'100%'} fontSize={'3vh'} search={true}></MechButton>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Collapse in={invalidAlertOpen}>
            <Alert
              variant="filled"
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setInvalidAlertOpen(false)
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2, borderRadius: '15px' }}
            >
              Invalid input. Please try again!
            </Alert>
          </Collapse>
          <Collapse in={disabledAlertOpen}>
            <Alert
              variant="filled"
              severity="warning"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setdisabledAlertOpen(false)
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2, borderRadius: '15px' }}
            >
              Please select a building before choosing a room!
            </Alert>
          </Collapse>
        </Grid>
      </Grid>

      <hr />
      <br></br>

      <Stack spacing={5} direction={{md: 'column', lg: 'row'}} justifyContent={'center'} alignItems={'flex-start'} rowGap={1}>
        <Box width={'100%'}>
          <CardRoomInfo
            state={cardLoading}
            cardTitle={cardTitle}
            cardRoomType={cardRoomType}
            cardCapacity={cardCapacity}
            cardIcon={cardIcon}
          />
        </Box>
        <Box width={'100%'}>
          <DataGrid
            autoHeight
            slots={{
              loadingOverlay: LinearProgress,
            }}
            rows={events!}
            getRowId={(row) => row.EventID}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
              sorting: {
                sortModel: [{ field: 'DaysMet', sort: 'asc' }],
              },
            }}
            pageSizeOptions={[10]}
            loading={loadingData}
            sx={{
              color: '#181848',
              borderRadius: 5,
              border: 2,
              '& .MuiDataGrid-row': {
                transition: 'all 0.15s ease-in-out',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#181848',
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                color: '#E0DDDD',
              },
              '& .MuiDataGrid-sortIcon': {
                opacity: 1,
                color: '#E0DDDD',
              },
              '& .MuiDataGrid-menuIconButton': {
                opacity: 1,
                color: '#E0DDDD',
              },
            }}
          />
        </Box>
      </Stack>

      <br></br>
      <hr />
      <br></br>

      <Scheduler rawEvents={events} toggle={schedulerToggle}></Scheduler>

    </>
  )
}