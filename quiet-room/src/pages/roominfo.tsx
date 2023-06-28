import MechButton from "@/components/MechButton";
import styles from '@/styles/RoomInfo.module.css'
import { Col, Container, Nav, Row, Stack } from "react-bootstrap";

import React, { useEffect, useState } from "react";
import axios from "axios";
//import GetRoomInfo from "./api/getRoomInfo";
import NavbarObj from "@/components/NavbarObj";
import DisplayRoomInfo from "../components/DisplayRoomInfo";
import GetAvailableRooms from "../api/getAvailableRooms";
import { uuid } from "uuidv4";


import { getRoomInfo, getResponse } from '../api/getData'
import Room from "@/interfaces/Room";
import Layout from "@/components";


export default function RoomInfo() {

  return (
    <>
      <Layout>
        <NavbarObj></NavbarObj>
        <DisplayRoomInfo></DisplayRoomInfo>
      </Layout>
    </>
  );
}
  