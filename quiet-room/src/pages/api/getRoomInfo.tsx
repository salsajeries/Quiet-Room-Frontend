import React, { useEffect, useState } from "react";
import Event from '@/interfaces/Event';
import axios from "axios";
import Room from "@/interfaces/Room";
import { Box, TextField } from "@mui/material";
import { uuid } from "uuidv4";
import { ProcessedEvent } from "@aldabil/react-scheduler/types";
import '@/styles/Scheduler.module.css'


// TRUE if event is currently occuring, FALSE if old or future event
function isCurrentEvent(startDateVal: string, endDateVal: string) {
    // Parse date and time values
    let startY = parseInt(startDateVal.substring(0,4));
    let startM = parseInt(startDateVal.substring(5,7));
    let startD = parseInt(startDateVal.substring(8,10));

    let endY = parseInt(startDateVal.substring(0,4));
    let endM = parseInt(startDateVal.substring(5,7));
    let endD = parseInt(startDateVal.substring(8,10));
    
    // Remove by year
    let today = new Date().getFullYear();
    if (endY != today || startY != today) { return false };

    // Remove by month
    today = new Date().getMonth();
    if (endM < today || startM > today) { return false };

    // Remove by day
    today = new Date().getDate();
    if (endD < today || startD > today) { return false };

    // Else, return true
    return true;
}

// Format for date: "YYYY/MM/DD 24:XX"
function formatDateTime(dateVal: string, timeVal: string) {
    let year = dateVal.substring(0,4);
    let month = dateVal.substring(5,7);
    let day = dateVal.substring(8,10);

    let hour = timeVal.substring(0,2);
    let min = timeVal.substring(2, 4);

    return year + '/' + month + '/' + day + ' ' + hour + ':' + min;
}

function processEvents(arr: any) {

    let newArr = [];
    const dateObj = new Date();
    const today = dateObj.getFullYear() + '/' + dateObj.getMonth() + '/' + dateObj.getDate() + ' ';


    arr.forEach((event: any) => {
        if (isCurrentEvent(event.StartDate, event.EndDate)) {
            newArr.push({
                event_id: event.EventID,
                title: event.Name
            });

        }
    });
/*
    newArr = newArr.map((event: any) => ({
        
        event[]

        StartTime: convertTime(element.StartTime),
        EndTime: convertTime(element.EndTime),
        StartDate: parseDate(element.StartDate),
        EndDate: parseDate(element.EndDate),
        EventID: uuid()
    }));
*/
}

















export default function getRoomInfo() {

    const [room, setRoom] = useState<Room>();
    const [events, setEvents] = useState<Event[]>();
    const [num, setNum] = useState('N155');

    

    // API GET REQUEST
    useEffect(() => {
        axios
          .get(`https://uah.quietroom.app/building/OKT/room/${num}`)
          .then((response) => {
            console.log(response)
            setRoom(response?.data);
            setEvents(response?.data.Events);
          })
    }, [num]);


    return (
        <p>test</p>
    );
}
