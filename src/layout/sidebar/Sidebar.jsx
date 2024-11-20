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
      sidebarRef.current.style.minWidth = '80px'
      sidebarRef.current.style.maxWidth = '80px';
    }
    setTimeout(() => {
      setSidebarWidth(80);
    }, 500);
  };

  const expandSidebar = () => {
    if(sidebarRef.current){
      sidebarRef.current.style.minWidth = '230px'
    }
    setTimeout(() => {
      setSidebarWidth(230);
    }, 500);
  };

  //          handler           //
  const navigateHandler = (e) => {

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
              <img src={arrow} style={{width:'15px'}} alt="close" />
            </li>
            <div className='sidebar-links'>
              <Link to="/admin" >
                <li onClick={navigateHandler} className="sidebar-close-btn">
                  <img src={mainMenu} />
                  <p>HOME</p>
                </li>
              </Link>
              <Link to="/admin/user">
                <li onClick={navigateHandler} className="sidebar-close-btn">
                  <img style={{opacity:'0.6'}} src={userMenu} />
                  <p>유저 관리</p>
                </li>
              </Link>
              <Link to="/admin/project">
                <li onClick={navigateHandler} className="sidebar-close-btn">
                  <img src={projectMenu} />
                  <p>업무 분담</p>
                </li>
              </Link>
              <Link to="/admin/outsourcing">
                <li onClick={navigateHandler} className="sidebar-close-btn">
                  <img style={{opacity:'0.6'}} src={outSourcingMenu} />
                  <p>외주업체 관리</p>
                </li>
              </Link>
              <Link to="/admin/community">
                <li onClick={navigateHandler} className="sidebar-close-btn">
                  <img style={{opacity:'0.6', width:'25px', marginRight:'25px'}} src={communityMenu} />
                  <p>커뮤니티 관리</p>
                </li>
              </Link>
              <Link to="/admin/schedule">
                <li onClick={navigateHandler} className="sidebar-close-btn">
                  <img style={{opacity:'0.6', width:'25px', marginRight:'25px'}} src={scheduleMenu} />
                  <p>일정 관리</p>
                </li>
              </Link>
              <Link to="/admin/vacation">
                <li onClick={navigateHandler} className="sidebar-close-btn">
                  <img style={{opacity:'0.3', width:'25px', marginRight:'25px'}} src={vacationMenu} />
                  <p>휴가 관리</p>
                </li>
              </Link>
              <Link to="/admin/attendance">
                <li onClick={navigateHandler} className="sidebar-close-btn">
                  <img style={{opacity:'0.3', width:'25px', marginRight:'25px'}} src="/images/sidebar-attendance.png" />
                  <p>근태 관리</p>
                </li>
              </Link>
              <Link to="/admin/outside">
                <li onClick={navigateHandler} className="sidebar-close-btn">
                  <img style={{opacity:'0.6', width:'25px', marginRight:'25px'}} src="/images/sidebar-outside.png" />
                  <p>외근 관리</p>
                </li>
              </Link>
            </div>
          </ul>
        </div>
      )}
      {path === 1 && sidebarWidth === 80 && (
        <div ref={sidebarRef} id="admin-sidebar-container-s">
          <ul>
            <Link to="/admin" >
              <li onClick={navigateHandler} className="sidebar-close-btn">
                <img src={mainMenu} />
              </li>
            </Link>
            <Link to="/admin/user">
              <li onClick={navigateHandler} className="sidebar-close-btn">
                <img style={{opacity:'0.6'}} src={userMenu} />
              </li>
            </Link>
            <Link to="/admin/project">
              <li onClick={navigateHandler} className="sidebar-close-btn">
                <img src={projectMenu} />
              </li>
            </Link>
            <Link to="/admin/outsourcing">
              <li onClick={navigateHandler} className="sidebar-close-btn">
                <img style={{opacity:'0.6'}} src={outSourcingMenu} />
              </li>
            </Link>
            <Link to="/admin/community">
              <li onClick={navigateHandler} className="sidebar-close-btn">
                <img style={{opacity:'0.6', width:'25px'}} src={communityMenu} />
              </li>
            </Link>
            <Link to="/admin/schedule">
              <li onClick={navigateHandler} className="sidebar-close-btn">
                <img style={{opacity:'0.6', width:'25px'}} src={scheduleMenu} />
              </li>
            </Link>
            <Link to="/admin/vacation">
              <li onClick={navigateHandler} className="sidebar-close-btn">
                <img style={{opacity:'0.3', width:'25px'}} src={vacationMenu} />
              </li>
            </Link>
            <Link to="/admin/attendance">
              <li onClick={navigateHandler} className="sidebar-close-btn">
                <img style={{opacity:'0.3', width:'25px'}} src="/images/sidebar-attendance.png" />
              </li>
            </Link>
            <Link to="/admin/outside">
              <li onClick={navigateHandler} className="sidebar-close-btn">
                <img style={{opacity:'0.6', width:'25px'}} src="/images/sidebar-outside.png" />
              </li>
            </Link>
            <li onClick={expandSidebar} className="sidebar-close-btn">
              <img src={closeArrow} />
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
