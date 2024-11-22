import React, { useState } from 'react'
import '@/pages/admin/Admin.scss'
import {CustomSearch} from '@/components/Search'
import { AdminCard3 } from '../../components/admin/AdminCard3'
import { CustomButton } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { useDispatch } from 'react-redux';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';

export default function AdminProject() {

    //          useState          //
    const [selectOption, setSelectOption] = useState(0);
    const [leader, setLeader] = useState(false);
    const [task, setTask] = useState(false);
    const [progress, setProgress] = useState(false);
    const [outsourcing, setOutsourcing] = useState(false);
    const [vacation,setVacation] = useState(false);
    const [assignor,setAssignor] = useState(false);
    const [smprogress,setSmProgress] = useState(false);
    const [taskreq,setTaskreq] = useState(false);
    const [smtask,setSmTask] = useState(false);
    const [makeTask,setMakeTask] = useState(false);
    //          useState          //
    
    //          Handler          //
    const optionChanger = (e)=>{
        setSelectOption(Number(e.target.value))
        console.log(selectOption)
    }
    const userHandler = (e) => {}
    const openLeader = () => {setLeader(true)}
    const closeLeader = () => {setLeader(false)}
    const openTask = () => {setTask(true)}
    const closeTask = () => {setTask(false)}
    const openProgress = () => {setProgress(true)}
    const closeProgress = () => {setProgress(false)}
    const openOutsourcing = () => {setOutsourcing(true)}
    const closeOutsourcing = () => {setOutsourcing(false)}
    const openVacation = () => {setVacation(true)}
    const closeVacation = () => {setVacation(false)}
    const openAssignor = () => {setAssignor(true)}
    const closeAssignor = () => {setAssignor(false)}
    const openSmProgress = () => {setSmProgress(true)}
    const closeSmProgress = () => {setSmProgress(false)}
    const openTaskreq = () => {setTaskreq(true)}
    const closeTaskreq = () => {setTaskreq(false)}
    const openSmTask = () => {setSmTask(true)}
    const closeSmTask = () => {setSmTask(false)}
    const openMakeTask = () => {setMakeTask(true)}
    const closeMakeTask = () => {setMakeTask(false)}
    //          Handler          //
    const leaderDummy = {
        name : "박연화",
        messanger : "일단 더미데이터"
    }

  return (
    <div id='admin-project-container'>
      <AdminSidebar />
      <section className='admin-project-main'>
      <AdminHeader />
      <section className='department-modal'>
            <Modal 
                isOpen={makeTask}
                onClose={closeMakeTask}
                text="업무 등록"
            />
            <Modal
                isOpen={leader}
                onClose={closeLeader}
                text="부서장"
            />
            <Modal
                isOpen={assignor}
                onClose={closeAssignor}
                text="담당자"
            />
            <Modal
                isOpen={smprogress}
                onClose={closeSmProgress}
                text="단위진행도"
            />
            <Modal
                isOpen={smtask}
                onClose={closeSmTask}
                text="진행중인업무"
            />
            <Modal
                isOpen={taskreq}
                onClose={closeTaskreq}
                text="업무요청사항"
            />
            <Modal
                isOpen={task}
                onClose={closeTask}
                text="업무"
            />
            <Modal
                isOpen={progress}
                onClose={closeProgress}
                text="진행도"
            />
            <Modal
                isOpen={outsourcing}
                onClose={closeOutsourcing}
                text="외주업체"
            />
            <Modal
                isOpen={vacation}
                onClose={closeVacation}
                text="휴가"
            />
        </section>
      {selectOption===0 &&
        <>
            <section className='flex items-center gap-4 mb-12'>
                <div className='ml-4 text-2xl'>
                    <select value={selectOption} onChange={optionChanger} className='outline-none border rounded-md text-xl p-2'>
                        <option value={0}>부서 / 팀 정보</option>
                        <option value={1}>업무현황</option>
                        <option value={2}>배정업무</option>
                        <option value={3}>요청사항</option>
                    </select>
                </div>
            </section>
            <section className='flex justify-around inline-block mb-12'>
                <AdminCard3 
                clickHandler={openLeader}
                title="부서장"
                content={leaderDummy.name}
                messanger={leaderDummy.messanger}
                />
                <AdminCard3 
                clickHandler={openTask}
                title="업무"
                content="화면설계 및 구현"
                messanger={leaderDummy.messanger}
                />
                <AdminCard3 
                clickHandler={openProgress}
                title="진행도"
                content={10/12}
                messanger={leaderDummy.messanger}
                />
            </section>
            <section className='flex justify-around inline-block'>
                <AdminCard3 
                clickHandler={openOutsourcing}
                title="외주업체"
                content="그린디자인"
                messanger={leaderDummy.messanger}
                />
                <AdminCard3 
                clickHandler={openVacation}
                title="휴가"
                content="없음"
                messanger={leaderDummy.messanger}
                />
        </section>
        </>
      }
      {selectOption === 1 &&
            <>
            <section className='flex items-center gap-4 mb-12'>
                <div className='ml-4 text-2xl'>
                    <select value={selectOption} onChange={optionChanger} className='outline-none border rounded-md text-xl p-2 text-center'>
                        <option value={0}>부서 / 팀 정보</option>
                        <option value={1}>업무현황</option>
                        <option value={2}>배정업무</option>
                        <option value={3}>요청사항</option>
                    </select>
                </div>
                <div className='ml-auto flex'>
                    <CustomSearch 
                        width1='40'
                        width2='72'
                    />
                </div>
                <select className='text-center opacity-80 w-24 h-10 outline-none border'>
                    <option>직급</option>
                    <option>상태</option>
                    <option>업무</option>
                </select>
                <div>7 / 11</div>
            </section>
            <table className="w-full table-auto border-collapse mb-16">
            <thead className='bg-gray-200 h-16'>
                <tr className='text-center'>
                    <th className="w-1/12 rounded-tl-lg"><input type="checkbox" /></th>
                    <th className="w-1/12">번호</th>
                    <th className="w-2/12">이름</th>
                    <th className="w-2/12">배정</th>
                    <th className="w-1/12">상태</th>
                    <th className="w-2/12">마감일</th>
                    <th className="w-3/12 rounded-tr-lg">진행도</th>
                </tr>
            </thead>
            <tbody>
                <tr className='text-center h-12 border-b text-sm text-gray-500'>
                    <th className="w-1/12 rounded-tl-lg"><input type="checkbox" /></th>
                    <th className="w-1/12">1</th>
                    <th className="w-2/12">게시판 화면구현</th>
                    <th className="w-2/12">없음</th>
                    <th className="w-1/12">미배정</th>
                    <th className="w-2/12">2024-11-22</th>
                    <th className="w-3/12 rounded-tr-lg">
                        <div className='flex justify-around'>
                            <input className='w-8/12' type='range' max={100} value={85}></input>
                            <p>85%</p>
                        </div>
                    </th>
                </tr>
                <tr className='text-center h-12 border-b text-sm text-gray-500'>
                    <th className="w-1/12 rounded-tl-lg"><input type="checkbox" /></th>
                    <th className="w-1/12">1</th>
                    <th className="w-2/12">게시판 화면구현</th>
                    <th className="w-2/12">없음</th>
                    <th className="w-1/12">미배정</th>
                    <th className="w-2/12">2024-11-22</th>
                    <th className="w-3/12 rounded-tr-lg">
                        <div className='flex justify-around'>
                            <input className='w-8/12' type='range' max={100} value={85}></input>
                            <p>85%</p>
                        </div>
                    </th>
                </tr>
                <tr className='text-center h-12 border-b text-sm text-gray-500'>
                    <th className="w-1/12 rounded-tl-lg"><input type="checkbox" /></th>
                    <th className="w-1/12">1</th>
                    <th className="w-2/12">게시판 화면구현</th>
                    <th className="w-2/12">없음</th>
                    <th className="w-1/12">미배정</th>
                    <th className="w-2/12">2024-11-22</th>
                    <th className="w-3/12 rounded-tr-lg">
                        <div className='flex justify-around'>
                            <input className='w-8/12' type='range' max={100} value={85}></input>
                            <p>85%</p>
                        </div>
                    </th>
                </tr>
                <tr className='text-center h-12 border-b text-sm text-gray-500'>
                    <th className="w-1/12 rounded-tl-lg"><input type="checkbox" /></th>
                    <th className="w-1/12">1</th>
                    <th className="w-2/12">게시판 화면구현</th>
                    <th className="w-2/12">없음</th>
                    <th className="w-1/12">미배정</th>
                    <th className="w-2/12">2024-11-22</th>
                    <th className="w-3/12 rounded-tr-lg">
                        <div className='flex justify-around'>
                            <input className='w-8/12' type='range' max={100} value={85}></input>
                            <p>85%</p>
                        </div>
                    </th>
                </tr>
                <tr className='text-center h-12 border-b text-sm text-gray-500'>
                    <th className="w-1/12 rounded-tl-lg"><input type="checkbox" /></th>
                    <th className="w-1/12">1</th>
                    <th className="w-2/12">게시판 화면구현</th>
                    <th className="w-2/12">없음</th>
                    <th className="w-1/12">미배정</th>
                    <th className="w-2/12">2024-11-22</th>
                    <th className="w-3/12 rounded-tr-lg">
                        <div className='flex justify-around'>
                            <input className='w-8/12' type='range' max={100} value={85}></input>
                            <p>85%</p>
                        </div>
                    </th>
                </tr>
            </tbody>
        </table>    
        <section className='flex justify-between gap-4 text-xs mb-10'>
            <button className='bg-blue white h-10 rounded-md w-24 hover:opacity-60'>선택 삭제</button>
            <button onClick={openMakeTask} className='bg-blue white h-10 rounded-md w-24 hover:opacity-60'>업무 등록</button>
        </section>
        <section className="flex justify-center mt-20">
            <div className="flex items-center space-x-2">
                <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200">
                    <span className="hidden sm:inline">이전</span>
                    <svg className="w-4 h-4 sm:hidden" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg text-sm font-semibold hover:from-blue-400 hover:to-indigo-400">
                1
                </button>
                <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-400">
                2
                </button>
                <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-400">
                3
                </button>
                <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200">
                    <span className="hidden sm:inline">다음</span>
                    <svg className="w-4 h-4 sm:hidden" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </section>     
            </>           
      }
      {selectOption === 2 &&
            <>
            <section className='flex items-center gap-4 mb-12'>
                <div className='ml-4 text-2xl'>
                    <select value={selectOption} onChange={optionChanger} className='outline-none border rounded-md text-xl p-2'>
                        <option value={0}>부서 / 팀 정보</option>
                        <option value={1}>업무현황</option>
                        <option value={2}>배정업무</option>
                        <option value={3}>요청사항</option>
                    </select>
                </div>
                <select className='text-center opacity-80 w-24 h-10 outline-none border rounded-md'>
                    <option>업무1</option>
                    <option>업무2</option>
                    <option>업무3</option>
                </select>
                <div>7 / 11</div>
            </section>       
            <section className='flex justify-around inline-block mb-12'>
                <AdminCard3 
                clickHandler={openAssignor}
                title="담당자"
                content="이상훈, 전규찬"
                messanger={leaderDummy.messanger}
                />
                <AdminCard3 
                clickHandler={openSmProgress}
                title="진행도"
                content={4/8}
                messanger={leaderDummy.messanger}
                />
                <AdminCard3 
                clickHandler={openSmTask}
                title="진행중인 업무"
                content="관리자 모달 디자인"
                messanger={leaderDummy.messanger}
                />
            </section>
            <section className='flex justify-around inline-block'>
                <AdminCard3 
                clickHandler={openTaskreq}
                title="요청사항"
                content="버튼 스타일 통일 필요"
                messanger={leaderDummy.messanger}
                />
                <AdminCard3 
                clickHandler={openLeader}
                title="요청사항"
                content="버튼 스타일 통일 필요"
                messanger={leaderDummy.messanger}
                />
            </section>  
            </>   
      }
      {selectOption === 3 &&
            <>
            <section className='flex items-center gap-4 mb-12'>
                <div className='ml-4 text-2xl'>
                    <select value={selectOption} onChange={optionChanger} className='outline-none border rounded-md text-xl p-2'>
                        <option value={0}>부서 / 팀 정보</option>
                        <option value={1}>소속인원</option>
                        <option value={2}>배정업무</option>
                        <option value={3}>요청사항</option>
                    </select>
                </div>
                <div className='ml-auto flex'>
                    <CustomSearch 
                        width1='40'
                        width2='72'
                    />
                </div>
                <select className='text-center opacity-80 w-24 h-10 outline-none border'>
                    <option>직급</option>
                    <option>상태</option>
                    <option>업무</option>
                </select>
                <div>7 / 11</div>
            </section>    
            </>   
      }
      </section>
    </div>
  )
}
