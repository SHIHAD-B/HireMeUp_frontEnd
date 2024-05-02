import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect } from 'react';

const Schedule = () => {
  // Dummy data for events
  const events = [
    {
      title: 'Meeting',
      start: '2022-04-27T10:00:00',
      end: '2022-04-27T12:00:00'
    },
    {
      title: 'Interview',
      start: '2022-04-28T14:00:00',
      end: '2022-04-28T16:00:00'
    },
    // Add more dummy events as needed
  ];

  useEffect(() => {
    // Fetch data or perform any side effects
  }, []);

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView='dayGridWeek'
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth, timeGridWeek, timeGridDay"
        }}
        events={events}
        eventContent={renderEventContent}
      />
    </div>
  )
}

function renderEventContent(eventInfo: { timeText: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; event: { title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }; }) {
  return (
    <div className='flex flex-col justify-center bg-lightgreen px-3 py-1 rounded-md text-white font-semibold'>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </div>
  )
}

export default Schedule;
