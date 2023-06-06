import React, { useEffect, useState } from "react";
import Event from '@/interfaces/Event';
import Room from "@/interfaces/Room";
import { uuid } from "uuidv4";
import axios from "axios";
import Paper from '@mui/material/Paper';
import { Scheduler } from "@aldabil/react-scheduler";




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


export default function displayRoomInfo() {

    const [room, setRoom] = useState<Room>();
    const [events, setEvents] = useState();
    const [num, setNum] = useState('N155');

    const handleText = (e: any) => {
        if (e.key == 'Enter')
            setNum(e.target.value);
    }

    // API GET REQUEST
    useEffect(() => {
        axios
          .get(`https://uah.quietroom.app/building/OKT/room/${num}`)
          .then((response) => {
            console.log(response)
            setRoom(response?.data);
            let readRooms = response?.data.Events;
            readRooms = cleanEvents(readRooms);
            let addID = readRooms.map((element: any) => ({
                ...element,
                StartTime: convertTime(element.StartTime),
                EndTime: convertTime(element.EndTime),
                StartDate: parseDate(element.StartDate),
                EndDate: parseDate(element.EndDate),
                EventID: uuid()
            }));
            setEvents(addID);
          })
          .catch((Error) => {
            console.log(Error);
            return <>NOT FOUND</>;
          })
    }, [num]);

    // LOADING CONDITION
    if (events === undefined) {
        return <>Still loading...</>;
    }

    return (
      <>
        <p>test</p>
        <Scheduler
          view="week"
          disableViewNavigator
          events={[
            {
              event_id: 1,
              title: "Event 1",
              start: new Date("2021/5/2 09:30"),
              end: new Date("2021/5/2 10:30"),
            },
            {
              event_id: 2,
              title: "Event 2",
              start: new Date("2021/5/4 10:00"),
              end: new Date("2021/5/4 11:00"),
            },
          ]}
        />
      </>
    );
}
