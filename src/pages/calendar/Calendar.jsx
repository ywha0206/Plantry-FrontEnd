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
import { Client } from '@stomp/stompjs'
import useWebSocket from '../../util/useWebSocket'
import { useAuthStore } from '../../store/useAuthStore'

export default function Calendar() {

    const [calendarId, setCalendarId] = useState(0);
    const [calendarAdded, setCalendarAdded] = useState(false);
    const [calendarDeleted, setCalendarDeleted] = useState(false);
    const [changeCalendarAdd,setChangeCalendarAdd] = useState(false);
    const [changeCalendarRemove,setChangeCalendarRemove] = useState(false);
    const [openPostCalendar, setOpenPostCalendar] = useState(false);
    const [openDeleteAndModifyCalendar, setOpenDeleteAndModifyCalendar] = useState(false);
    const [selectedCalendarIds, setSelectedCalendarIds] = useState([]);
    const [selectedCalendar, setSelectedCalendar] = useState({
        id : 0,
        color : "",
        myid : 0,
        name : "",
        status : 0,
        userIds : []
    });
    const accessToken = useAuthStore(state => state.accessToken);
    const [accessToken1, setAccessToken1] = useState();
    const [isQueryEnabled, setIsQueryEnabled] = useState(true);


    useEffect(() => {
        const timer = setTimeout(() => {
            setIsQueryEnabled(true);  // 일정 시간 뒤에 쿼리 활성화
        }, 1000);  // 2초 지연

        return () => clearTimeout(timer);  // 컴포넌트 언마운트 시 타이머 클리어
    }, []);

    useEffect(()=>{
        if(accessToken){
            setAccessToken1(accessToken)
        }
    },[accessToken])
    const { stompClient, isConnected, receiveMessage , updateCalendarIds , updateUserId } = useWebSocket({

    });

    useEffect(()=>{

        if(Array.isArray(receiveMessage.update)&&receiveMessage.update.length>0){
            queryClient.setQueryData(['calendar-name'],(prevData)=> {
                console.log(prevData)
                if(Array.isArray(prevData)&& prevData.length>0){
                    return prevData.map((item) => {
                        if (item.id == receiveMessage.name.id) {
                            return {
                                ...item,
                                name : receiveMessage.name.name,
                                status : receiveMessage.name.status,
                                color : receiveMessage.name.color
                            };
                        }
                        return item;
                    });
                }
            })
            queryClient.setQueryData(['calendar-date'], (prevData) => {
                console.log(prevData)
                if(Array.isArray(prevData)&& prevData.length>0){
                    const updatedData = prevData
                        ? prevData.map((item) => {
                            const updatedItem = receiveMessage.update.find(data => String(data.id) === String(item.id));
                            if (updatedItem) {
                                return {
                                    ...item,
                                    title: updatedItem.title,  // putData에서 받은 새로운 title 값
                                    start: updatedItem.start,  // putData에서 받은 새로운 startDate 값
                                    end: updatedItem.end,  // putData에서 받은 새로운 endDate 값
                                    color: updatedItem.color,  // 기존 color는 그대로 유지
                                    sheve: updatedItem.sheve,
                                    location: updatedItem.location,
                                    importance: updatedItem.importance,
                                    alert: updatedItem.alert,
                                    memo: updatedItem.memo
                                };
                            }
                            return item;
                        })
                        : [];

                    return updatedData;
                }
            });

        }

        if(receiveMessage.delete && (receiveMessage.delete != 0)){
            console.log(receiveMessage)
            console.log(prevData)
            queryClient.setQueryData(['calendar-date'], (prevData) => {
                // prevData가 없으면 그대로 반환하고, 있다면 필터링 처리
                if (!Array.isArray(prevData)) {
                    return prevData;  // prevData가 없으면 그대로 반환
                } else {
                    // prevData가 있을 경우, 삭제 처리
                    const updatedData = prevData.filter((item) => {
                        return String(item.id) !== String(receiveMessage.delete);
                    });
                }
                return updatedData;
            });

            queryClient.setQueryData(['calendar-name'], (prevData) => {
                if(Array.isArray(prevData)&&prevData.length>0){
                    return prevData.filter(item => item.id != receiveMessage.delete);
                }
            });
        }
        if (receiveMessage.post) {
            queryClient.setQueryData(['calendar-name'], (prevData) => {
                // prevData가 배열인 경우에만 새로운 항목을 추가
                if (Array.isArray(prevData)) {
                    return [
                        ...prevData,  // 기존 데이터 유지
                        {
                            color: receiveMessage.post.color, // 객체의 color
                            name: receiveMessage.post.name,   // 객체의 name
                            status: receiveMessage.post.status // 객체의 status
                        }
                    ];
                } else {
                    // prevData가 배열이 아니면 그냥 기존 데이터 그대로 반환
                    return [receiveMessage.post]; // 기존 데이터가 없다면 새로운 객체만 포함된 배열 반환
                }
            });
        }
        // if(receiveMessage.contentsPut){
        //     queryClient.setQueryData(['calendar-date'],(prevData) => {
        //         if (Array.isArray(prevData)) {
        //             const updatedData = prevData.map((item) => {
        //                 if (item.id == receiveMessage.contentsPut.contentId) {
        //                     return {
        //                         ...item,
        //                         title: receiveMessage.contentsPut.title,
        //                         start: receiveMessage.contentsPut.startDate,
        //                         end: receiveMessage.contentsPut.endDate,
        //                     };
        //                 }
        //                 console.log(item)
        //                 return item; // id가 일치하지 않으면 그대로 반환
        //             }); // 수정된 배열 반환
        //             console.log(updatedData)
        //             return updatedData
        //         }
        //     })
        // }


    },[receiveMessage])

    const queryClient = useQueryClient();

    const openModal = () => {
        setOpenPostCalendar(true)
    }

    const calendarNames = useCalenderNameStore((state) => state.setCalendarNames);

    const {data : calendarName, isLoading : isLoadingCalendarName, isError : isErrorCalendarName, refetch : refetchCalendarName} = useQuery({
        queryKey : ['calendar-name'],
        queryFn : async () => {
            try {
                const response = await axiosInstance.get('/api/calendar/name')
                return response.data
            } catch(err){
                return err
            }
        },
        enabled : isQueryEnabled,
        staleTime: 1000,
        retry: 1,
        refetchOnWindowFocus: false,
    })

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
        enabled : isQueryEnabled
    })



    useEffect(()=>{
        if(calendarName && calendarName.length>0){
            calendarNames(calendarName);
            refetchCalendarName();
        }
    },[calendarName,refetchCalendarName])

    const changeCalendar = (e,id,color) =>{
        if(e.target.classList.contains(`bg-${color}-200`)){
            setCalendarId(id);
            setSelectedCalendarIds((prev)=>[...prev, id])
        } else {
            setCalendarId(id);
            setSelectedCalendarIds((prev) => prev.filter((item) => item !== id));
        }
    }

    const {data : calendarDate, isLoading : isLoadingCalendarDate, isError : isErrorCalendarDate} = useQuery({
        queryKey : ['calendar-date'],
        queryFn : async () => {
            try {
                const response = await axiosInstance.get(`/api/calendar`)
                return response.data
            } catch(err){
                return err
            }
        },
        enabled : isQueryEnabled,
        refetchOnWindowFocus: false,
        staleTime: 0,
        retry: 1,
        cacheTime : 5 * 60 * 1000,
        select: (data) => {
            if (selectedCalendarIds && selectedCalendarIds.length > 0 ) {
                return data.filter((item) => selectedCalendarIds.includes(item.sheave));
            }
            return [];
        },
    });

    const {data : initialIds , isLoading : isLoadingInitialIds, isError : isErrorInitialIds , refetch : refetchInitialIds} =
        useQuery({
            queryKey: ['initial-ids'],
            queryFn : async () => {
                try {
                    const resp = await axiosInstance.get("/api/calendar/groups")
                    return resp.data
                } catch (err) {
                    return err
                }
            },
            enabled : isQueryEnabled,

        })

    useEffect(()=>{
        refetchInitialIds();
    },[])

    useEffect(()=>{
        if(!isLoadingInitialIds && !isErrorInitialIds && initialIds){
            updateCalendarIds(initialIds.calendarIds)
            updateUserId(initialIds.userId)
        }
    },[initialIds])

    if(isErrorInitialIds&&isLoadingInitialIds){
        return null;
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
                                            calendarName.map((v,i) => {
                                                return (
                                                    <li key={i}  className=' flex justify-between mr-[20px]'>
                                                        <div
                                                            onClick={(e) => {
                                                                e.target.classList.toggle(`bg-${e.target.dataset.color}-200`);
                                                                changeCalendar(e, v.id, v.color);
                                                                setSelectedCalendar(v);
                                                            }}
                                                            data-status={v.status}
                                                            data-color={v.color}
                                                            className={`mb-2 cursor-pointer w-[150px] pl-[10px] hover:text-purple-700 rounded-lg `}
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
                    <MainBigCalendar
                        calendarDate={calendarDate}
                        isLoadingCalendarDate={isLoadingCalendarDate}
                        isErrorCalendarDate={isErrorCalendarDate}
                    />
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
