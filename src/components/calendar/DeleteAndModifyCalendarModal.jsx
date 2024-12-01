import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import CustomAlert from '../Alert';
import GetAddressModal from './GetAddressModal';

export default function DeleteAndModifyCalendarModal({isOpen, onClose,selectedCalendar}) {
    if(!isOpen) return null;
    const queryClient = useQueryClient();
    const [customAlert, setCustomAlert] = useState(false);
    const [customAlertType, setCustomAlertType] = useState("");
    const [customAlertMessage, setCustomAlertMessage] = useState("");
    const [name, setName] = useState(selectedCalendar.name);
    const [status, setStatus] = useState(selectedCalendar.status);
    const [color,setColor] = useState(selectedCalendar.color);
    const [colors,setColors] = useState(["red","blue","green","purple","yellow","orange"])
    const usedColors = queryClient.getQueryData(['calendar-name']);
    const [filteredColors, setFilteredColors] = useState([]);
    const [isFiltering, setIsFiltering] = useState(false);
    const [openAddress,setOpenAddress] = useState(false)
    
    useEffect(() => {
        if (Array.isArray(usedColors) && usedColors.length > 0) {
            const filtered = colors.filter(v => {
                return !usedColors.some(used => used.color === v) || v === selectedCalendar.color;
            });
        setFilteredColors(filtered);
        setIsFiltering(true);
        }
    }, [usedColors, colors]);
    
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 modal-custom-fixed">
        <CustomAlert 
            type={customAlertType} message={customAlertMessage} isOpen={customAlert}
        />
        <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-[800px] modal-custom-width max-h-[800px] overflow-scroll scrollbar-none">
        
            <div className="display-flex mb-8 py-3.5 px-12 bg-white border-b rounded-t-2xl z-10 sticky top-0">
                <span className="text-xl font-bold">{selectedCalendar.name}</span>
                <button 
                onClick={onClose}
                className="text-xl float-right display-block font-bold text-gray-600 hover:text-gray-900"
                >
                X
                </button>
            </div>
            <div className='mx-12'>
                <div className="flex gap-8 mb-4 justify-start">
                    <span className="w-[100px] h-[40px]">제목</span>
                    <div>
                    <input onChange={(e)=>setName(e.target.value)} value={name} className="h-[40px] w-[250px] border rounded-md px-2 outline-none"></input>
                    </div>
                </div>
                <div className='flex gap-8 mb-4 justify-start'>
                    <span className='w-[100px] h-[40px]'>기본캘린더</span>
                    <select value={status} onChange={(e)=>setStatus(e.target.value)} className='h-[40px] w-[250px] border rounded-md px-2 outline-none'>
                    <option value={0}>속성 선택</option>
                    <option value={1}>설정</option>
                    <option value={2}>설정안함</option>
                    </select>
                </div>
                <div className='flex gap-8 mb-4 justify-start'>
                    <span className='w-[100px] h-[40px]'>캘린더색상</span>
                    <select value={color} onChange={(e)=>setColor(e.target.value)} className='h-[40px] w-[250px] border rounded-md px-2 outline-none'>
                    {
                        (!(Array.isArray(usedColors)) || usedColors.length==0)
                        ?
                        colors.map(v => {
                        return <option key={v} value={v}>{v}</option>
                        })
                        :
                        (!isFiltering)
                        ?
                        (
                        <option>로딩중...</option>
                        )
                        :
                        (
                        filteredColors.map(c => {
                        return <option key={c} value={c}>{c}</option>
                        }))
                    }
                    </select>
                </div>
                <div className='flex gap-8 mb-4 justify-start'>
                    <span className='w-[100px] h-[40px]'>공유인원</span>
                    <button onClick={()=>setOpenAddress(true)} className='border w-[100px] h-[40px] rounded-lg'>주소록</button>
                </div>
                <div className="flex gap-8 mb-4 justify-start max-h-[200px] overflow-scroll scrollbar-none">
                    <span className="w-[100px] h-[40px] sticky top-0">참여자목록</span>
                    <div>
                        <ul>
                            <li className='cursor-pointer hover:bg-purple-200'>
                                <div className='flex justify-between px-[10px]'>
                                    <div className='flex'>
                                        <img src='/images/admin-profile.png' className='w-[50px] h-[50px] mr-[10px]'></img>
                                        <div className='flex flex-col'>
                                            <div className='flex w-[200px]'>
                                                <div className='mr-[10px]'>이상훈</div>
                                                <div className='text-gray-400'>부장</div>
                                            </div>
                                            <div className='w-[150px] mr-[30px] text-gray-400 text-[12px]'>sanghun11010@gmail.com</div>
                                        </div>
                                        <div className='flex items-center w-[200px]'>
                                            마케팅부서
                                        </div>
                                    </div>
                                    <div className='flex items-center'>
                                        <button className='text-[20px] text-gray-400 font-bold'>X</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='flex py-8 justify-end gap-4 items-center'>
                    <button onClick={null} className='bg-purple w-[110px] hover:opacity-80 py-4 text-sm rounded-md white'>수정하기</button>
                    <button 
                    className="bg-purple w-[110px] py-4 text-sm rounded-md white hover:opacity-60 cursor-pointer"
                    onClick={null}
                    >
                    삭제
                    </button>
                </div>
            </div>
            <GetAddressModal 
                isOpen={openAddress}
                onClose={()=>setOpenAddress(false)}
            />
        </div>
        
    </div>
  )
}
