import Event from './Event'

interface Room {
  BuildingCode: string
  RoomNumber: string
  Capacity: number
  RoomType: string
  Events: Event[]
  RoomID: string
}

export default Room
