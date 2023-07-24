import React, { useState } from 'react'
import axios from 'axios'
import buildingsList from '@/api/buildings.json'
import {
  Alert,
  Box,
  Collapse,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import Select from '@mui/material/Select'
import { Input } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { uuid } from 'uuidv4'
import router from 'next/router'
import MechButton from '@/components/MechButton'
import CardRoomInfo from '@/components/CardRoomInfo'
import CloseIcon from '@mui/icons-material/Close'

// Parse time input value for API Request format
// XX:XX -> XXXX
function getTime(rawTime: string) {
  let hour = rawTime.substring(0, 2)
  let min = rawTime.substring(3, 5)
  return hour.toString() + min.toString()
}

// Define list component columns
const columns: GridColDef[] = [
  { field: 'Building', headerName: 'Building', width: 130, sortingOrder: ['desc', 'asc'] },
  { field: 'RoomNumber', headerName: 'Room Number', width: 200, sortable: false },
]

export default function ListAvailableRooms() {
  // Toggle states
  const [open, setOpen] = useState(false) // Snackbar toggle
  const [invalidAlertOpen, setInvalidAlertOpen] = useState(false) // Input error alert toggle

  // Available rooms list
  const [rooms, setRooms] = useState<any[]>([])

  // Input data
  const [day, setDay] = useState('M') // Day selection
  const [startTime, setStartTime] = useState('1000') // Start time
  const [endTime, setEndTime] = useState('1200') // End time

  // Loading states
  const [loadingData, setLoadingData] = useState<boolean>(false) // Data grid loading state
  const [cardLoading, setCardLoading] = useState('empty') // Card loading state

  // Card information
  const [cardTitle, setCardTitle] = useState('')
  const [cardCapacity, setCardCapacity] = useState('')
  const [cardRoomType, setCardRoomType] = useState('')
  const [cardIcon, setCardIcon] = useState('')

  // API CALL -> Get available rooms for given building, day, and time range
  const getAvailableRooms = async (buildingID: string, day: string, startTime: string, endTime: string) => {
    try {
      setLoadingData(true)
      setCardLoading('empty')
      await axios
        .get(
          `https://uah.quietroom.app/availability/${buildingID}?day=${day}&startTime=${startTime}&endTime=${endTime}`,
        )
        .then((response) => {
          console.log(
            `https://uah.quietroom.app/availability/${buildingID}?day=${day}&startTime=${startTime}&endTime=${endTime}`,
          )
          let readRooms = response?.data

          // If empty, log to console and skip adding to array
          if (readRooms.length == 0) {
            console.log('AYO THIS IS EMPTY: ' + buildingID)
          }
          // Add rooms to setRooms
          else {
            readRooms.forEach((room: any) => {
              setRooms((rooms) => [
                ...rooms,
                {
                  Building: buildingID,
                  RoomNumber: room,
                  id: uuid(),
                },
              ])
            })
          }
          setLoadingData(false)
        })
    } catch (error) {
      console.log(error)
      setLoadingData(false)
    }
  }

  // On submit, make API call and set appropriate loading states
  const handleSubmit = async (e: any) => {
    if (day == '' || startTime == '' || endTime == '') {
      console.log('ERROR: Invalid input')
      setInvalidAlertOpen(true)
    } else {
      setInvalidAlertOpen(false)
      setRooms([])

      buildingsList.map((buildingID: string) => {
        getAvailableRooms(buildingID, day, startTime, endTime)
      })
    }
  }

  // On row double click, route to 'roominfo' page
  const handleRowDoubleClick = (e: any) => {
    console.log(e.row.RoomNumber)
    router.push({
      pathname: '/roominfo',
      query: { building: e.row.Building, num: e.row.RoomNumber },
    })
  }

  // On row click, fetch basic room details for card display
  const handleRowClick = async (e: any) => {
    setOpen(true)
    setCardLoading('loading')

    try {
      await axios
        .get(`https://uah.quietroom.app/building/${e.row.Building}/room/${e.row.RoomNumber}`)
        .then((response) => {
          console.log(`https://uah.quietroom.app/building/${e.row.Building}/room/${e.row.RoomNumber}`)
          //console.log(response)

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
        })

      setCardLoading('set')
    } catch (err) {
      console.log(err)
      return 'NOT FOUND'
    }
  }

  // Handle close for snackbar
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  // Set day option
  const handleDay = (e: any) => {
    setDay(e.target.value)
    console.log(e.target.value)
  }

  // Set start time
  const handleStartTime = (e: any) => {
    let parsedTime = getTime(e.target.value)
    setStartTime(parsedTime)
    console.log(parsedTime)
  }

  // Set end time
  const handleEndTime = (e: any) => {
    let parsedTime = getTime(e.target.value)
    setEndTime(parsedTime)
    console.log(parsedTime)
  }

  // LOADING CONDITION
  if (rooms === undefined) {
    return <>Still loading...</>
  }

  return (
    <>
        
      <Grid container columns={{xs: 3, sm: 6, md: 12}} rowGap={2}
        width={'100%'} justifyContent={'space-between'} alignItems={'center'}
      >
        <Grid item xs={3} sm={3} md={4}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id="weekday-select-label">Weekday</InputLabel>
            <Select
              labelId="weekday-select-label"
              id="weekday-select"
              defaultValue={'M'}
              onChange={handleDay}
              variant="outlined"
              label="Weekday"
              sx={{ borderRadius: '15px' }}
            >
              <MenuItem disabled value={'X'}>
                Select Weekday
              </MenuItem>
              <MenuItem value={'M'}>Monday</MenuItem>
              <MenuItem value={'T'}>Tuesday</MenuItem>
              <MenuItem value={'W'}>Wednesday</MenuItem>
              <MenuItem value={'R'}>Thursday</MenuItem>
              <MenuItem value={'F'}>Friday</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3} sm={3} md={4}>
          <Stack direction="row" spacing={2} justifyContent={'center'} alignItems={'center'} width={'100%'}
            paddingLeft={{xs: 'none', sm: '2%', md: 'none'}}
          >
            <FormControl fullWidth>
              <TextField
                id="time"
                InputLabelProps={{shrink: true}}
                InputProps={{ style: { colorScheme: 'light', borderRadius: '15px' } }}
                type="time"
                label="Start Time"
                defaultValue={'10:00'}
                onChange={handleStartTime}
              />
            </FormControl>
            <img
              src="minus-solid.svg"
              height="20vh"
              className="d-inline-block align-top"
              alt="UAH QuietRoom"
            />
            <FormControl fullWidth>
              <TextField
                id="time"
                InputLabelProps={{shrink: true}}
                InputProps={{ style: { colorScheme: 'light', borderRadius: '15px' } }}
                type="time"
                label="End Time"
                defaultValue={'12:00'}
                onChange={handleEndTime}
              />
            </FormControl>
          </Stack>
        </Grid>
        <Grid item xs={3} sm={6} md={3}>
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
        </Grid>
      </Grid>
        
      <hr />
      <br></br>

      <Container sx={{marginLeft: 'none'}} disableGutters>
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
              rows={rooms!}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
                sorting: {
                  sortModel: [{ field: 'Building', sort: 'asc' }],
                },
              }}
              pageSizeOptions={[10]}
              onRowClick={handleRowClick}
              onRowDoubleClick={handleRowDoubleClick}
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
      </Container>


      <Snackbar open={open} onClose={handleClose} autoHideDuration={3000}>
        <Alert
          variant="filled"
          severity="info"
          sx={{ borderRadius: '15px', backgroundColor: '#181848', color: '#E0DDDD' }}
        >
          Double-click a row to view full room details!
        </Alert>
      </Snackbar>

    </>
  )
}
