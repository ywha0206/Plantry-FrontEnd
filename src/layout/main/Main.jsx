import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '@/layout/sidebar/sidebar'
import "@/layout/main/Main.scss"

export default function Main() {
  const location = useLocation('');
  const [chat, setChat] = useState(false);
  
  return (
    <>
    {location.pathname != "/user/login" &&
      <div className="main-layout">
        <div className="main-content">
          {location.pathname != '/' &&
            <Sidebar />
          }
          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>
    }

    {location.pathname == "/user/login" &&
      <Outlet />
    }
    </>
  )
}
