import styles from '@/styles/RoomInfo.module.css'
import React from "react";
import NavbarObj from "@/components/NavbarObj";
import DisplayRoomInfo from "../components/DisplayRoomInfo";
import Layout from "@/components";
import { Container, Typography } from '@mui/material';


export default function RoomInfo() {

  return (
    <>
      <Layout>
        <NavbarObj></NavbarObj>
        <Container maxWidth={'xl'}
            sx={{
              paddingTop: '5vh',
              marginLeft: 'none'
            }}
        >
          <Typography variant="h4">Find Room Info</Typography>
          <Typography variant="subtitle1">
              Search for a room's full schedule by entering the building ID and room number. You can filter
              and sort the results by clicking the menu for each column. You'll also find a quick overview
              of the room's details in the 'Room Quick View' card!
          </Typography>
          <hr/>
          <DisplayRoomInfo></DisplayRoomInfo>
        </Container>
      </Layout>
    </>
  );
}
  