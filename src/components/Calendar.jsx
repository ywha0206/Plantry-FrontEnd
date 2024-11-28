import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/services/axios.jsx'
const MyCalendar = ({
  height,
  width
}) => {
  const {data : calendarDate, isLoading : isLoadingCalendarDate, isError : isErrorCalendarDate} = useQuery({
    queryKey : ['calendar-date'],
    queryFn : async () => {
      try {
        const response = await axiosInstance.get(`/api/calendar`)
        console.log(response.data)
        return response.data
      } catch(err){
        return err
      }
    },
    enabled : true,
    refetchOnWindowFocus: false,  
    staleTime: 300000,  
    retry: false,
    cacheTime : 5 * 60 * 1000
  })
  if(isLoadingCalendarDate){
    return <p>로딩중입니다...</p>
  }

  if(isErrorCalendarDate){
    return <p>{calendarDate}</p>
  }

  return (
    <div style={{ width: `${width}`, margin: '0 auto' }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={calendarDate}
        contentHeight={height}
        
      />
    </div>
  );
};

export default MyCalendar;