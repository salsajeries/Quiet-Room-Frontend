import Link from "next/link";

export default function AvailableRooms() {
    return (
      <>
        <p>Yay available rooms!</p>
        <Link href="/" >
          <img src="info.png" />
          Home
        </Link>
      </>
    )
  }
  