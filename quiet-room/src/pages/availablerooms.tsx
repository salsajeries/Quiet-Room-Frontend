import LiveBackground from "@/components/LiveBackground";
import NavbarObj from "@/components/NavbarObj";
import Link from "next/link";
import ListAvailableRooms from "../components/ListAvailableRooms";
import Layout from "@/components";


export default function AvailableRooms() {
    return (
      <>
        <Layout>
          <NavbarObj></NavbarObj>
          <div style={{marginTop: '13vh'}}>
            <ListAvailableRooms></ListAvailableRooms>
          </div>
        </Layout>
      </>
    )
  }
  