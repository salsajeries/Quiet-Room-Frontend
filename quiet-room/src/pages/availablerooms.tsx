import LiveBackground from "@/components/LiveBackground";
import NavbarObj from "@/components/NavbarObj";
import Link from "next/link";
import GetAvailableRooms from "./api/getAvailableRooms";


export default function AvailableRooms() {
    return (
      <>
        <GetAvailableRooms></GetAvailableRooms>
      </>
    )
  }
  