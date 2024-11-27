import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'

import axiosInstance from '@/services/axios.jsx'
import { useAttendStore } from '../../../store/zustand';

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
        staleTime : 60 * 1000,
        cacheTime : 60 * 5 * 1000,
        refetchOnWindowFocus: true,
    });

    const setAttendCount = useAttendStore((state) => state.setAttendCount);
    const setTotalCount = useAttendStore((state) => state.setTotalCount);

    useEffect(() => {
        if (usersData && Array.isArray(usersData)) {
            const attendCount = usersData.filter((v) => v.attendance === '출근').length;
            setAttendCount(attendCount);  // zustand 상태에 카운트 저장
            setTotalCount(usersData.length);
        }
    }, [usersData, setAttendCount]);

    if(!selectedTeamId){
        return <section className="overflow-auto max-h-[300px] scrollbar-none">
                    <table className="w-full table-auto border-collapse mb-16">
                        <thead className='bg-gray-200 h-16 sticky top-0 z-10'>
                            <tr className='text-center'>
                                <th className="w-1/10 rounded-tl-lg"><input type="checkbox" /></th>
                                <th className="w-1/10">번호</th>
                                <th className="w-2/10">이름</th>
                                <th className="w-1/10">상태</th>
                                <th className="w-1/10">근태</th>
                                <th className="w-1/10">직급</th>
                                <th className="w-2/10">가입일자</th>
                                <th className="w-1/10 rounded-tr-lg">비고</th>
                            </tr>
                        </thead>
                    </table>
                    <div className='flex justify-center items-center'>팀 또는 부서를 선택해주세요...</div>
                </section>;
        }

    if (isLoadingUsers) {
        return <section className="overflow-auto max-h-[300px] scrollbar-none">
                    <table className="w-full table-auto border-collapse mb-16">
                        <thead className='bg-gray-200 h-16 sticky top-0 z-10'>
                            <tr className='text-center'>
                                <th className="w-1/10 rounded-tl-lg"><input type="checkbox" /></th>
                                <th className="w-1/10">번호</th>
                                <th className="w-2/10">이름</th>
                                <th className="w-1/10">상태</th>
                                <th className="w-1/10">근태</th>
                                <th className="w-1/10">직급</th>
                                <th className="w-2/10">가입일자</th>
                                <th className="w-1/10 rounded-tr-lg">비고</th>
                            </tr>
                        </thead>
                    </table>
                    <div className='flex justify-center items-center'>로딩중입니다...</div>
                </section>;
        }

    if (isErrorUsers) {
        return <p>Error:</p>;
    }

    if (!Array.isArray(usersData) || usersData.length === 0) {
        return <p>사용자 데이터가 없습니다.</p>;
    }

    

    return (
        <>
        <section className="overflow-auto max-h-[300px] min-h-[300px] scrollbar-none mb-16">
            <table className="w-full table-auto border-collapse mb-16">
                <thead className='bg-gray-200 h-16 sticky top-0 z-10'>
                    <tr className='text-center'>
                        <th className="w-1/10 rounded-tl-lg"><input type="checkbox" /></th>
                        <th className="w-1/10">번호</th>
                        <th className="w-2/10">이름</th>
                        <th className="w-1/10">상태</th>
                        <th className="w-1/10">근태</th>
                        <th className="w-1/10">직급</th>
                        <th className="w-2/10">가입일자</th>
                        <th className="w-1/10 rounded-tr-lg">비고</th>
                    </tr>
                </thead>
                <tbody>
                {usersData.map((v, i) => {
                    return (
                    <tr key={i} className='text-center h-16 border-b'>
                        <td className="w-1/10"><input type="checkbox" /></td>
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
        <button className='bg-purple white w-[80px] h-[40px] rounded-md'>선택삭제</button>
        </>
  )
}
