import React from 'react'
import { useSelector } from 'react-redux';

export default function AdminHeader() {
    const selectedTeamId = useSelector((state) => state.team.selectedTeamId);
  return (
    <section className='flex mb-32'>
        <p className='text-lg flex items-center justify-center w-80 rounded-md bg-gray-200 mx-auto'>{selectedTeamId}</p>
        <div className="flex"> 
            <img src='/images/dumy-profile.png' className="w-1/3" />
            <img src='/images/dumy-profile.png' className="w-1/3" />
            <img src='/images/dumy-profile.png' className="w-1/3" />
            <img src='/images/dumy-profile.png' className="w-1/3" />
        </div>
    </section>
  )
}
