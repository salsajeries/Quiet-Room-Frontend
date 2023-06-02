import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Event from '@/interfaces/Event';
import axios from "axios";
import MechButton from "@/components/MechButton";
import Room from "@/interfaces/Room";
import { Box } from "@mui/material";
import { uuid } from "uuidv4";


const columns: GridColDef[] = [
    { field: 'Name', headerName: 'Name', width: 130 },
    { field: 'DaysMet', headerName: 'Days', width: 200 },
    { field: 'StartTime', headerName: 'Start Time', width: 130 },
    { field: 'EndTime', headerName: 'End Time', width: 130 }
];

function convertTime(timeVal: string) {
    let hour = parseInt(timeVal.substring(0,2));
    let min = timeVal.substring(2, 4);
    let opt = 'AM'

    if (hour > 12) { hour -= 12; opt = 'PM' };
    if (hour == 0) { hour = 12 };

    return hour.toString() + ':' + min + ' ' + opt;
}


export default function getRoomInfo() {

    const [room, setRoom] = useState<Room>();
    const [events, setEvents] = useState<Event[]>();
    const [num, setNum] = useState('OKT/room/N327');

    const handleClick = () => setNum('OKT/room/N324')

    // API GET REQUEST
    useEffect(() => {
        axios
          .get(`https://uah.quietroom.app/building/${num}`)
          .then((response) => {
            console.log(response)
            setRoom(response?.data);
            const readRooms = response?.data.Events;
            const addID = readRooms.map((element: any) => ({
                ...element,
                StartTime: convertTime(element.StartTime),
                EndTime: convertTime(element.EndTime),
                EventID: uuid()
            }));
            setEvents(addID);
          })
    }, [num]);

    // LOADING CONDITION
    if (events === undefined) {
        return <>Still loading...</>;
    }

    return (
        <>
            <p>{JSON.stringify(room?.RoomNumber)}</p>
            <button onClick={handleClick}>Click Here</button>
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
            <p>{JSON.stringify(events)}</p>
        </>
    );
}
