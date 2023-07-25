//import styles from '@/styles/RoomInfo.module.css'
import React from 'react'
import NavbarObj from '@/components/NavbarObj'
import DisplayRoomInfo from '../components/DisplayRoomInfo'
import Layout from '@/components'
import { Container, Typography } from '@mui/material'
import Footer from '@/components/Footer'
import Head from 'next/head'

export default function RoomInfo() {
  return (
    <>
      <Head>
        <title>QuietRoom - Find Room Info</title>
      </Head>
      <Layout>
        <div style={{minHeight: '83vh'}}>
          <NavbarObj></NavbarObj>
          <Container
            sx={{
              paddingTop: '5vh',
              marginLeft: 'none',
            }}
          >
            <Typography variant="h4">Find Room Info</Typography>
            <Typography variant="subtitle1">
              Search for a room's full schedule by entering the building ID and room number. You can filter
              and sort the results by clicking the menu button for each column. You can also see a quick
              overview of the room's details in the "Room Quick View" card! At the bottom, you'll find the
              "Schedule View" where you can look at the room's weekly schedule in a calendar view!
            </Typography>
            <br></br>
            <DisplayRoomInfo></DisplayRoomInfo>
          </Container>
        </div>
        <Footer></Footer>
      </Layout>
    </>
  )
}
