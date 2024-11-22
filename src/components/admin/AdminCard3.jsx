import React from 'react'
import { Link } from 'react-router-dom'

export const AdminCard3 = ({
  clickHandler,
  title,
  content,
  messanger
}) => {
  return (
    <div onClick={clickHandler} className='admin-card3 shadow-md rounded-md cursor-pointer'>
      <section className='flex justify-between mb-8'>
        <div className='flex gap-2 items-center'>
            <img style={{width:'25px' , height:'25px'}} src='/images/admin-basic-icon.png' />
            <p className=''>{title}</p>
        </div>
        <div className='flex gap-2 items-center'>
            <img src='/images/admin-verdot-icon.png'/>
            <img src='/images/admin-star-icon.png'/>
        </div>
      </section>
      <section className='mb-4'>
        {title === '진행도' &&
          <>
          <input className='w-full' type='range' max={1} value={content}></input>
          </>
        }
        {title !== '진행도' && 
          <>
          {content}
          </>
        }
        
      </section>
      <section className='flex justify-between items-center'>
            {messanger}
        <button className='bg-blue-50 p-2 rounded-xl text-xs text-blue-500'>Zendesk</button>
      </section>
    </div>
  )
}

