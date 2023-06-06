import React, { useEffect, useRef, useState } from "react";
import Event from '@/interfaces/Event';
import axios from "axios";
//import { styles } from '@/styles/Scheduler.module.css'
import buildings from './buildings.json';
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Input } from '@mui/material';



export default function getAvailableRooms() {

    const [toggle, setToggle] = useState(false);

    const handleSubmit = (e: any) => {
        setToggle(!toggle)
    }

    const [day, setDay] = useState('M')
    const [building, setBuilding] = useState('OKT');
    const [startTime, setStartTime] = useState('1100');
    const [endTime, setEndTime] = useState('1300');
    
    const [rooms, setRooms] = useState('');

    const handleBuilding = (e: any) => {
        setBuilding(e.target.value);
        console.log(e.target.value);
    }

    const handleDay = (e: any) => {
        setDay(e.target.value);
        console.log(e.target.value);
    }

    const handleStartTime = (e: any) => {
        setStartTime(e.target.value);
        console.log(e.target.value);
    }

    const handleEndTime = (e: any) => {
        setEndTime(e.target.value);
        console.log(e.target.value);
    }


    // API GET REQUEST
    useEffect(() => {
        axios
          .get(`https://uah.quietroom.app/availability/${building}?day=${day}&startTime=${startTime}&endTime=${endTime}`)
          .then((response) => {
            console.log(`https://uah.quietroom.app/availability/${building}?day=${day}&startTime=${startTime}&endTime=${endTime}`);
            console.log(response?.data)
            setRooms(response?.data)
            if(response?.data.length == 0)
                console.log("AYO THIS IS EMPTY")
          })
          .catch((error) => {
            if(error == '400')
                console.log('THIS WAS A 4000000');
            
            console.log(error);
        });
    }, [toggle]);

    // LOADING CONDITION
    if (rooms === undefined) {
        return <>Still loading...</>;
    }


    return (
        <>
            <br></br>
            <InputLabel id="demo-simple-select-label">Building</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                onChange={handleBuilding}
                defaultValue={''}
            >
                {buildings.map(building => {
                    return (
                        <MenuItem key={building} value={building}>{building}</MenuItem>
                    );
                })}
            </Select>
            <InputLabel id="weekday-select-label">Day</InputLabel>
            <Select
                labelId="weekday-select-label"
                id="weekday-select"
                label="Age"
                defaultValue={''}
                onChange={handleDay}
                style={{width: "200px"}}
            >
                <MenuItem value={'M'} selected>Monday</MenuItem>
                <MenuItem value={'T'}>Tuesday</MenuItem>
                <MenuItem value={'W'}>Wednessday</MenuItem>
                <MenuItem value={'R'}>Thursday</MenuItem>
                <MenuItem value={'F'}>Friday</MenuItem>
            </Select>
            <br></br>
            <TextField id="outlined-basic" label="Start Time" variant="outlined" onChange={handleStartTime} />
            <TextField id="outlined-basic" label="End Time" variant="outlined" onChange={handleEndTime} />
            <button onClick={handleSubmit}>Submit</button>
            <hr></hr>
            
            <Input type="time" onChange={(e: any) => {console.log(e.target.value)}}
                style={{color: "blue"}}
            ></Input>
            
            <hr></hr>
            <p>{JSON.stringify(rooms)}</p>
        </>
    );
}


















/**

const columns: GridColDef[] = [
    { field: 'Name', headerName: 'Name', width: 130 },
    { field: 'DaysMet', headerName: 'Days', width: 200 },
    { field: 'StartTime', headerName: 'Start Time', width: 130 },
    { field: 'EndTime', headerName: 'End Time', width: 130 },
    { field: 'StartDate', headerName: 'Start Date', width: 130 },
    { field: 'EndDate', headerName: 'End Date', width: 130 }
];

function convertTime(timeVal: string) {
    let hour = parseInt(timeVal.substring(0,2));
    let min = timeVal.substring(2, 4);
    let opt = 'AM'

    if (hour > 12) { hour -= 12; opt = 'PM' };
    if (hour == 0) { hour = 12 };

    return hour.toString() + ':' + min + ' ' + opt;
}

function parseDate(dateVal: string) {
    let year = parseInt(dateVal.substring(0,4));
    let month = parseInt(dateVal.substring(5,7));
    let day = parseInt(dateVal.substring(8,10));

    return month.toString() + '/' + day.toString() + '/' + year.toString();
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




const handleText = (e: any) => {
        if (e.key == 'Enter')
            setNum(e.target.value);
    }



    // LOADING CONDITION
    if (events === undefined) {
        return <>Still loading...</>;
    }






<p>{JSON.stringify(room?.RoomNumber)}</p>
            <TextField id="outlined-basic" label="Room Number" variant="outlined" onKeyPress={handleText} />
            <hr></hr>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={events!}
                    getRowId={(row) => row.EventID}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                            pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                />
            </Box>
            <hr></hr>






 */