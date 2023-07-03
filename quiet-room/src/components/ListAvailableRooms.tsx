import React, { useState } from "react";
import axios from "axios";
import buildingsList from '@/api/buildings.json';
import { Alert, Collapse, FormControl, Grid, IconButton, InputLabel, LinearProgress, MenuItem, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Select from '@mui/material/Select'
import { Input } from '@mui/material';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { uuid } from "uuidv4";
import router from "next/router";
import MechButton from "@/components/MechButton";
import CardRoomInfo from '@/components/CardRoomInfo'
import CloseIcon from '@mui/icons-material/Close';


// Parse time input value for API Request format
// XX:XX -> XXXX
function getTime(rawTime: string) {
    let hour = rawTime.substring(0,2);
    let min = rawTime.substring(3,5);
    return hour.toString() + min.toString();
}

// Define list component columns
const columns: GridColDef[] = [
    { field: 'Building', headerName: 'Building', width: 130 },
    { field: 'RoomNumber', headerName: 'Room Number', width: 200 }
];



export default function ListAvailableRooms() {

    // Toggle states
    const [open, setOpen] = useState(false);                // Snackbar toggle
    const [alertOpen, setAlertOpen] = useState(false);      // Input error alert toggle


    // Available rooms list
    const [rooms, setRooms] = useState<any[]>([]);

    // Input data
    const [day, setDay] = useState('')                      // Day selection
    const [startTime, setStartTime] = useState('');         // Start time
    const [endTime, setEndTime] = useState('');             // End time

    // Loading states
    const [loadingData, setLoadingData] = useState<boolean>(false);     // Data grid loading state
    const [cardLoading, setCardLoading] = useState(true);               // Card loading state

    // Card information
    const [cardTitle, setCardTitle] = useState('');
    const [cardCapacity, setCardCapacity] = useState('');
    const [cardRoomType, setCardRoomType] = useState('');
    const [cardIcon, setCardIcon] = useState('');


    // API CALL -> Get available rooms for given building, day, and time range
    async function getAvailableRooms (buildingID: string, day: string, startTime: string, endTime: string) {

        await axios
        .get(`https://uah.quietroom.app/availability/${buildingID}?day=${day}&startTime=${startTime}&endTime=${endTime}`)
        .then((response) => {

            console.log(`https://uah.quietroom.app/availability/${buildingID}?day=${day}&startTime=${startTime}&endTime=${endTime}`);
            let readRooms = response?.data;

            // If empty, log to console and skip adding to array
            if (readRooms.length == 0) {
                console.log("AYO THIS IS EMPTY: " + buildingID)
            }
            // Add rooms to setRooms
            else {
                readRooms.forEach((room: any) => {
                    setRooms(rooms => [...rooms,
                        {
                            Building: buildingID,
                            RoomNumber: room,
                            id: uuid()
                        }
                    ])
                })
            }

        })
        .catch((error) => {
            if(error == '400')
                console.log('THIS WAS A 400');
            console.log(error);
        })

    };

    // On submit, make API call and set appropriate loading states
    const handleSubmit = (e: any) => {
        
        if (day == '' || startTime == '' || endTime == '') {
            console.log('ERROR: Invalid input')
            setAlertOpen(true)
        }
        else {
            setAlertOpen(false)
            setLoadingData(true)
            setRooms([])

            buildingsList.map((buildingID: string) => {
                getAvailableRooms(buildingID, day, startTime, endTime);
            })

            setLoadingData(false);
        }

    };

    // On row double click, route to 'roominfo' page
    const handleRowDoubleClick = (e: any) => {
        console.log(e.row.RoomNumber);
        router.push({
            pathname: '/roominfo',
            query: { building: e.row.Building, num: e.row.RoomNumber }
        })
    };

    // On row click, fetch basic room details for card display
    const handleRowClick = async (e: any) => {
        
        setOpen(true);

        try {
            await axios.get(`https://uah.quietroom.app/building/${e.row.Building}/room/${e.row.RoomNumber}`)
            .then((response) => {
        
                console.log(`https://uah.quietroom.app/building/${e.row.Building}/room/${e.row.RoomNumber}`);
                //console.log(response)

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

            })

            setCardLoading(false);
            
        } catch (err) {
            console.log(err);
            return "NOT FOUND";
        }

    };

    // Handle close for snackbar
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    // Set day option
    const handleDay = (e: any) => {
        setDay(e.target.value);
        console.log(e.target.value);
    };

    // Set start time
    const handleStartTime = (e: any) => {
        let parsedTime = getTime(e.target.value);
        setStartTime(parsedTime);
        console.log(parsedTime);
    };

    // Set end time
    const handleEndTime = (e: any) => {
        let parsedTime = getTime(e.target.value);
        setEndTime(parsedTime);
        console.log(parsedTime);
    };


    // LOADING CONDITION
    if (rooms === undefined) {
        return <>Still loading...</>;
    };


    return (
        <>
            <Grid container
                columns={{ xs: 4, sm: 4, md: 12, lg: 12 }}
                justifyContent="space-evenly"
                alignItems="flex-start"
            >
                <Grid container item xs={5} direction='column' alignItems='center' minWidth={'500px'}>
                    <Grid container item direction='column' justifyContent='center' alignItems='center' spacing={1} zeroMinWidth>
                        <Grid item width={'70%'}>
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
                                sx={{ mb: 2 }}
                                >
                                    Invalid input. Please try again!
                                </Alert>
                            </Collapse>
                        </Grid>
                        <Grid item width={'70%'}>
                            <FormControl variant="standard" sx={{width: '100%'}}>
                                <InputLabel id="weekday-select-label">Weekday</InputLabel>
                                <Select
                                    labelId="weekday-select-label"
                                    id="weekday-select"
                                    defaultValue={''}
                                    onChange={handleDay}
                                    variant="standard"
                                    sx={{
                                        width: '100%'
                                    }}
                                >
                                    <MenuItem disabled value={'X'}>Select Weekday</MenuItem>
                                    <MenuItem value={'M'}>Monday</MenuItem>
                                    <MenuItem value={'T'}>Tuesday</MenuItem>
                                    <MenuItem value={'W'}>Wednesday</MenuItem>
                                    <MenuItem value={'R'}>Thursday</MenuItem>
                                    <MenuItem value={'F'}>Friday</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <TableContainer
                                sx={{
                                    minWidth: '35vw',
                                    '& .MuiTable-root': {
                                    },
                                    '& .MuiTableCell-head': {
                                        padding: '0px',
                                        border: 'none'
                                    },
                                    '& .MuiTableCell-body': {
                                        padding: '5px',
                                        border: 'none'
                                    }
                                }}
                            >
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Start Time</TableCell>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center">End Time</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center">
                                                <Input type="time" onChange={handleStartTime}
                                                    defaultValue={''}
                                                    sx={{colorScheme: 'light'}}
                                                ></Input>
                                            </TableCell>
                                            <TableCell align="center">
                                                <img
                                                    src="minus-solid.svg"
                                                    height="20vh"
                                                    className="d-inline-block align-top"
                                                    alt="UAH QuietRoom"
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Input type="time" onChange={handleEndTime}
                                                    defaultValue={''}
                                                    sx={{colorScheme: 'light'}}
                                                ></Input>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item>
                            <div onClick={handleSubmit}>
                                <MechButton href={''} text={'Submit'} width={'30vw'}></MechButton>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item width={'90%'}>
                        <CardRoomInfo loading={cardLoading} cardTitle={cardTitle} cardRoomType={cardRoomType} cardCapacity={cardCapacity} cardIcon={cardIcon} />
                    </Grid>
                </Grid>
                <Grid item xs={4} margin={{xs: 1}} >
                    <DataGrid
                        autoHeight
                        slots={{
                            loadingOverlay: LinearProgress
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
                                sortModel: [{ field: 'Building', sort: 'asc' }]
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
                                transition: 'all 0.15s ease-in-out'
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#181848'
                            },
                            '& .MuiDataGrid-columnHeaderTitle': {
                                color: '#E0DDDD'
                            }
                        }}
                    />
                </Grid>
            </Grid> 
            
            <Snackbar
                open={open}
                onClose={handleClose}
                autoHideDuration={3000}
                message="Double-click row to view full room details"
            />
        </>
    );
}