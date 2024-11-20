import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '@/layout/sidebar/Sidebar.scss';
import arrow from '@/assets/sidebar-arrow.png';
import closeArrow from '@/assets/sidebar-open.png';
import mainMenu from '@/assets/sidebar-main.png';
import projectMenu from '@/assets/sidebar-project.png';
import userMenu from '@/assets/sidebar-user.png';
import outSourcingMenu from '@/assets/sidebar-outsourcing.png';
import communityMenu from '@/assets/sidebar-task.png';
import scheduleMenu from '@/assets/sidebar-schedule.png';
import vacationMenu from '@/assets/sidebar-vacation.png';

export default function Sidebar() {
  const location = useLocation().pathname; // useLocation()의 위치를 제대로 가져오기
  const [path, setPath] = useState(0);
  const [sidebarWidth, setSidebarWidth] = useState(230); // 초기 사이드바 너비 230px로 설정
  const sidebarRef = useRef(null);
  const navigate = useNavigate("");
  useEffect(() => {
    if (location.startsWith('/admin')) {
      setPath(1);
    }
  }, [location]); // location이 변경될 때마다 path 상태를 업데이트

  const closeSidebar = () => {
    if(sidebarRef.current){
      sidebarRef.current.style.transition = 'min-width 0.3 ease'
      sidebarRef.current.style.minWidth = '80px'
    }
    setTimeout(() => {
      setSidebarWidth(80);
    }, 500);
  };

  const expandSidebar = () => {
    if(sidebarRef.current){
      sidebarRef.current.style.transition = 'min-width 0.3 ease'
      sidebarRef.current.style.minWidth = '230px'
    }
    setTimeout(() => {
      setSidebarWidth(230);
    }, 500);
  };

  const navigateMain = () => {
    navigate("/admin")
  }

  const navigateProject = () => {

  }

  const navigateUser = () => {

  }

  const navigateoutSourcing = () => {
    
  }

  return (
    <>
      {path === 0 && sidebarWidth === 230 && (
        <div ref={sidebarRef} id="sidebar-container">
          <ul>
            <li onClick={closeSidebar} className="sidebar-close-btn">
              <img src={arrow} alt="close" />
            </li>
          </ul>
        </div>
      )}
      {path === 0 && sidebarWidth === 80 && (
        <div ref={sidebarRef} id="sidebar-container-s">
          <ul>
            <li onClick={expandSidebar} className="sidebar-close-btn">
              <img src={closeArrow} />
            </li> {/* 사이드바 확장 버튼 */}
          </ul>
        </div>
      )}
      {path === 1 && sidebarWidth === 230 && (
        <div ref={sidebarRef} id="admin-sidebar-container-w">
          <ul>
            <li onClick={closeSidebar} className="sidebar-close-btn">
              <img src={arrow} alt="close" />
            </li>
          </ul>
        </div>
      )}
      {path === 1 && sidebarWidth === 80 && (
        <div ref={sidebarRef} id="admin-sidebar-container-s">
          <ul>
            <li onClick={navigateMain} className="sidebar-close-btn">
              <img src={mainMenu} />
            </li>
            <li onClick={navigateUser} className="sidebar-close-btn">
              <img style={{opacity:'0.6'}} src={userMenu} />
            </li>
            <li onClick={navigateProject} className="sidebar-close-btn">
              <img src={projectMenu} />
            </li>
            <li onClick={navigateoutSourcing} className="sidebar-close-btn">
              <img style={{opacity:'0.6'}} src={outSourcingMenu} />
            </li>
            <li onClick={navigateoutSourcing} className="sidebar-close-btn">
              <img style={{opacity:'0.6'}} src={communityMenu} />
            </li>
            <li onClick={navigateoutSourcing} className="sidebar-close-btn">
              <img style={{opacity:'0.6'}} src={scheduleMenu} />
            </li>
            <li onClick={navigateoutSourcing} className="sidebar-close-btn">
              <img style={{opacity:'0.3'}} src={vacationMenu} />
            </li>
            <li onClick={expandSidebar} className="sidebar-close-btn">
              <img src={closeArrow} />
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
