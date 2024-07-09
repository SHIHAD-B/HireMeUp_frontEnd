import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import dayjs from 'dayjs';
import { companyFetchSchedule } from '@/redux/actions/companyAction';

export const CompanyCalendar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data: schedule } = useSelector((state: RootState) => state.schedule)
  const { data:company } = useSelector((state: RootState) => state.company)
  const [events, setEvents] = useState()

  useEffect(() => {
    async function fetch() {
      await dispatch(companyFetchSchedule(String(company?._id))).then((res)=>{
        setEvents(res.payload)
      })
    }
    fetch()
  }, []);

  useEffect(() => {
    const event = schedule?.map((event:any) => ({
      ...event,
      start: dayjs(String(event?.date)).toISOString()
    }));
    setEvents(event as any)
  }, [])


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
    <div className='flex w-full flex-col justify-center bg-lightgreen px-3 py-1 border bg-gray-100 border-customviolet rounded-md text-customviolet font-semibold'>
      <b>{eventInfo.timeText}</b>
      <p className='w-full overflow-hidden overflow-ellipsis whitespace-normal break-words'>
        {eventInfo.event.title}
      </p>
    </div>



  )
}

