import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import buildingsList from '@/api/buildings.json';
import { Box, Button, Card, CardContent, Chip, Fade, FormControl, Grid, InputLabel, MenuItem, Paper, Popper, Select, Snackbar, Stack, Tooltip, Typography } from "@mui/material";
import { Input } from '@mui/material';
import InfoModal from "@/components/InfoModal";
import Link from "next/link";
import { DataGrid, GridColDef, gridRowSelectionStateSelector, useGridApiContext } from "@mui/x-data-grid";
import { uuid } from "uuidv4";
import router from "next/router";
import MechButton from "@/components/MechButton";



import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import DatePicker from 'react-native-modern-datepicker';



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


    const handleRowDoubleClick = (e: any) => {
        console.log(e.row.RoomNumber);
        router.push({
            pathname: '/roominfo',
            query: { building: e.row.Building, num: e.row.RoomNumber }
        })
    }

    const handleRowClick = (e: any) => {
        setOpen(true);
        
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

            <Stack
                direction='column'
                spacing={{ xs: 1, sm: 2, md: 4 }}
            >
                <FormControl fullWidth>
                    <InputLabel id="weekday-select-label">Weekday</InputLabel>
                    <Select
                        labelId="weekday-select-label"
                        id="weekday-select"
                        defaultValue={''}
                        onChange={handleDay}
                        label="Weekday"
                        style={{width: "200px"}}
                    >
                        <MenuItem value={'M'}>Monday</MenuItem>
                        <MenuItem value={'T'}>Tuesday</MenuItem>
                        <MenuItem value={'W'}>Wednesday</MenuItem>
                        <MenuItem value={'R'}>Thursday</MenuItem>
                        <MenuItem value={'F'}>Friday</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="startdate-select-label"></InputLabel>
                    <Select
                        labelId="startdate-select-label"
                        id="weekday-select"
                        defaultValue={''}
                        onChange={handleStartTime}
                        label="Weekday"
                        style={{width: "200px"}}
                    >
                        <MenuItem value={'01'}>01</MenuItem>
                        <MenuItem value={'02'}>02</MenuItem>
                        <MenuItem value={'03'}>03</MenuItem>
                        <MenuItem value={'04'}>04</MenuItem>
                        <MenuItem value={'05'}>05</MenuItem>
                        <MenuItem value={'06'}>06</MenuItem>
                        <MenuItem value={'07'}>07</MenuItem>
                        <MenuItem value={'08'}>08</MenuItem>
                        <MenuItem value={'09'}>09</MenuItem>
                        <MenuItem value={'10'}>10</MenuItem>
                        <MenuItem value={'11'}>11</MenuItem>
                        <MenuItem value={'12'}>12</MenuItem>
                    </Select>
                </FormControl>
                <Input type="time" onChange={handleStartTime}
                    defaultValue={'10:00'}
                    style={{colorScheme: 'light'}}
                ></Input>
                <Input type="time" onChange={handleEndTime}
                    defaultValue={'12:00'}
                    style={{colorScheme: 'light'}}
                ></Input>
            </Stack>


            

                <div onClick={handleSubmit} style={{width: '20vw', height: '10vh'}}>
                    <MechButton href={''} text={'Submit'} width={'100%'} height={'100%'}></MechButton>
                </div>
                
                
            
            <br></br>
            <br></br>


        




            <Box sx={{ flexGrow: 2, width: '80%', marginLeft: '10px' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <DataGrid
                        rows={rooms!}
                        columns={columns}
                        initialState={{
                        pagination: {
                            paginationModel: {
                            pageSize: 10,
                            },
                        },
                        }}
                        pageSizeOptions={[10]}
                        onRowClick={handleRowClick}
                        onRowDoubleClick={handleRowDoubleClick}
                        loading={loadingData}
                        disableRowSelectionOnClick
                        sx={{
                            color: '#181848',
                            borderRadius: 5,
                            border: 2,
                            '& .MuiDataGrid-cell:hover': {
                            },
                            "& .MuiDataGrid-row:selected": {
                                borderColor: '#181848',
                            }
                        }}
                        
                    />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Room Information Advanced
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {cardTitle}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {cardRoomType}
                                </Typography>
                                <Typography variant="body2">
                                    {cardCapacity}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            <Snackbar
                    open={open}
                    onClose={handleClose}
                    autoHideDuration={3000}
                    message="Double-click to view full room details"
            />

        </>
    );
}