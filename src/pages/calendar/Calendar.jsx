import React, { useEffect, useState } from 'react'
import '@/pages/calendar/Calendar.scss'
import MyCalendar from '../../components/Calendar'
import {CustomSearch} from '@/components/Search.jsx'
import { Modal } from '../../components/Modal'
import PostScheduleModal from '../../components/calendar/PostScheduleModal'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '@/services/axios.jsx'

export default function Calendar() {

  const [isOpen , setIsOpen] = useState(false);
  const [calendarId, setCalendarId] = useState(0);
  const onClose = () => {
    setIsOpen(false)
  }

  const queryClient = useQueryClient();

  const openModal = () => {
    setIsOpen(true)
  }

  const {data : calendar , isLoading : isLoadingCalendar, isError : isErrorCalendar} = useQuery({
    queryKey : ['calendar-date',calendarId],
    queryFn : async () => {
      try {
        const response = await axiosInstance.get(`/api/calendar?calendarId=${calendarId}`)
        return response.data
      } catch(err) {
        return err;
      }
    }
  })

  useEffect(()=>{
    queryClient.setQueryData(['calendar-date'], calendar);
    console.log(calendar)
  },[calendar])

  const {data : calendarName, isLoading : isLoadingCalendarName, isError : isErrorCalendarName} = useQuery({
    queryKey : ['calendar-name'],
    queryFn : async () => {
      try {
        const response = await axiosInstance.get(`/api/calendar/name?id=9`)
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

  if(isErrorCalendarName){
    return <p>{calendarName}</p>
  }

  if (!Array.isArray(calendarName) || calendarName.length === 0) {
    return <p>등록된 캘린더가 없습니다...</p>
  }

  const changeCalendar = (id) =>{setCalendarId(id)}

  return (
    <div id='calendar-container'>
      <aside className='calendar-aside'>
        <section className='flex justify-center mt-2 mb-6'>
          <button onClick={openModal} className='bg-purple white px-8 py-2 text-xl rounded-lg flex justify-center items-center'>일정 등록</button>
        </section>
        <section className='mb-8'>
          <MyCalendar
            height={230}
            width="230px"
          />
        </section>
        <section className='mb-16'>    
          <div className='flex gap-4'>
            <img src='/images/calendar-schedule.png' />
            <p className='text-sm font-bold'>일정 목록</p>
          </div>
          <ul className='text-purple-500 ml-6 mt-6 text-sm font-bold'>
            <li className='mb-2'>• 회의</li>
            <li className='mb-2'>• 생일</li>
            <li className='mb-2'>• 점심 약속</li>
          </ul>
        </section>
        <section className='mb-8'>    
          <div className='flex gap-4'>
            <img src='/images/calendar-mine.png' />
            <p className='text-sm font-bold'>내 캘린더</p>
          </div>
          <ul className='text-purple-500 ml-6 mt-6 text-sm font-bold'>
          {
            calendarName.map((v) => {
              return (
              <li key={v.id} onClick={()=>changeCalendar(v.id)} className='mb-2 cursor-pointer hover:text-purple-700'>• {v.name}</li>
              )
            })
          } 
          </ul>
        </section>
      </aside>
      <section className='calendar-main'>
        <section className='flex justify-end mb-16'>
          <article className='flex justify-center items-center w-80'>
            <div className='h-11 px-4 border flex items-center cursor-pointer rounded-l-lg hover:bg-gray-200'>일</div>
            <div className='h-11 px-4 border flex items-center cursor-pointer hover:bg-gray-200'>주</div>
            <div className='h-11 px-4 border flex items-center cursor-pointer hover:bg-gray-200'>월</div>
            <div className='h-11 px-4 border flex items-center cursor-pointer rounded-r-lg hover:bg-gray-200'>년</div>
          </article>
          <article className='mr-36'>
            <CustomSearch 
              width1="40"
              width2="80"
            />
          </article>
        </section>
        <section className='big-calendar'>
          <MyCalendar 
            width="80%"
            height={600}
          />
        </section>
      </section>
      <PostScheduleModal 
        isOpen={isOpen}
        onClose={onClose}
        text="일정 등록"
      />
    </div>
  )
}
