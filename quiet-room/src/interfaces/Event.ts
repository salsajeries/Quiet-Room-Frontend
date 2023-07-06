import Days from "./Days";

interface Event {
    Name: string;
    BuildingCode: string;
    RoomNumber: string;
    StartTime: string;
    EndTime: string;
    RawStartTime: string;
    RawEndTime: string;
    DaysMet: Days[];
    StartDate: string;
    EndDate: string;
    EventID: string;
}

export default Event;