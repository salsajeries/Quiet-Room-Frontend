import NavbarObj from '@/components/NavbarObj'
import ListAvailableRooms from '../components/ListAvailableRooms'
import Layout from '@/components'
import { Container, Typography } from '@mui/material'
import Footer from '@/components/Footer'
import Head from 'next/head'

export default function AvailableRooms() {
  return (
    <>
      <Head>
        <title>QuietRoom - Find Available Rooms</title>
      </Head>
      <Layout>
        <NavbarObj></NavbarObj>
        <Container
          sx={{
            paddingTop: '5vh',
            marginLeft: 'none',
          }}
        >
          <Typography variant="h4">Find Available Rooms</Typography>
          <Typography variant="subtitle1">
            Select a weekday and time range to search for available rooms on campus. You can filter and sort the results
            by building or room number by clicking the menu button for each column. Select a row to get a quick-view of
            room info, and double click a row to find the full details and schedule for that room!
          </Typography>
          <br></br>
          <ListAvailableRooms></ListAvailableRooms>
        </Container>
        <Footer></Footer>
      </Layout>
    </>
  )
}
