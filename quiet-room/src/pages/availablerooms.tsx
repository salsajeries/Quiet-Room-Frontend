import LiveBackground from "@/components/LiveBackground";
import NavbarObj from "@/components/NavbarObj";
import Link from "next/link";
import ListAvailableRooms from "../components/ListAvailableRooms";
import Layout from "@/components";
import { Typography } from "@mui/material";


export default function AvailableRooms() {
    return (
      <>
        <Layout>
          <NavbarObj></NavbarObj>
          <Typography variant="h4">Find Available Rooms</Typography>
          <Typography variant="subtitle1">
              Select a weekday and time range to search for available rooms on campus. You can filter
              and sort the results by building or room number by clicking the menu for each column. Select 
              a row to view some basic room information, and double click a row to find the full details
              and schedule for that room!
          </Typography>
          <ListAvailableRooms></ListAvailableRooms>
        </Layout>
      </>
    )
  }
  