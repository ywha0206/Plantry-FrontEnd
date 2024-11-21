import React, { useState } from 'react'
import '@/pages/admin/Admin.scss'
import {CustomSearch} from '@/components/Search'
import { AdminCard3 } from '../../components/admin/AdminCard3'
import { CustomButton } from '../../components/Button';

export default function AdminProject() {
    const [selectOption, setSelectOption] = useState(0);

    const optionChanger = (e)=>{
        setSelectOption(Number(e.target.value))
        console.log(selectOption)
    }

    const userHandler = (e) => {

    }

  return (
    <div id='admin-project-container'>
      <aside className='admin-project-aside overflow-scroll flex flex-col scrollbar-none'>
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
      {selectOption===0 &&
        <section className='admin-project-main'>
            <section className='flex mb-32'>
                <p className='text-lg flex items-center justify-center w-80 rounded-md bg-gray-200 mx-auto'>부서 1</p>
                <div className="flex"> 
                    <img src='/images/dumy-profile.png' className="w-1/3" />
                    <img src='/images/dumy-profile.png' className="w-1/3" />
                    <img src='/images/dumy-profile.png' className="w-1/3" />
                    <img src='/images/dumy-profile.png' className="w-1/3" />
                </div>
            </section>
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
                </select>
                <div>7 / 11</div>
            </section>
            <section className='flex justify-around inline-block mb-12'>
                <AdminCard3 />
                <AdminCard3 />
                <AdminCard3 />
            </section>
            <section className='flex justify-around inline-block'>
                <AdminCard3 />
                <AdminCard3 />
            </section>
        </section>
      }
      {selectOption === 1 &&
        <section className='admin-project-main'>
            <section className='flex mb-32'>
                <p className='text-lg flex items-center justify-center w-80 rounded-md bg-gray-200 mx-auto'>부서 1</p>
                <div className="flex"> 
                    <img src='/images/dumy-profile.png' className="w-1/3" />
                    <img src='/images/dumy-profile.png' className="w-1/3" />
                    <img src='/images/dumy-profile.png' className="w-1/3" />
                    <img src='/images/dumy-profile.png' className="w-1/3" />
                </div>
            </section>
            <section className='flex items-center gap-4 mb-12'>
                <div className='ml-4 text-2xl'>
                    <select value={selectOption} onChange={optionChanger} className='outline-none border rounded-md text-xl p-2 text-center'>
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
            <table className="w-full table-auto border-collapse mb-16">
            <thead className='bg-gray-200 h-16'>
                <tr className='text-center'>
                    <th className="w-1/10 rounded-tl-lg"><input type="checkbox" /></th>
                    <th className="w-1/10">번호</th>
                    <th className="w-2/10">이름</th>
                    <th className="w-2/10">부서</th>
                    <th className="w-1/10">상태</th>
                    <th className="w-1/10">직급</th>
                    <th className="w-1/10">배정업무</th>
                    <th className="w-1/10">마감일</th>
                    <th className="w-1/10 rounded-tr-lg">진행도</th>
                </tr>
            </thead>
            <tbody className='h-16'>
                <tr className='text-center'>
                    <td className="w-1/10"><input type="checkbox" /></td>
                    <td className="w-1/10">1</td>
                    <td className="w-2/10">홍길동</td>
                    <td className="w-2/10">개발</td>
                    <td className="w-1/10">활동</td>
                    <td className="w-1/10">정상</td>
                    <td className="w-1/10">사원</td>
                    <td className="w-1/10">2024-01-01</td>
                    <td className="w-1/10">비고 없음</td>
                </tr>
            </tbody>
            <tbody className='h-16'>
                <tr className='text-center'>
                    <td className="w-1/10"><input type="checkbox" /></td>
                    <td className="w-1/10">1</td>
                    <td className="w-2/10">홍길동</td>
                    <td className="w-2/10">개발</td>
                    <td className="w-1/10">활동</td>
                    <td className="w-1/10">정상</td>
                    <td className="w-1/10">사원</td>
                    <td className="w-1/10">2024-01-01</td>
                    <td className="w-1/10">비고 없음</td>
                </tr>
            </tbody>
            <tbody className='h-16'>
                <tr className='text-center'>
                    <td className="w-1/10"><input type="checkbox" /></td>
                    <td className="w-1/10">1</td>
                    <td className="w-2/10">홍길동</td>
                    <td className="w-2/10">개발</td>
                    <td className="w-1/10">활동</td>
                    <td className="w-1/10">정상</td>
                    <td className="w-1/10">사원</td>
                    <td className="w-1/10">2024-01-01</td>
                    <td className="w-1/10">비고 없음</td>
                </tr>
            </tbody>
        </table>    
        <section className='flex justify-end gap-4 text-xs mb-10'>
            <CustomButton 
                type='button'
                handler={userHandler}
                color="white"
                bg="blue"
                size="sm"
                text="업무 등록"
                height="40px"
            />
            <CustomButton 
                type='button'
                handler={userHandler}
                color="white"
                bg="blue"
                size="sm"
                text="업무 배정"
                height="40px"
            />
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
        </section>
      }
      {selectOption === 2 &&
        <section className='admin-project-main'>
            <section className='flex mb-32'>
                <p className='text-lg flex items-center justify-center w-80 rounded-md bg-gray-200 mx-auto'>부서 1</p>
                <div className="flex"> 
                    <img src='/images/dumy-profile.png' className="w-1/3" />
                    <img src='/images/dumy-profile.png' className="w-1/3" />
                    <img src='/images/dumy-profile.png' className="w-1/3" />
                    <img src='/images/dumy-profile.png' className="w-1/3" />
                </div>
            </section>
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
            <section className='flex justify-around inline-block mb-12'>
                <AdminCard3 />
                <AdminCard3 />
                <AdminCard3 />
            </section>
            <section className='flex justify-around inline-block'>
                <AdminCard3 />
                <AdminCard3 />
            </section>     
        </section>
      }
      {selectOption === 3 &&
        <section className='admin-project-main'>
            <section className='flex mb-32'>
                <p className='text-lg flex items-center justify-center w-80 rounded-md bg-gray-200 mx-auto'>부서 1</p>
                <div className="flex"> 
                    <img src='/images/dumy-profile.png' className="w-1/3" />
                    <img src='/images/dumy-profile.png' className="w-1/3" />
                    <img src='/images/dumy-profile.png' className="w-1/3" />
                    <img src='/images/dumy-profile.png' className="w-1/3" />
                </div>
            </section>
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
        </section>
      }
    </div>
  )
}
