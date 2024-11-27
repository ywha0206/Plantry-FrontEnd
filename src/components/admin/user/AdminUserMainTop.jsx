import React, { useEffect, useRef } from 'react'
import { CustomSearch } from '../../Search'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/services/axios.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { useAttendStore } from '../../../store/zustand';

export default function AdminUserMainTop({selectOption , optionChanger}) {
    const dispatch = useDispatch();
    const selectedTeamId = useSelector((state) => state.team.selectedTeamId);
    const attendCount = useAttendStore((state) => state.attendCount);
    const totalCount = useAttendStore((state) => state.totalCount);

  return (
    <section className='flex items-center gap-4 mb-12'>
        <div className='ml-4 text-2xl'>
            <select value={selectOption} onChange={optionChanger} className='outline-none border rounded-md text-xl p-2 text-center'>
                <option value={0}>인사관리</option>
                <option value={1}>가입승인요청</option>
            </select>
        </div>
        <div className='ml-auto flex'>
            <CustomSearch 
                width1='40'
                width2='72'
            />
        </div>
        <select className='text-center opacity-80 w-24 h-10 outline-none border'>
            <option>직급</option>
            <option>상태</option>
        </select>
        <div>{attendCount} / {totalCount}</div>
    </section>
  )
}
