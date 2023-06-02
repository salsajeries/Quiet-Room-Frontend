import Event from "./Event";

interface Room {
    BuildingCode: string;
    RoomNumber: string;
    Capacity: number;
    RoomType: string;
    Events: Event[];
}

export default Room;