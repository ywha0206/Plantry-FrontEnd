import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import axiosInstance from '@/services/axios.jsx'

export default function PostScheduleModal({ isOpen, onClose, children , text }) {
    if(!isOpen) return null;
    const [title,setTitle] = useState("");
    const [sdate,setSdate] = useState("");
    const [edate,setEdate] = useState("");
    const [stime,setStime] = useState("");
    const [etime,setEtime] = useState("");
    const [calendarId,setCalendarId] = useState(0);
    const [location, setLocation] = useState("");
    const [importance, setImportance] = useState(0);
    const [alert,setAlert] = useState(false);
    const [memo, setMemo] = useState("");
    
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.post('/api/calendar/content', {
                title,
                sdate,
                edate,
                stime,
                etime,
                calendarId,
                location,
                importance,
                alert,
                memo
            });
            return response.data;
        },
        onSuccess: (data) => {
            onClose();
        },
        onError: (error) => {
            console.error("Error updating user", error);
        },
    });
    
    const postCalendar = async () => {
        try {
            await mutation.mutateAsync(); 
        } catch (error) {
            console.error("Error in mutation", error);
        }
    };
   
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 modal-custom-fixed">
      <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-[600px] modal-custom-width">
        <div className="display-flex mb-8 py-5 px-12 bg-gray-300 rounded-t-2xl">
            <span className="text-2xl">{text}</span>
            <button 
            onClick={onClose}
            className="text-xl float-right display-block font-bold text-gray-600 hover:text-gray-900"
            >
            닫기
            </button>
        </div>
        <div className="modal-content mx-12">
        <div className="flex gap-8 mb-4 justify-start">
              <span className="w-20 h-[40px]">제목</span>
              <div>
                <input onChange={(e)=>setTitle(e.target.value)} value={title} className="h-[40px] w-[250px] border rounded-md px-2"></input>
              </div>
            </div>
            <div className="flex gap-8 justify-start mb-4">
              <span className="w-20 h-[40px]">날짜</span>
              <div className="flex gap-3 items-center">
                <input value={sdate} onChange={(e)=>setSdate(e.target.value)} className='h-[40px]' type="date"></input> ~ <input value={edate} onChange={(e)=>setEdate(e.target.value)} className='h-[40px]' type="date"></input>
              </div>
            </div>
            <div className="flex gap-8 justify-start mb-4">
              <span className="w-20 h-[40px]">시간</span>
              <div className="flex gap-3 items-center">
                <input value={stime} onChange={(e)=>setStime(e.target.value)} className='h-[40px]' type="time"></input> ~ <input value={etime} onChange={(e)=>setEtime(e.target.value)} className='h-[40px]' type="time"></input>
              </div>
            </div>
            <div className="flex gap-8 mb-4 justify-start">
              <span className="w-20 h-[40px]">켈린더</span>
              <div>
                <select value={calendarId} onChange={(e)=>setCalendarId(e.target.value)} className="h-[40px] w-[100px] outline-none border rounded-md text-center">
                  <option value={1}>예시1</option>
                  <option value={2}>예시2</option>
                  <option value={3}>예시3</option>
                </select>
              </div>
            </div>
            <div className="flex gap-8 mb-4 justify-start">
              <span className="w-20 h-[40px]">참석자</span>
              <div className=''>
                <button className="h-[40px] w-[100px] border rounded-md">주소록</button>
              </div>
            </div>
            <div className="flex gap-8 mb-4 justify-start">
              <span className="w-20 h-[40px]">참여자</span>
              <div className='flex flex-col gap-4'>
                :::
              </div>
            </div>
            <div className="flex gap-8 mb-4 justify-start">
              <span className="w-20 h-[40px]">장소</span>
              <div>
                <input value={location} onChange={(e)=>setLocation(e.target.value)} className="h-[40px] w-[200px] border rounded-md px-2"></input>
              </div>
            </div>
            <div className="flex gap-8 mb-4 justify-start">
              <span className="w-20 h-[40px]">중요도</span>
              <div>
                <select value={importance} onChange={(e)=> setImportance(e.target.value)} className="h-[40px] text-center w-[100px] outline-none border rounded-md">
                  <option value={1}>예시1</option>
                  <option value={2}>예시2</option>
                  <option value={3}>예시3</option>
                </select>
              </div>
            </div>
            <div className="flex gap-8 mb-4 justify-start">
              <span className="w-20 h-[40px]">알림</span>
              <div>
                <select value={alert} onChange={(e)=>setAlert(e.target.value)} className="h-[40px] text-center w-[100px] outline-none border rounded-md">
                  <option value={1}>예시1</option>
                  <option value={2}>예시2</option>
                  <option value={3}>예시3</option>
                </select>
              </div>
            </div>
            <div className="flex gap-8 mb-8 justify-start">
              <span className="w-20 h-[40px]">메모</span>
              <div>
                <textarea value={memo} onChange={(e)=>setMemo(e.target.value)} className="h-[120px] w-[380px] border rounded-md resize-none px-2"></textarea>
              </div>
            </div>
            <div className="flex justify-center mb-12">
              <button onClick={postCalendar} className="bg-purple px-6 py-4 text-xs rounded-md white">등록하기</button>
            </div>
        </div>
        </div>
    </div>
  )
}


