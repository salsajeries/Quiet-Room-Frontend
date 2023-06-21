import React, { useEffect, useState } from "react";
import Event from '@/interfaces/Event';
import axios from "axios";
import Room from "@/interfaces/Room";
import { Box, TextField } from "@mui/material";
import { uuid } from "uuidv4";
import { ProcessedEvent } from "@aldabil/react-scheduler/types";
import '@/styles/Scheduler.module.css'


export function getRoomInfo(buildingVal: any, numVal: any): any {

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

        console.log(readRoom)

        })
        .catch((Error) => {
        console.log(Error);
        return "NOT FOUND";
    })

    return readRoom;

}