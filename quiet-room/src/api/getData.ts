import React, { useEffect, useState } from "react";
import Event from '@/interfaces/Event';
import axios from "axios";
import Room from "@/interfaces/Room";
import { Box, TextField } from "@mui/material";
import { uuid } from "uuidv4";
import { ProcessedEvent } from "@aldabil/react-scheduler/types";
import '@/styles/Scheduler.module.css'


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


function getRoomEvents(props: RoomInfoInt): any {

    let readEvents: any = [];

    axios
        .get(`https://uah.quietroom.app/building/${props.buildingVal}/room/${props.numVal}`)
        .then((response) => {
        
        console.log(`https://uah.quietroom.app/building/${props.buildingVal}/room/${props.numVal}`);
        //console.log(response)

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



function getRoomInfo(buildingVal: any, numVal: any): any {

    let readRoom = {} as Room;

    axios
        .get(`https://uah.quietroom.app/building/${buildingVal}/room/${numVal}`)
        .then((response) => {
        
        console.log(`https://uah.quietroom.app/building/${buildingVal}/room/${numVal}`);
        //console.log(response)

        readRoom = {
            BuildingCode: response?.data.BuildingCode,
            RoomNumber: response?.data.RoomNumber,
            Capacity: response?.data.Capacity,
            RoomType: response?.data.RoomType,
            Events: response?.data.Events,
            RoomID: uuid()
        };

        //console.log(readRoom)

        })
        .catch((Error) => {
        console.log(Error);
        return "NOT FOUND";
    })

    return readRoom;

}

function testAPI(): any {
    
    const [data, setData] = useState();
    
    const getResponse = async () => {
        try {
             const response = await axios.get(`https://uah.quietroom.app/building/OKT/room/N155`)
             console.log(response?.data)
        } catch(err) {
             console.log('err')
        }
    }

}

const getResponse = async () => {
    try {
         const response = await axios.get(`https://uah.quietroom.app/building/OKT/room/N155`)
         console.log(response?.data)
         return response?.data;
    } catch(err) {
         console.log('err')
    }
}

export { getRoomEvents, getRoomInfo, getResponse, testAPI }