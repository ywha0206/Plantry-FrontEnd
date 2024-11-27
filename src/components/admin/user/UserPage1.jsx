import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'

import axiosInstance from '@/services/axios.jsx'
import { useAttendStore } from '../../../store/zustand';
import UserPage1Resp from './loading/UserPage1Resp';

export default function UserPage1() {
    const dispatch = useDispatch();
    const selectedTeamId = useSelector((state) => state.team.selectedTeamId);

    const { 
        data: usersData, 
        isLoading: isLoadingUsers, 
        isError: isErrorUsers, 
        error: UsersError ,
    } = useQuery({
        queryKey: ['group-members',selectedTeamId],
        queryFn: async () => {
            const response = await axiosInstance.get(`/api/group/users/detail?team=${selectedTeamId}`);
            return response.data;
        },
        enabled: !!selectedTeamId,
        staleTime : 60 * 1000,
        cacheTime : 60 * 5 * 1000,
        refetchOnWindowFocus: false,
    });

    const setAttendCount = useAttendStore((state) => state.setAttendCount);
    const setTotalCount = useAttendStore((state) => state.setTotalCount);

    useEffect(() => {
        if (usersData && Array.isArray(usersData)) {
            const attendCount = usersData.filter((v) => v.attendance === '출근').length;
            setAttendCount(attendCount); 
            setTotalCount(usersData.length);
        }
    }, [usersData, setAttendCount]);

    if(!selectedTeamId){
        return <UserPage1Resp text="팀 또는 부서를 선택해주세요"/>;}

    if (isLoadingUsers) {
        return <UserPage1Resp text="로딩중입니다"/>;}

    if (isErrorUsers) {
        return <UserPage1Resp text={UsersError.response.data}/>;
    }

    if (!Array.isArray(usersData) || usersData.length === 0) {
        return <UserPage1Resp text="검색결과가 없습니다"/>;
    }
    

    return (
        <>
        <section className="overflow-auto max-h-[300px] min-h-[300px] scrollbar-none mb-16">
            <table className="w-full table-auto border-collapse mb-16">
                <thead className='bg-gray-200 h-16 sticky top-0 z-10'>
                    <tr className='text-center'>
                        <th className="w-[133px] rounded-tl-lg">번호</th>
                        <th className="w-[273px]">이름</th>
                        <th className="w-[133px]">상태</th>
                        <th className="w-[133px]">근태</th>
                        <th className="w-[133px]">직급</th>
                        <th className="w-[273px]">가입일자</th>
                        <th className="w-[133px] rounded-tr-lg">비고</th>
                    </tr>
                </thead>
                <tbody>
                {usersData.map((v, i) => {
                    return (
                    <tr key={i} className='text-center h-16 border-b'>
                        <td className="w-1/10">{i+1}</td> 
                        <td className="w-2/10">{v.name}</td>
                        <td className="w-2/10">{v.status}</td>
                        <td className="w-1/10">{v.attendance}</td>
                        <td className="w-1/10">{v.level}</td>
                        <td className="w-1/10">{v.createAt}</td>
                        <td className="w-1/10">머할까</td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
        </section>
        </>
  )
}
