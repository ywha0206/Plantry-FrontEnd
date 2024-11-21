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
  const [isActive, setIsActive] = useState(0);
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
  const homeActive = () => {
      setIsActive(0)
  }
  const userActive = (e) => {
      setIsActive(1)
  };
  const projectActive = (e) => {
    setIsActive(2)
  };
  const outsourcingActive = (e) => {
    setIsActive(3)
  };
  const communityActive = (e) => {
    setIsActive(4)
  };
  const scheduleActive = (e) => {
    setIsActive(5)
  };
  const vacationActive = (e) => {
    setIsActive(6)
  };
  const attendanceActive = (e) => {
    setIsActive(7)
  };
  const outsideActive = (e) => {
    setIsActive(8)
  };

  const activeHandler = () => {

  }

  

  

  return (
    <>
      {path === 0 && sidebarWidth === 230 && (
        <div ref={sidebarRef} id="sidebar-container-w">
          <ul>
            <li onClick={closeSidebar} className="sidebar-close-btn">
              <img src={arrow} style={{width:'15px'}} alt="close" />
            </li>
            <div className='sidebar-links'>
              <Link to="/" >
                <li onClick={homeActive} className={isActive===0 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img src={mainMenu} />
                  <p>HOME</p>
                </li>
              </Link>
              <Link to="/project">
                <li onClick={projectActive} className={isActive===2 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img src={projectMenu} />
                  <p>프로젝트</p>
                </li>
              </Link>
              <Link to="/document">
                <li onClick={outsourcingActive} className={isActive===3 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6'}} src='/images/sidebar-document.png' />
                  <p>문서</p>
                </li>
              </Link>
              <Link to="/schedule">
                <li onClick={scheduleActive} className={isActive===5 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6', width:'25px', marginRight:'25px'}} src={scheduleMenu} />
                  <p>일정</p>
                </li>
              </Link>
              <Link to="/community">
                <li onClick={communityActive} className={isActive===4 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6', width:'25px', marginRight:'25px'}} src={communityMenu} />
                  <p>게시판</p>
                </li>
              </Link>
              <Link to="/cs">
                <li onClick={vacationActive} className={isActive===6 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6', width:'25px', marginRight:'25px'}} src='/images/sidebar-cs.png' />
                  <p>고객센터</p>
                </li>
              </Link>
              <Link to="/message">
                <li onClick={attendanceActive} className={isActive===7 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6', width:'25px', marginRight:'25px'}} src="/images/sidebar-mail.png" />
                  <p>메신저</p>
                </li>
              </Link>
              <Link to="/page">
                <li onClick={outsideActive} className={isActive===8 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6', width:'25px', marginRight:'25px'}} src="/images/sidebar-page.png" />
                  <p>페이지</p>
                </li>
              </Link>
            </div>
          </ul>
        </div>
      )}
      {path === 0 && sidebarWidth === 80 && (
        <div ref={sidebarRef} id="sidebar-container-s">
          <ul>
            <li onClick={expandSidebar} className="sidebar-close-btn">
              <img src={closeArrow} />
            </li> {/* 사이드바 확장 버튼 */}
              <Link to="/" >
                <li onClick={homeActive} className={isActive===0 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img src={mainMenu} />
                </li>
              </Link>
              <Link to="/project">
                <li onClick={projectActive} className={isActive===2 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img src={projectMenu} />
                </li>
              </Link>
              <Link to="/document">
                <li onClick={outsourcingActive} className={isActive===3 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6'}} src='/images/sidebar-document.png' />
                </li>
              </Link>
              <Link to="/schedule">
                <li onClick={scheduleActive} className={isActive===5 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6', width:'25px', marginRight:'25px'}} src={scheduleMenu} />
                </li>
              </Link>
              <Link to="/community">
                <li onClick={communityActive} className={isActive===4 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6', width:'25px', marginRight:'25px'}} src={communityMenu} />
                </li>
              </Link>
              <Link to="/cs">
                <li onClick={vacationActive} className={isActive===6 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6', width:'25px', marginRight:'25px'}} src='/images/sidebar-cs.png' />
                </li>
              </Link>
              <Link to="/message">
                <li onClick={attendanceActive} className={isActive===7 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6', width:'25px', marginRight:'25px'}} src="/images/sidebar-mail.png" />
                </li>
              </Link>
              <Link to="/page">
                <li onClick={outsideActive} className={isActive===8 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6', width:'25px', marginRight:'25px'}} src="/images/sidebar-page.png" />
                </li>
              </Link>
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
                <li onClick={homeActive} className={isActive===0 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img src={mainMenu} />
                  <p>HOME</p>
                </li>
              </Link>
              <Link to="/admin/user">
                <li onClick={userActive} className={isActive===1 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6'}} src={userMenu}/>
                  <p>유저 관리</p>
                </li>
              </Link>
              <Link to="/admin/project">
                <li onClick={projectActive} className={isActive===2 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img src={projectMenu} />
                  <p>업무 분담</p>
                </li>
              </Link>
              <Link to="/admin/outsourcing">
                <li onClick={outsourcingActive} className={isActive===3 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6'}} src={outSourcingMenu} />
                  <p>외주업체 관리</p>
                </li>
              </Link>
              <Link to="/admin/community">
                <li onClick={communityActive} className={isActive===4 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6', width:'25px', marginRight:'25px'}} src={communityMenu} />
                  <p>커뮤니티 관리</p>
                </li>
              </Link>
              <Link to="/admin/schedule">
                <li onClick={scheduleActive} className={isActive===5 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6', width:'25px', marginRight:'25px'}} src={scheduleMenu} />
                  <p>일정 관리</p>
                </li>
              </Link>
              <Link to="/admin/vacation">
                <li onClick={vacationActive} className={isActive===6 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.3', width:'25px', marginRight:'25px'}} src={vacationMenu} />
                  <p>휴가 관리</p>
                </li>
              </Link>
              <Link to="/admin/attendance">
                <li onClick={attendanceActive} className={isActive===7 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.3', width:'25px', marginRight:'25px'}} src="/images/sidebar-attendance.png" />
                  <p>근태 관리</p>
                </li>
              </Link>
              <Link to="/admin/outside">
                <li onClick={outsideActive} className={isActive===8 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
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
            <li onClick={expandSidebar} className="sidebar-close-btn">
              <img src={closeArrow} />
            </li>
            <Link to="/admin" >
              <li onClick={homeActive} className={isActive===0 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                <img src={mainMenu} />
              </li>
            </Link>
            <Link to="/admin/user">
              <li onClick={userActive} className={isActive===1 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                <img style={{opacity:'0.6'}} src={userMenu} />
              </li>
            </Link>
            <Link to="/admin/project">
              <li onClick={projectActive} className={isActive===2 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                <img src={projectMenu} />
              </li>
            </Link>
            <Link to="/admin/outsourcing">
              <li onClick={outsourcingActive} className={isActive===3 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                <img style={{opacity:'0.6'}} src={outSourcingMenu} />
              </li>
            </Link>
            <Link to="/admin/community">
              <li onClick={communityActive} className={isActive===4 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                <img style={{opacity:'0.6', width:'25px'}} src={communityMenu} />
              </li>
            </Link>
            <Link to="/admin/schedule">
              <li onClick={scheduleActive} className={isActive===5 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                <img style={{opacity:'0.6', width:'25px'}} src={scheduleMenu} />
              </li>
            </Link>
            <Link to="/admin/vacation">
              <li onClick={vacationActive} className={isActive===6 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                <img style={{opacity:'0.3', width:'25px'}} src={vacationMenu} />
              </li>
            </Link>
            <Link to="/admin/attendance">
              <li onClick={attendanceActive} className={isActive===7 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                <img style={{opacity:'0.3', width:'25px'}} src="/images/sidebar-attendance.png" />
              </li>
            </Link>
            <Link to="/admin/outside">
              <li onClick={outsideActive} className={isActive===8 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                <img style={{opacity:'0.6', width:'25px'}} src="/images/sidebar-outside.png" />
              </li>
            </Link>
            
          </ul>
        </div>
      )}
    </>
  );
}
