import React, { useEffect, useState } from "react";
import { uuid } from "uuidv4";
import axios from "axios";
import { useRouter } from "next/router";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Accordion, AccordionDetails, AccordionSummary, Alert, Collapse, FormControl, Grid, IconButton, InputLabel, LinearProgress, List, ListItemButton, ListItemText, ListSubheader, MenuItem, Select, TextField, Typography } from "@mui/material";
import buildingsList from '@/api/buildings.json';
import MechButton from "./MechButton";
import CardRoomInfo from "./CardRoomInfo";
import CloseIcon from '@mui/icons-material/Close';
import Event from "@/interfaces/Event";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import Scheduler from "./Scheduler";



function convertTime(timeVal: string) {
    let hour = parseInt(timeVal.substring(0,2));
    let min = timeVal.substring(2, 4);
    let opt = 'AM'

    if (hour == 12) { opt = 'PM' };
    if (hour > 12) { hour -= 12; opt = 'PM' };
    if (hour == 0) { hour = 12 };

    return hour.toString() + ':' + min + ' ' + opt;
}

function isValidDate(dateVal: string) {
    let year = parseInt(dateVal.substring(0,4));
    let month = parseInt(dateVal.substring(5,7));
    let day = parseInt(dateVal.substring(8,10));
    
    // Remove old years
    let today = new Date().getFullYear();
    if (year < today) { return false };

    // Remove old months within current year
    // Condition: dateVal is "EndDate"
    today = new Date().getMonth();
    if (month < today) { return false };

    // Else, return true
    return true;
}

function cleanEvents(arr: any) {

    let newArr = [];

    for (let i = 0; i < arr.length; i++) {
        let date = arr[i].EndDate;

        // If valid date, push event to new array
        if (isValidDate(date)) {
            newArr.push(arr[i]);
        }
    }

    return newArr;

}


// Define list component columns
const columns: GridColDef[] = [
    { field: 'Name', headerName: 'Classname', width: 100 },
    { field: 'BuildingCode', headerName: 'Building', width: 80, sortable: false, filterable: false },
    { field: 'RoomNumber', headerName: 'Room Number', width: 120, sortable: false, filterable: false },
    { field: 'DaysMet', headerName: 'Days Met', width: 200, sortingOrder: ['desc', 'asc'] },
    { field: 'StartTime', headerName: 'Start Time', width: 100 },
    { field: 'EndTime', headerName: 'End Time', width: 100 }
];



export default function displayRoomInfo() {

    let getBuildingQ = (useRouter()?.query?.building != null ? useRouter()?.query?.building : '');
    let getNumQ = (useRouter()?.query?.num != null ? useRouter()?.query?.num : '');


    // Toggle states
    const [submitToggle, setSubmitToggle] = useState(false);                        // Submit toggle
    const [alertOpen, setAlertOpen] = useState(false);                  // Input error alert toggle

    // Room information
    const [room, setRoom] = useState();
    const [events, setEvents] = useState<Event[]>([]);
    const [building, setBuilding] = useState(getBuildingQ);       // Set to query?.building, otherwise empty
    const [num, setNum] = useState(getNumQ);                      // Set to query?.num, otherwise empty

    // Card information
    const [cardTitle, setCardTitle] = useState('');
    const [cardCapacity, setCardCapacity] = useState('');
    const [cardRoomType, setCardRoomType] = useState('');
    const [cardIcon, setCardIcon] = useState('');

    // Loading states
    const [cardLoading, setCardLoading] = useState(true);               // Card loading state
    const [schedulerToggle, setSchedulerToggle] = useState(true);       // Scheduler component loading state


    // On submit, make API call
    const handleSubmit = (e: any) => {
        if (building == '' || num == '') {
            console.log('ERROR: Invalid input')
            setAlertOpen(true)
        }
        else {
            setAlertOpen(false)
            setSchedulerToggle(!schedulerToggle)
            setSubmitToggle(!submitToggle)
        }
    }

    // Set building number
    const handleBuilding = (e: any) => {
        console.log(e.target.value)
        setBuilding(e.target.value)
    };

    // Set room number
    const handleRoomNumber = (e: any) => {
        console.log(e.target.value)
        setNum(e.target.value)
    };

    // Use Effect: Update local storage for building
    useEffect(() => {
        localStorage.setItem("building", JSON.stringify(building));
    }, [building]);

    // Use Effect: Update local storage for room number
    useEffect(() => {
        localStorage.setItem("num", JSON.stringify(num));
    }, [num]);

    // API call Use Effect
    useEffect(() => {

        if (building != '' || num != '') {

            axios
            .get(`https://uah.quietroom.app/building/${building}/room/${num}`)
            .then((response) => {

                console.log(`https://uah.quietroom.app/building/${building}/room/${num}`);
                console.log(response)
                setRoom(response?.data);
                let readRooms = response?.data.Events;
                readRooms = cleanEvents(readRooms);
                let addID = readRooms.map((element: any) => ({
                    ...element,
                    DaysMet: element.DaysMet.toString().replaceAll(',', ' - '),
                    StartTime: convertTime(element.StartTime),
                    EndTime: convertTime(element.EndTime),
                    RawStartTime: element.StartTime,
                    RawEndTime: element.EndTime,
                    EventID: uuid()
                }));

                setEvents(addID);


                // Set card Title and Capacity
                setCardTitle(response?.data.BuildingCode + ' ' + response?.data.RoomNumber);
                setCardCapacity(response?.data.Capacity);

                // Set card Room Type
                const tempType = response?.data.RoomType;
                if (tempType.includes('Lab'))
                    setCardRoomType(tempType.substring(0, 3) + ' - ' + tempType.substring(4))
                else if (tempType.includes('*'))
                    setCardRoomType(tempType.substring(1))
                else
                    setCardRoomType(response?.data.RoomType)

                // Set card Icon
                if (tempType.includes('Classroom')) {
                    setCardIcon('pencil-solid.png')
                }
                else if (tempType.includes('Computer') || tempType.includes('Graphics')) {
                    setCardIcon('desktop-solid.svg')
                }
                else if (tempType.includes('Lab')) {
                    setCardIcon('flask-solid.svg')
                }
                else if (tempType.includes('Auditorium')) {
                    setCardIcon('auditorium.png')
                }
                else {
                    setCardIcon('info.png')
                }

                setCardLoading(false);

            })
            .catch((Error) => {
                console.log(Error);
                return <>NOT FOUND</>;
            })

        }

    }, [(submitToggle)])


    if (events === undefined) {
        return <>Still loading...</>;
    }


    const sendEvents = () => {
        return events;
    }





    return (
      <>        
            <Grid container
                columns={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                justifyContent="space-evenly"
                alignItems="flex-start"
            >
                <Grid container item xs={4} direction='column' alignItems='center' minWidth={'500px'}>
                    <Grid container item direction='column' justifyContent='center' alignItems='center' spacing={1} zeroMinWidth>
                        <Grid item width={'80%'}>
                            <Collapse in={alertOpen}>
                                <Alert
                                variant="filled" severity="error"
                                action={
                                    <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setAlertOpen(false);
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
                        <Grid item width={'80%'}>
                            <FormControl variant="standard" sx={{width: '100%'}}>
                                <InputLabel id="building-select-label">Building</InputLabel>
                                <Select
                                    labelId="building-select-label"
                                    id="building-select"
                                    defaultValue={getBuildingQ}
                                    onChange={handleBuilding}
                                    variant="standard"
                                    sx={{
                                        width: '100%'
                                    }}
                                >
                                    <MenuItem disabled value={''}>Select Building</MenuItem>
                                    {buildingsList.map((buildingID: any) =>
                                        <MenuItem value={buildingID}>{buildingID}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item width={'80%'}>
                            <TextField id="standard-basic" label="Room Number" variant="standard" onChange={handleRoomNumber} defaultValue={getNumQ} sx={{width: '100%'}}  />
                        </Grid>
                        <Grid item width={'90%'}>
                            <div onClick={handleSubmit}>
                                <MechButton href={''} text={'Submit'} width={'100%'}></MechButton>
                            </div>
                        </Grid>
                        <Grid item width={'90%'}>
                        <CardRoomInfo loading={cardLoading} cardTitle={cardTitle} cardRoomType={cardRoomType} cardCapacity={cardCapacity} cardIcon={cardIcon} />
                    </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6} margin={{xs: 1}} justifyContent='center'>
                    <DataGrid
                        autoHeight
                        slots={{
                            loadingOverlay: LinearProgress
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
                                sortModel: [{ field: 'DaysMet', sort: 'asc' }]
                            },
                        }}
                        pageSizeOptions={[10]}
                        loading={false}
                        sx={{
                            color: '#181848',
                            borderRadius: 5,
                            border: 2,
                            '& .MuiDataGrid-row': {
                                transition: 'all 0.15s ease-in-out'
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#181848'
                            },
                            '& .MuiDataGrid-columnHeaderTitle': {
                                color: '#E0DDDD'
                            },
                            '& .MuiDataGrid-sortIcon': {
                                opacity: 1,
                                color: "#E0DDDD",
                            },
                            '& .MuiDataGrid-menuIconButton': {
                                opacity: 1,
                                color: "#E0DDDD"
                            },
                        }}
                    />
                </Grid>
            </Grid> 

            <br></br>

            <Scheduler rawEvents={events} toggle={schedulerToggle}></Scheduler>


      </>
    )

}