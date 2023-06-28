import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import buildingsList from '@/api/buildings.json';
import { Avatar, Box, Button, Card, CardContent, CardHeader, CardMedia, Chip, Container, Fade, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Popper, Skeleton, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import Select from '@mui/material/Select'
import { Input } from '@mui/material';
import Link from "next/link";
import { DataGrid, GridColDef, gridRowSelectionStateSelector, useGridApiContext } from "@mui/x-data-grid";
import { uuid } from "uuidv4";
import router from "next/router";
import MechButton from "@/components/MechButton";
import CardRoomInfo from '@/components/CardRoomInfo'



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

    // Toggle snackbar
    const [open, setOpen] = useState(false);

    const [rooms, setRooms] = useState<any[]>([]);              // Rooms list
    const [day, setDay] = useState('M')                         // Day selection
    const [startTime, setStartTime] = useState('1100');         // Start time
    const [endTime, setEndTime] = useState('1300');             // End time

    const [loadingData, setLoadingData] = useState<boolean>(false);

    const [cardTitle, setCardTitle] = useState('');
    const [cardCapacity, setCardCapacity] = useState('');
    const [cardRoomType, setCardRoomType] = useState('');

    const [testLoading, setTestLoading] = useState(true);

    const handleRowDoubleClick = (e: any) => {
        console.log(e.row.RoomNumber);
        router.push({
            pathname: '/roominfo',
            query: { building: e.row.Building, num: e.row.RoomNumber }
        })
    }

    const handleRowClick = (e: any) => {
        setOpen(true);
        setTestLoading(false);


        axios
        .get(`https://uah.quietroom.app/building/${e.row.Building}/room/${e.row.RoomNumber}`)
        .then((response) => {
        
        console.log(`https://uah.quietroom.app/building/${e.row.Building}/room/${e.row.RoomNumber}`);
        //console.log(response)

        setCardTitle(response?.data.BuildingCode + ' ' + response?.data.RoomNumber);
        setCardCapacity(response?.data.Capacity);
        setCardRoomType(response?.data.RoomType);

        })
        .catch((Error) => {
        console.log(Error);
        return "NOT FOUND";

    })



    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };


    const handleSubmit = (e: any) => {

        console.log('CLICKED SUBMIT')
        setLoadingData(true);


        setRooms([]);       // Empty the array for new data

        buildingsList.map((buildingID: string) => {

            axios
            .get(`https://uah.quietroom.app/availability/${buildingID}?day=${day}&startTime=${startTime}&endTime=${endTime}`)
            .then((response) => {



                console.log(loadingData)
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

                //setLoadingData(false);

            })
            .catch((error) => {
                if(error == '400')
                    console.log('THIS WAS A 400');
                console.log(error);
            });
        })

        setLoadingData(false);

    }


    // Set day option
    const handleDay = (e: any) => {
        setDay(e.target.value);
        console.log(e.target.value);
    }

    // Set start time
    const handleStartTime = (e: any) => {
        let parsedTime = getTime(e.target.value);
        setStartTime(parsedTime);
        console.log(parsedTime);
    }

    // Set end time
    const handleEndTime = (e: any) => {
        let parsedTime = getTime(e.target.value);
        setEndTime(parsedTime);
        console.log(parsedTime);
    }


    // LOADING CONDITION
    if (rooms === undefined) {
        return <>Still loading...</>;
    }


    return (
        <>
            <br></br>
            <br></br>

            <Grid container
                columns={{ xs: 4, sm: 10, md: 12, lg: 12 }}
                justifyContent="center"
                alignItems="flex-start"
                margin={{ xs: 1 }}
            >
                <Grid container item xs={5} direction='column' justifyContent='center' alignItems='center'>
                    <Grid container item direction='column' justifyContent='center' alignItems='center'
                        zeroMinWidth
                    >
                        <Grid item>
                            <Select
                                id="weekday-select"
                                defaultValue={'X'}
                                onChange={handleDay}
                                label="Weekday"
                                variant="standard"
                                placeholder="Weekday"
                                sx={{
                                    minWidth: '20vw'
                                }}
                            >
                                <MenuItem disabled value={'X'}>Weekday</MenuItem>
                                <MenuItem value={'M'}>Monday</MenuItem>
                                <MenuItem value={'T'}>Tuesday</MenuItem>
                                <MenuItem value={'W'}>Wednesday</MenuItem>
                                <MenuItem value={'R'}>Thursday</MenuItem>
                                <MenuItem value={'F'}>Friday</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item>
                            <TableContainer
                                sx={{
                                    minWidth: '35vw',
                                    margin: '10px',
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
                                                    defaultValue={'10:00'}
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
                                                    defaultValue={'12:00'}
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
                    <Grid item width={'85%'}>
                        <CardRoomInfo loading={testLoading} cardTitle={cardTitle} cardRoomType={cardRoomType} cardCapacity={cardCapacity} />
                    </Grid>
                </Grid>

                <Grid item xs={5} margin={{xs: 1}} >
                    <DataGrid
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
                            }
                        }}
                    />
                </Grid>
            </Grid> 
            

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            
            <Snackbar
                    open={open}
                    onClose={handleClose}
                    autoHideDuration={3000}
                    message="Double-click to view full room details"
            />
        </>
    );
}





/**


<Grid display={'flex'} container item direction='column' justifyContent='center'>
                        <Grid item>
                                <Select
                                    id="weekday-select"
                                    defaultValue={'X'}
                                    onChange={handleDay}
                                    label="Weekday"
                                    variant="standard"
                                    placeholder="Weekday"
                                    
                                >
                                    <MenuItem disabled value={'X'}>Weekday</MenuItem>
                                    <MenuItem value={'M'}>Monday</MenuItem>
                                    <MenuItem value={'T'}>Tuesday</MenuItem>
                                    <MenuItem value={'W'}>Wednesday</MenuItem>
                                    <MenuItem value={'R'}>Thursday</MenuItem>
                                    <MenuItem value={'F'}>Friday</MenuItem>
                                </Select>
                        </Grid>
                        <Grid item>
                            <TableContainer
                                sx={{
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
                                                    defaultValue={'10:00'}
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
                                                    defaultValue={'12:00'}
                                                    sx={{colorScheme: 'light'}}
                                                ></Input>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item>
                            <div onClick={handleSubmit} style={{width: '400px'}}>
                                <MechButton href={''} text={'Submit'} width={'300px'}></MechButton>
                            </div>
                        </Grid>


                    </Grid>


 */