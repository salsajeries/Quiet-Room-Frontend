import React, { useEffect, useState } from "react";
import Event from '@/interfaces/Event';
import axios from "axios";
import Room from "@/interfaces/Room";
import { Box, TextField } from "@mui/material";
import { uuid } from "uuidv4";
import { ProcessedEvent } from "@aldabil/react-scheduler/types";


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

function cleanEvents(arr: any) {

    let newArr: any = [];

    for (let i = 0; i < arr.length; i++) {
        let date = arr[i].EndDate;

        // If valid date, push event to new array
        if (isValidDate(date)) {
            newArr.push(arr[i]);
        }
    }

    return newArr;

}


export const getRoomEvents = (props: RoomInfoInt) => {

    let readEvents: any = [];

    axios
        .get(`https://uah.quietroom.app/building/${props.buildingVal}/room/${props.numVal}`)
        .then((response) => {
        
        console.log(`https://uah.quietroom.app/building/${props.buildingVal}/room/${props.numVal}`);
        console.log(response)

        readEvents = cleanEvents(response?.data.Events);
        readEvents.forEach((element: any) => ({
                ...element,
                StartTime: convertTime(element.StartTime),
                EndTime: convertTime(element.EndTime),
                StartDate: parseDate(element.StartDate),
                EndDate: parseDate(element.EndDate),
                EventID: uuid()
            }));
        })
        .catch((Error) => {
        console.log(Error);
        return "NOT FOUND";
    })

    return readEvents;
    
}