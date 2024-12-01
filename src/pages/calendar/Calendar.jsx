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
import PostCalendarModal from '../../components/calendar/PostCalendarModal'
import DeleteAndModifyCalendarModal from '../../components/calendar/DeleteAndModifyCalendarModal'

export default function Calendar() {

    const [calendarId, setCalendarId] = useState(0);
    const [calendarAdded, setCalendarAdded] = useState(false);
    const [calendarDeleted, setCalendarDeleted] = useState(false);
    const [changeCalendarAdd,setChangeCalendarAdd] = useState(false);
    const [changeCalendarRemove,setChangeCalendarRemove] = useState(false);
    const [openPostCalendar, setOpenPostCalendar] = useState(false);
    const [openDeleteAndModifyCalendar, setOpenDeleteAndModifyCalendar] = useState(false);
    const [selectedCalendarId, setSelectedCalendarId] = useState(0);
    const [selectedCalendarName, setSelectedCalendarName] = useState("");
    const [selectedCalendar, setSelectedCalendar] = useState({});

    const queryClient = useQueryClient();

    const openModal = () => {
        setOpenPostCalendar(true)
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
                // calendar가 배열이 아니라면 빈 배열로 처리
                const calendarData = Array.isArray(calendar) ? calendar : [];

                // 상태 초기화
                setChangeCalendarAdd(false);
                setCalendarAdded(false);

                // prevData가 undefined일 경우 빈 배열로 처리, 그 후 새 데이터를 추가
                if (!Array.isArray(prevData)) {
                    return [...calendarData];  // prevData가 없거나 배열이 아닐 경우 새로 추가된 데이터만 반환
                }

                // prevData가 배열일 때, 기존 데이터와 새 데이터를 합쳐서 반환
                return [...prevData, ...calendarData];
            });
        }
    }, [changeCalendarAdd, calendar]);

    useEffect(() => {
        if (changeCalendarRemove) {
            queryClient.setQueryData(['calendar-date'], (prevData) => {
                // calendar2가 배열이 아니라면 빈 배열로 처리
                const calendarData = Array.isArray(calendar2) ? calendar2 : [];

                // 상태 초기화
                setChangeCalendarRemove(false);
                setCalendarDeleted(false);

                // prevData가 배열이 아니거나 없는 경우 빈 배열을 반환
                if (!Array.isArray(prevData)) {
                    return [];  // 기존 데이터가 없으면 그냥 빈 배열 반환
                }

                // prevData가 배열일 때, 삭제할 데이터를 필터링하여 반환
                return prevData.filter(item =>
                    !calendarData.some(calendarItem => calendarItem.id === item.id)
                );
            });
        }
    }, [changeCalendarRemove, calendar2]);


    const {data : calendarName, isLoading : isLoadingCalendarName, isError : isErrorCalendarName} = useQuery({
        queryKey : ['calendar-name'],
        queryFn : async () => {
            try {
                const response = await axiosInstance.get('/api/calendar/name?id=9')
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
            <aside className='calendar-aside overflow-scroll flex flex-col scrollbar-none'>
                <section className='mb-[120px]'>

                </section>
                <section className='mb-16'>
                    <div className='flex gap-4 mb-6'>
                        <img src='/images/calendar-schedule.png' />
                        <p className='text-sm font-bold'>일정 목록</p>
                    </div>
                    {
                        (isLoadingCalendarContentName)
                            ?
                            (
                                <ul>로딩중입니다...</ul>
                            )
                            :
                            (isErrorCalendarContentName)
                                ?
                                (
                                    <ul>서버접속에 실패했습니다...</ul>
                                )
                                :
                                (!Array.isArray(calendarContentName) || calendarContentName.length === 0)
                                    ? (
                                        <ul className="ml-6 mt-6 text-sm font-bold">
                                            등록된 일정이 없습니다...
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
                            (isLoadingCalendarName)
                                ?
                                (
                                    <li>로딩중입니다...</li>
                                )
                                :
                                (isErrorCalendarName)
                                    ?
                                    (
                                        <li>
                                            서버 접속에 실패했습니다...
                                        </li>
                                    )
                                    :
                                    ((!Array.isArray(calendarName)) || calendarName.length===0)
                                        ?
                                        (
                                            <li>등록된 캘린더가 없습니다...</li>
                                        )
                                        :
                                        (
                                            calendarName.map((v) => {
                                                return (
                                                    <li key={v.id}  className=' flex justify-between mr-[20px]'>
                                                        <div
                                                            onClick={(e) => {
                                                                e.target.classList.toggle(`bg-${e.target.dataset.color}-200`);
                                                                changeCalendar(e, v.id, v.color);
                                                            }}
                                                            data-status={v.status}
                                                            data-color={v.color}
                                                            className={`mb-2 cursor-pointer w-[150px] pl-[10px] hover:text-purple-700 rounded-lg ${v.status === 1 ? ` bg-${v.color}-200` : ''}`}
                                                        >• {v.name}</div>
                                                        <img onClick={(e)=>{setOpenDeleteAndModifyCalendar(true);setSelectedCalendar(v);}} className='w-[16px] h-[16px] opacity-60 cursor-pointer hover:opacity-100' src='/images/calendar-setting.png'></img>
                                                    </li>
                                                )
                                            }))
                        }
                        <div className="23"></div>
                    </ul>
                </section>
                <section className='mt-auto flex flex-col gap-5'>
                    <button onClick={openModal} className='bg-blue white px-8 py-2 text-xl rounded-lg flex justify-center items-center'>캘린더 등록</button>
                </section>
            </aside>
            <section className='calendar-main'>
                <section className='big-calendar mt-8 overflow-scroll max-h-[700px] w-[1080px] mx-auto scrollbar-none'>
                    <MainBigCalendar />
                </section>
                <PostCalendarModal
                    isOpen={openPostCalendar}
                    onClose={()=>{setOpenPostCalendar(false)}}
                />
                <DeleteAndModifyCalendarModal
                    isOpen={openDeleteAndModifyCalendar}
                    onClose={()=>setOpenDeleteAndModifyCalendar(false)}
                    selectedCalendar={selectedCalendar}
                />
            </section>

        </div>
    )
}
