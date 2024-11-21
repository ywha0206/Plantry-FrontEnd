import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '@/layout/sidebar/sidebar'
import "@/layout/layout/Main.scss"
import Footer from '../footer/Footer';
import MainIndex from '../../pages';

export default function Main() {
  const location = useLocation('');
  const [chat, setChat] = useState(false);
  
  return (
    <>
    {location.pathname !== "/user/login" && location.pathname !== "/" && (
      <div className="main-layout">
        <div className="main-content">
          <Sidebar />
          <div className="content">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    )}
    {(location.pathname === "/user/login" || location.pathname === "/") && (
      <>
        <Outlet />
        {location.pathname !== "/user/login" && <Footer />}
      </>
    )}
  </>
  )
}
