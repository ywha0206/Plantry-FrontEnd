import React, { useEffect, useRef, useState } from 'react'
import '@/pages/calendar/Calendar.scss'
import MyCalendar from '../../components/Calendar'
import {CustomSearch} from '@/components/Search.jsx'
import { Modal } from '../../components/Modal'
import PostScheduleModal from '../../components/calendar/PostScheduleModal'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '@/services/axios.jsx'
import { useCalenderNameStore } from '../../store/zustand'
import MainBigCalendar from '../../components/calendar/MainBigCalendar'
import CalendarContentNameResponse from '../../components/calendar/loading/CalendarContentNameResponse'

export default function Calendar() {

  const [isOpen , setIsOpen] = useState(false);
  const [calendarId, setCalendarId] = useState(0);
  const [calendarAdded, setCalendarAdded] = useState(false);
  const [calendarDeleted, setCalendarDeleted] = useState(false);
  const [changeCalendarAdd,setChangeCalendarAdd] = useState(false);
  const [changeCalendarRemove,setChangeCalendarRemove] = useState(false);
  const onClose = () => {
    setIsOpen(false)
  }

  const queryClient = useQueryClient();

  const openModal = () => {
    setIsOpen(true)
  }
  const calendarNames = useCalenderNameStore((state) => state.setCalendarNames);

  const {data : calendarContentName , isLoading : isLoadingCalendarContentName, isError : isErrorCalendarContentName} = useQuery({
    queryKey : ['calendar-content-name'],
    queryFn : async () => {
      try {
        const response = await axiosInstance.get(`/api/calendar/content/name/today`)
        return response.data;
      } catch (err) {
        return err;
      }
    },
    retry : 1,
    enabled : true
  })

  const {data : calendar , isLoading : isLoadingCalendar, isError : isErrorCalendar} = useQuery({
    queryKey : ['calendar-date',calendarId,calendarAdded],
    queryFn : async () => {
      try {
        const response = await axiosInstance.get(`/api/calendar?calendarId=${calendarId}`)
        setChangeCalendarAdd(true)
        return response.data
      } catch(err) {
        setChangeCalendarAdd(true)
        return err;
      }
    },
    retry : 1,
    enabled : !!calendarAdded
  })

  const {data : calendar2 , isLoading : isLoadingCalendar2, isError : isErrorCalendar2} = useQuery({
    queryKey : ['calendar-date',calendarId, calendarDeleted],
    queryFn : async () => {
      try {
        const response = await axiosInstance.get(`/api/calendar?calendarId=${calendarId}`)
        setChangeCalendarRemove(true)
        return response.data
      } catch(err) {
        setChangeCalendarRemove(true)
        return err;
      }
    },
    retry : 1,
    enabled : !!calendarDeleted
  })

  useEffect(() => {
    if (changeCalendarAdd) {
      queryClient.setQueryData(['calendar-date'], (prevData) => {
        const calendarData = Array.isArray(calendar) ? calendar : [];
        setChangeCalendarAdd(false)
        setCalendarAdded(false)
        return [...(prevData || []), ...calendarData];
      });
    }
  }, [changeCalendarAdd, calendar]);

  useEffect(() => {
    if (changeCalendarRemove) {
      queryClient.setQueryData(['calendar-date'], (prevData) => {
        const calendarData = Array.isArray(calendar2) ? calendar2 : [];
        setChangeCalendarRemove(false)
        setCalendarDeleted(false)
        return (prevData || []).filter(item => 
          !calendarData.some(calendarItem => calendarItem.id === item.id)
        );
      });
    }
  }, [changeCalendarRemove, calendar2]);

  const {data : calendarName, isLoading : isLoadingCalendarName, isError : isErrorCalendarName} = useQuery({
    queryKey : ['calendar-name'],
    queryFn : async () => {
      try {
        const response = await axiosInstance.get(`/api/calendar/name?id=9`)
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

  useEffect(()=>{
    if(calendarName && calendarName.length>0){
      calendarNames(calendarName);
    }
  },[calendarName])

  if(isErrorCalendarName){
    return <p>{calendarName}</p>
  }

  if (!Array.isArray(calendarName) || calendarName.length === 0) {
    return <ul >일정 없다 개꿀!</ul>
  }


  const changeCalendar = (e,id,color) =>{
    if(e.target.classList.contains(`bg-${color}-200`)){
      setCalendarId(id);
      setCalendarAdded(true);
    } else {
      setCalendarId(id);
      setCalendarDeleted(true)
    }
  }


  return (
    <div id='calendar-container'>
      <aside className='calendar-aside'>
        <section className='flex justify-center mt-2 mb-6'>
          <button onClick={openModal} className='bg-blue white px-8 py-2 text-xl rounded-lg flex justify-center items-center'>캘린더 등록</button>
        </section>
        <section className='mb-[120px]'>

        </section>
        <section className='mb-16'>    
          <div className='flex gap-4'>
            <img src='/images/calendar-schedule.png' />
            <p className='text-sm font-bold'>일정 목록</p>
          </div>
          {
        (!Array.isArray(calendarContentName) || calendarContentName.length === 0)
        ? (
          <ul className="ml-6 mt-6 text-sm font-bold">
            일정없음 개꿀!
          </ul>
        )
        : (
          <CalendarContentNameResponse calendarContentName={calendarContentName} />
        )
      }
        </section>
        <section className='mb-8'>    
          <div className='flex gap-4'>
            <img src='/images/calendar-mine.png' />
            <p className='text-sm font-bold'>내 캘린더</p>
          </div>
          <ul className='text-gray-500 ml-6 mt-6 text-sm font-bold'>
          {
            calendarName.map((v) => {
              return (
                <li 
                key={v.id} 
                onClick={(e) => {
                  e.target.classList.toggle(`bg-${e.target.dataset.color}-200`);
                  changeCalendar(e, v.id, v.color); 
                }} 
                data-status={v.status} 
                data-color={v.color}
                className={`mb-2 cursor-pointer w-[140px] pl-[10px] hover:text-purple-700 rounded-lg ${v.status === 1 ? ` bg-${v.color}-200` : ''}`}
              >• {v.name}
              </li>
              )
            })
          }
          <div className="23"></div>
          </ul>
        </section>
      </aside>
      <section className='calendar-main'>
        <section className='big-calendar mt-8 overflow-scroll max-h-[700px] w-[1080px] mx-auto scrollbar-none'>
          <MainBigCalendar /> 
        </section>
      </section>
      
    </div>
  )
}
