import Days from "./Days";

interface Event {
    Name: string;
    BuildingCode: string;
    RoomNumber: string;
    StartTime: string;
    EndTime: string;
    DaysMet: Days[];
    StartDate: string;
    EndDate: string;
    ID: string;
}

export default Event;