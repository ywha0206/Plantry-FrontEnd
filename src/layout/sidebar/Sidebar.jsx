import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '@/layout/sidebar/Sidebar.scss';
import closeArrow from '@/assets/sidebar-open.png';
import mainMenu from '@/assets/sidebar-main.png';


export default function Sidebar() {
  const location = useLocation().pathname; // useLocation()의 위치를 제대로 가져오기
  const [path, setPath] = useState(0);
  const [sidebarWidth, setSidebarWidth] = useState(230); // 초기 사이드바 너비 230px로 설정
  const sidebarRef = useRef(null);
  //                              useState                                             //
  const [isActive, setIsActive] = useState(() => {
    const savedState = localStorage.getItem('activeState');
    return savedState ? JSON.parse(savedState) : 0;  // 초기값은 0
  });
  //                              useState                                             //

  //                                     useEffect                                     //
  useEffect(() => {
    const pathMapping = {
      '/admin': { path: 1, active: 0 },
      '/admin/user': { path: 1, active: 1 },
      '/admin/project': { path: 1, active: 2 },
      '/admin/outsourcing': { path: 1, active: 3 },
      '/admin/community': { path: 1, active: 4 },
      '/admin/schedule': { path: 1, active: 5 },
      '/admin/vacation': { path: 1, active: 6 },
      '/admin/attendance': { path: 1, active: 7 },
      '/admin/outside': { path: 1, active: 8 },
      '/my': { path: 0, active: 1 },
      '/project': { path: 0, active: 2 },
      '/document': { path: 0, active: 3 },
      '/calendar': { path: 0, active: 5 },
      '/community': { path: 0, active: 4 },
      '/cs': { path: 0, active: 6 },
      '/message': { path: 0, active: 7 },
      '/page': { path: 0, active: 8 },
    };
  
    const { path, active } = pathMapping[location] || { path: null, active: null };
  
    if (path !== null && active !== null) {
      setPath(path);
      setIsActive(active);
    }
  }, [location]);

  useEffect(() => {
    localStorage.setItem('activeState', JSON.stringify(isActive));
  }, [isActive]);

  //                                     useEffect                                     //

  //                              Handler                                              //
  const closeSidebar = () => {
    if(sidebarRef.current){
      sidebarRef.current.style.minWidth = '80px';
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
  //                              Handler                                              //
  return (
    <>
      {path === 0 && sidebarWidth === 230 && (
        <div ref={sidebarRef} id="sidebar-container-w">
          <ul>
            <li onClick={closeSidebar} className="sidebar-close-btn">
              <img className='opacity-60' src='/images/sidebar-arrow.png' alt="close" />
            </li>
            <div className='sidebar-links'>
              <Link to="/" >
                <li className={isActive===0 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img src={mainMenu} />
                  <p>HOME</p>
                </li>
              </Link>
              <Link to="/my">
                <li className={isActive===1 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6'}} src='/images/sidebar-user.png'/>
                  <p>내 정보 관리</p>
                </li>
              </Link>
              <Link to="/project">
                <li className={isActive===2 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img className='opacity-60' src='/images/sidebar-project.png' />
                  <p>프로젝트</p>
                </li>
              </Link>
              <Link to="/document">
                <li className={isActive===3 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6'}} src='/images/sidebar-document.png' />
                  <p>문서</p>
                </li>
              </Link>
              <Link to="/calendar">
                <li className={isActive===5 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6'}} src='/images/sidebar-schedule.png' />
                  <p>일정</p>
                </li>
              </Link>
              <Link to="/community">
                <li className={isActive===4 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6'}} src='/images/sidebar-community.png' />
                  <p>게시판</p>
                </li>
              </Link>
              <Link to="/cs">
                <li className={isActive===6 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6'}} src='/images/sidebar-cs.png' />
                  <p>고객센터</p>
                </li>
              </Link>
              <Link to="/message">
                <li className={isActive===7 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6'}} src="/images/sidebar-mail.png" />
                  <p>메신저</p>
                </li>
              </Link>
              <Link to="/page">
                <li className={isActive===8 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6'}} src="/images/sidebar-page.png" />
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
                <li className={isActive===0 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img src={mainMenu} />
                </li>
              </Link>
              <Link to="/my">
                <li className={isActive===1 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6'}} src='/images/sidebar-user.png'/>
                </li>
              </Link>
              <Link to="/project">
                <li className={isActive===2 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img className='opacity-60' src='/images/sidebar-project.png' />
                </li>
              </Link>
              <Link to="/document">
                <li className={isActive===3 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6'}} src='/images/sidebar-document.png' />
                </li>
              </Link>
              <Link to="/calendar">
                <li className={isActive===5 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6'}} src='/images/sidebar-schedule.png' />
                </li>
              </Link>
              <Link to="/community">
                <li className={isActive===4 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6'}} src='/images/sidebar-community.png' />
                </li>
              </Link>
              <Link to="/cs">
                <li className={isActive===6 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6'}} src='/images/sidebar-cs.png' />
                </li>
              </Link>
              <Link to="/message">
                <li className={isActive===7 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6'}} src="/images/sidebar-mail.png" />
                </li>
              </Link>
              <Link to="/page">
                <li className={isActive===8 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6'}} src="/images/sidebar-page.png" />
                </li>
              </Link>
          </ul>
        </div>
      )}
      {path === 1 && sidebarWidth === 230 && (
        <div ref={sidebarRef} id="admin-sidebar-container-w">
          <ul>
            <li onClick={closeSidebar} className="sidebar-close-btn">
              <img className='opacity-60' src='/images/sidebar-arrow.png' alt="close" />
            </li>
            <div className='sidebar-links'>
              <Link to="/admin" >
                <li className={isActive===0 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img src={mainMenu} />
                  <p>HOME</p>
                </li>
              </Link>
              <Link to="/admin/user">
                <li className={isActive===1 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6'}} src='/images/sidebar-user.png'/>
                  <p>유저 관리</p>
                </li>
              </Link>
              <Link to="/admin/project">
                <li className={isActive===2 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img className='opacity-60' src='/images/sidebar-project.png' />
                  <p>업무 분담</p>
                </li>
              </Link>
              <Link to="/admin/outsourcing">
                <li className={isActive===3 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6'}} src='/images/sidebar-outsourcing.png' />
                  <p>외주업체 관리</p>
                </li>
              </Link>
              <Link to="/admin/community">
                <li className={isActive===4 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6'}} src='/images/sidebar-community.png' />
                  <p>커뮤니티 관리</p>
                </li>
              </Link>
              <Link to="/admin/schedule">
                <li className={isActive===5 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6'}} src='/images/sidebar-schedule.png' />
                  <p>일정 관리</p>
                </li>
              </Link>
              <Link to="/admin/vacation">
                <li className={isActive===6 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6'}} src='/images/sidebar-vacation.png' />
                  <p>휴가 관리</p>
                </li>
              </Link>
              <Link to="/admin/attendance">
                <li className={isActive===7 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6'}} src="/images/sidebar-attendance.png" />
                  <p>근태 관리</p>
                </li>
              </Link>
              <Link to="/admin/outside">
                <li className={isActive===8 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                  <img style={{opacity:'0.6'}} src="/images/sidebar-outside.png" />
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
              <img src='/images/sidebar-open.png' />
            </li>
            <Link to="/admin" >
              <li className={isActive===0 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                <img src={mainMenu} />
              </li>
            </Link>
            <Link to="/admin/user">
              <li className={isActive===1 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                <img style={{opacity:'0.6'}} src='/images/sidebar-user.png' />
              </li>
            </Link>
            <Link to="/admin/project">
              <li className={isActive===2 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                <img className='opacity-60' src='/images/sidebar-project.png' />
              </li>
            </Link>
            <Link to="/admin/outsourcing">
              <li className={isActive===3 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                <img style={{opacity:'0.6'}} src='/images/sidebar-outsourcing.png' />
              </li>
            </Link>
            <Link to="/admin/community">
              <li className={isActive===4 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                <img style={{opacity:'0.6'}} src='/images/sidebar-community.png' />
              </li>
            </Link>
            <Link to="/admin/schedule">
              <li className={isActive===5 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                <img style={{opacity:'0.6'}} src='/images/sidebar-schedule.png' />
              </li>
            </Link>
            <Link to="/admin/vacation">
              <li className={isActive===6 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                <img style={{opacity:'0.6'}} src='/images/sidebar-vacation.png' />
              </li>
            </Link>
            <Link to="/admin/attendance">
              <li className={isActive===7 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                <img style={{opacity:'0.6'}} src="/images/sidebar-attendance.png" />
              </li>
            </Link>
            <Link to="/admin/outside">
              <li className={isActive===8 ? 'sidebar-close-btn bg-blue-100' : "sidebar-close-btn"}>
                <img style={{opacity:'0.6'}} src="/images/sidebar-outside.png" />
              </li>
            </Link>
            
          </ul>
        </div>
      )}
    </>
  );
}
