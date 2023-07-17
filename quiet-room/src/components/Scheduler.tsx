import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Accordion, AccordionDetails, AccordionSummary, Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from '@/styles/Scheduler.module.css'
import InfoIcon from '@mui/icons-material/Info';



interface SchedulerViewInt {
    rawEvents: any[];
    toggle: boolean;
}

interface SchedulerEvent {
    title: string,
    start: string,
    end: string
}

// Get the first day of the current week (Monday)
function getFirstDayOfWeek(d: Date) {

    const date = new Date(d);
    const day = date.getDay(); // Get day of week

    // Day of month - day of week (-6 if Sunday), otherwise +1
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);

    return new Date(date.setDate(diff));
}

// Get a specific day of the current week based on increment value from Monday
function getNewDayOfWeek(monday: Date, inc: number) {
    
    const newDay = new Date(monday);
    newDay.setDate(newDay.getDate() + inc);
    return newDay
}

// Format date and time for scheduler events
function getFormattedDate(date: Date, time: string) {

    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = (date.getDate()).toString();

    if (month.length == 1)
        month = '0' + month;
    if (day.length == 1)
        day = '0' + day;

    // console.log(year + '-' + month + '-' + day)

    let hour = time.substring(0, 2);
    let min = time.substring(2, 4);

    // console.log (hour + ':' + min + ':00')

    //console.log (year.toString() + '-' + month.toString() + '-' + day.toString() + ' ' + hour.toString() + ':' + min.toString() + ':00')
    return (year.toString() + '-' + month.toString() + '-' + day.toString() + ' ' + hour.toString() + ':' + min.toString() + ':00')

}


export default function Schedule(props: SchedulerViewInt) {
    
    // Date constants
    const today = new Date();
    const monday = getFirstDayOfWeek(today);
    const tuesday = getNewDayOfWeek(monday, 1);
    const wednesday = getNewDayOfWeek(monday, 2);
    const thursday = getNewDayOfWeek(monday, 3);
    const friday = getNewDayOfWeek(monday, 4);

    // Formatted scheduler events
    const [events, setEvents] = useState<SchedulerEvent[]>([]);

    const getEventData = () => {
        setEvents([])       // Empty events to reset data

        props.rawEvents.map((event: any) => {

            if (event.DaysMet.includes('Monday')) {
                setEvents(events => [...events,
                    {
                        title: event.Name,
                        start: getFormattedDate(monday, event.RawStartTime),
                        end: getFormattedDate(monday, event.RawEndTime)
                    }
                ])
            }

            if (event.DaysMet.includes('Tuesday')) {
                setEvents(events => [...events,
                    {
                        title: event.Name,
                        start: getFormattedDate(tuesday, event.RawStartTime),
                        end: getFormattedDate(tuesday, event.RawEndTime)
                    }
                ])
            }
                
            if (event.DaysMet.includes('Wednesday')) {
                setEvents(events => [...events,
                    {
                        title: event.Name,
                        start: getFormattedDate(wednesday, event.RawStartTime),
                        end: getFormattedDate(wednesday, event.RawEndTime)
                    }
                ])
            }
                
            if (event.DaysMet.includes('Thursday')) {
                setEvents(events => [...events,
                    {
                        title: event.Name,
                        start: getFormattedDate(thursday, event.RawStartTime),
                        end: getFormattedDate(thursday, event.RawEndTime)
                    }
                ])
            }
                
            if (event.DaysMet.includes('Friday')) {
                setEvents(events => [...events,
                    {
                        title: event.Name,
                        start: getFormattedDate(friday, event.RawStartTime),
                        end: getFormattedDate(friday, event.RawEndTime)
                    }
                ])
            }
                
        })
    }


    useEffect(() => {
        getEventData()
    }, [props.rawEvents])

    
    return (
        <div>
            <Accordion 
                elevation={0} defaultExpanded={true}
                sx={{
                    backgroundColor: '#E0DDDD',
                    color: "#E0DDDD",
                    '& .MuiAccordionSummary-content': {
                        justifyContent: 'center'
                    }
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: "#E0DDDD" }}/>}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    sx={{
                        backgroundColor: '#181848',
                        color: '#E0DDDD',
                        borderRadius: '15px',
                    }}
                >
                    <Typography variant={'h6'} sx={{ flexShrink: 0 }}>
                        Schedule View
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Paper sx={{
                        border: '2px solid #181848',
                        borderRadius: '15px',
                        padding: '2vw',
                        backgroundColor: 'transparent'
                    }}>
                        <Grid container justifyContent={'center'} alignItems={'center'}>
                            <Grid item xs={1}>
                                <InfoIcon style={{ color: '#181848' }} />
                            </Grid>
                            <Grid item xs={11}>
                                <Typography sx={{ flexShrink: 0 }}>
                                    Note: Courses offered as both undergradute and graduate level appear twice in the same timeslot with
                                    their respective course numbers (Ex: CS 424 and CS 524). Courses may also overlap if they are given
                                    different course IDs by different departments (Ex: CE 370 and MAE 370).
                                </Typography>
                            </Grid>
                        </Grid>
                        <br></br>
                        <div className={styles.customCalendar}>
                            <FullCalendar
                                plugins={[ timeGridPlugin ]}
                                themeSystem='bootstrap5'
                                initialView='timeGridWeek'
                                weekends={false}
                                allDaySlot={false}
                                events={events}
                                eventColor='#508AA8'
                                slotMinTime={"08:00:00"}
                                slotMaxTime={"20:00:00"}
                                firstDay={1}
                                nowIndicator={true}
                                expandRows
                                dayHeaderFormat={{ weekday: 'short' }}
                                headerToolbar={false}
                            />
                        </div>
                    </Paper>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}