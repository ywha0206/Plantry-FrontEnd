import React, { useState } from 'react'
import '@/pages/admin/Admin.scss'
import {CustomSearch} from '@/components/Search'
import { CustomButton } from '../../components/Button';
import MyCalendar from '../../components/Calendar';

export default function AdminVacation() {
  return (
    <div id='admin-vacation-container'>
      <aside className='admin-vacation-aside overflow-scroll flex flex-col scrollbar-none'>
        <section className='flex justify-center mb-8'><p className='text-lg'>팀 / 부서 (6)</p></section>
        <section className='flex justify-center mb-8 w-26'>
            <select className='outline-none border rounded-l-md opacity-80 h-11 w-24 text-center text-sm'>
                <option>참여자</option>
                <option>부장</option>
                <option>담당업무</option>
            </select>
            <CustomSearch 
                width1='24'
                width2='40'
            />
        </section>
        <section className='mb-6'>
            <div className='flex justify-between items-center'>
                <p>팀 (3)</p><img className='w-3 h-2' src='/images/arrow-top.png'/>
            </div>
            <div className='flex justify-between items-center px-8 mt-6'>
                <p>팀 1</p> <img src='/images/button-dot.png'/>
            </div>
            <div className='flex justify-between items-center px-8 mt-6'>
                <p>팀 2</p> <img src='/images/button-dot.png'/>
            </div>
            <div className='flex justify-between items-center px-8 mt-6'>
                <p>팀 3</p> <img src='/images/button-dot.png'/>
            </div>
        </section>
        <section className='mb-6'>
            <div className='flex justify-between items-center'>
                <p>부서 (3)</p><img className='w-3 h-2' src='/images/arrow-top.png'/>
            </div>
            <div className='flex justify-between items-center px-8 mt-6'>
                <p>부서 1</p> <img src='/images/button-dot.png'/>
            </div>
            <div className='flex justify-between items-center px-8 mt-6'>
                <p>부서 2</p> <img src='/images/button-dot.png'/>
            </div>
            <div className='flex justify-between items-center px-8 mt-6'>
                <p>부서 3</p> <img src='/images/button-dot.png'/>
            </div>
        </section>
        <section className='mt-auto flex flex-col gap-5'>
            <button className='bg-blue white h-8 rounded-md'>부서 생성</button>
            <button className='bg-blue white h-8 rounded-md'>팀 생성</button>
        </section>
      </aside>
      <section className='admin-vacation-main'>
        <section className='flex mb-16'>
            <p className='text-lg flex items-center justify-center w-80 rounded-md bg-gray-200 mx-auto'>부서 1</p>
            <div className="flex"> 
                <img src='/images/dumy-profile.png' className="w-1/3" />
                <img src='/images/dumy-profile.png' className="w-1/3" />
                <img src='/images/dumy-profile.png' className="w-1/3" />
                <img src='/images/dumy-profile.png' className="w-1/3" />
            </div>
        </section>
        <section>
            <MyCalendar />
        </section>
      </section>
    </div>
  )
}
