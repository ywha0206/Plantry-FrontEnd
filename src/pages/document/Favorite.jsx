import React, { useState } from 'react'
import '@/pages/document/Document.scss'
import {CustomSearch} from '@/components/Search'
import MyDropzone from '../../components/DropZone';
import { Modal } from '../../components/Modal';
import { Link } from 'react-router-dom';
import { CustomButton } from '../../components/Button';
export default function Favorite() {
  const [selectOption, setSelectOption] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

    const optionChanger = (e)=>{
        setSelectOption(Number(e.target.value))
        console.log(selectOption)
    }

    const userHandler = (e) => {

    }

    const uploadFile = () => {
      setIsOpen(true)
    }

    const onClose = () => {
      setIsOpen(false)
    }
  return (
    <div id='document-favorite-container'>
      <aside className='document-favorite-aside overflow-scroll flex flex-col scrollbar-none'>
        <section className='flex justify-center mb-8'><p className='text-lg'>문서 (6)</p></section>
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
        <section className='p-8 mb-10'>
          <div className='flex gap-4 items-center opacity-60 mb-6 bg-blue-200 hover:opacity-40'>
            <img className='w-6 h-6' src='/images/document-star.png'></img>
            <Link to='/document/favorite'>
              <p>즐겨찾기</p>
            </Link>
          </div>
          <div className='flex gap-4 items-center opacity-60'>
            <img src='/images/document-recent.png'></img>
            <p>최근문서</p>
          </div>
        </section>
        <section className='flex justify-between items-center p-4 mb-2'>
          <div>
            <p className='text-2xl font-bold'>Pinned <span className='text-xs font-normal opacity-60'>(3)</span></p>
          </div>
          <div>
            <img className='cursor-pointer hover:opacity-20 w-5 h-5 opacity-60' src='/images/document-minus.png'></img>
          </div>
        </section>
        <section className='flex flex-col px-8'>
          <div className='flex gap-4 items-center mb-1'> 
            <img src='/images/document-folder.png'></img>
            <p className='opacity-60 pt-1'>고정 폴더 1</p>
          </div>
          <div className='flex gap-4 items-center mb-1'> 
            <img src='/images/document-folder.png'></img>
            <p className='opacity-60 pt-1'>고정 폴더 2</p>
          </div>
          <div className='flex gap-4 items-center mb-1'> 
            <img src='/images/document-folder.png'></img>
            <p className='opacity-60 pt-1'>고정 폴더 3</p>
          </div>
        </section>
        <section className='flex justify-between items-center p-4 mb-2 mt-4'>
          <div>
            <p className='text-2xl font-bold'>Folders <span className='text-xs font-normal opacity-60'>(3)</span></p>
          </div>
          <div>
            <img className='cursor-pointer hover:opacity-20 w-5 h-5 opacity-60' src='/images/document-minus.png'></img>
          </div>
        </section>
        <section className='flex flex-col px-8'>
          <div className='flex gap-4 items-center mb-1'> 
            <img src='/images/document-folder.png'></img>
            <p className='opacity-60 pt-1'>새로운 폴더 1</p>
          </div>
          <div className='flex gap-4 items-center mb-1'> 
            <img src='/images/document-folder.png'></img>
            <p className='opacity-60 pt-1'>새로운 폴더 2</p>
          </div>
          <div className='flex gap-4 items-center mb-1'> 
            <img src='/images/document-folder.png'></img>
            <p className='opacity-60 pt-1'>새로운 폴더 3</p>
          </div>
        </section>
        <section className='mt-auto flex flex-col gap-5'>
            <button onClick={makeDrive} className='bg-purple white h-8 rounded-md'>드라이브 생성</button>
        </section>
      </aside>
      <section className='document-favorite-main'>
        <section className='flex gap-4 items-center'>
          <p className='text-2xl ml-4 mt-4'>즐겨찾기</p><img className='w-6 h-6 mt-3' src='/images/document-star.png'></img>
        </section>
        <section className='mt-3 text-xs opacity-40 w-full flex justify-end'>
          <p className='mr-4'>last edited : 1 hour ago</p>
        </section>
        <img className='w-full h-1 mt-1' src='/images/document-line.png'></img>
        <section className='flex  justify-between mt-8 mb-20'>
          <div className='flex gap-4 items-center'>
            <CustomSearch 
              width1="20"
              width2="60"
            />
            <p className='ml-4'>View :</p>
            <img src='/images/document-note.png'></img>
            <img src='/images/document-menu.png'></img>
          </div>
          <div className='flex gap-2'>
            <button onClick={uploadFile} className='bg-purple white w-20 h-8 rounded-md text-xs'>파일업로드</button>
          </div>
        </section>
        <section className='mb-8'>
          <table className='w-full'>
            <thead className='bg-gray-100 w-12 h-12 text-center text-sm'>
              <tr className=''>
                <th className='w-1/12 rounded-tl-lg'><input type='checkbox'></input></th>
                <th className='w-4/12'>제목</th>
                <th className='w-1/12'>확장자</th>
                <th className='w-1/12'>크기</th>
                <th className='w-2/12'>최근업데이트날짜</th>
                <th className='w-2/12'>작성자</th>
                <th className='w-1/12 rounded-tr-lg'>관리</th>
              </tr>
            </thead>
            <tbody>
              <tr className='w-16 h-16 text-center text-sm'>
                <th className='w-1/12 rounded-tl-lg'><input type='checkbox'></input></th>
                <th className='w-4/12 font-light'>내 아이콘 훔쳐가지마라 소송건다</th>
                <th className='w-1/12 font-light'>Folder</th>
                <th className='w-1/12 font-light'>2TB</th>
                <th className='w-2/12 font-light'>2024-11-22</th>
                <th className='w-2/12 font-light'>
                  <div className='flex justify-center items-center cursor-pointer hover:opacity-60 gap-1'>
                    <img className='w-8 h-8' src='/images/document-default-profile.png'></img>
                    <div className='text-xs flex flex-col gap-1'>
                      <p className='text-left font-bold'>이상훈</p>
                      <p className='text-left opacity-60'>디자이너</p>
                    </div>
                  </div>
                </th>
                <th className='w-1/12 rounded-tr-lg'>
                  <div className='flex justify-center items-center cursor-pointer hover:opacity-60'>
                    <img src='/images/document-horizen-dot.png'></img>
                  </div>
                </th>
              </tr>
              <tr className='w-16 h-16 text-center text-sm'>
                <th className='w-1/12 rounded-tl-lg'><input type='checkbox'></input></th>
                <th className='w-4/12 font-light'>내 아이콘 훔쳐가지마라 소송건다</th>
                <th className='w-1/12 font-light'>Folder</th>
                <th className='w-1/12 font-light'>2TB</th>
                <th className='w-2/12 font-light'>2024-11-22</th>
                <th className='w-2/12 font-light'>
                  <div className='flex justify-center items-center cursor-pointer hover:opacity-60 gap-1'>
                    <img className='w-8 h-8' src='/images/document-default-profile.png'></img>
                    <div className='text-xs flex flex-col gap-1'>
                      <p className='text-left font-bold'>이상훈</p>
                      <p className='text-left opacity-60'>디자이너</p>
                    </div>
                  </div>
                </th>
                <th className='w-1/12 rounded-tr-lg'>
                  <div className='flex justify-center items-center cursor-pointer hover:opacity-60'>
                    <img src='/images/document-horizen-dot.png'></img>
                  </div>
                </th>
              </tr>
              <tr className='w-16 h-16 text-center text-sm'>
                <th className='w-1/12 rounded-tl-lg'><input type='checkbox'></input></th>
                <th className='w-4/12 font-light'>내 아이콘 훔쳐가지마라 소송건다</th>
                <th className='w-1/12 font-light'>Folder</th>
                <th className='w-1/12 font-light'>2TB</th>
                <th className='w-2/12 font-light'>2024-11-22</th>
                <th className='w-2/12 font-light'>
                  <div className='flex justify-center items-center cursor-pointer hover:opacity-60 gap-1'>
                    <img className='w-8 h-8' src='/images/document-default-profile.png'></img>
                    <div className='text-xs flex flex-col gap-1'>
                      <p className='text-left font-bold'>이상훈</p>
                      <p className='text-left opacity-60'>디자이너</p>
                    </div>
                  </div>
                </th>
                <th className='w-1/12 rounded-tr-lg'>
                  <div className='flex justify-center items-center cursor-pointer hover:opacity-60'>
                    <img src='/images/document-horizen-dot.png'></img>
                  </div>
                </th>
              </tr>
              <tr className='w-16 h-16 text-center text-sm'>
                <th className='w-1/12 rounded-tl-lg'><input type='checkbox'></input></th>
                <th className='w-4/12 font-light'>내 아이콘 훔쳐가지마라 소송건다</th>
                <th className='w-1/12 font-light'>Folder</th>
                <th className='w-1/12 font-light'>2TB</th>
                <th className='w-2/12 font-light'>2024-11-22</th>
                <th className='w-2/12 font-light'>
                  <div className='flex justify-center items-center cursor-pointer hover:opacity-60 gap-1'>
                    <img className='w-8 h-8' src='/images/document-default-profile.png'></img>
                    <div className='text-xs flex flex-col gap-1'>
                      <p className='text-left font-bold'>이상훈</p>
                      <p className='text-left opacity-60'>디자이너</p>
                    </div>
                  </div>
                </th>
                <th className='w-1/12 rounded-tr-lg'>
                  <div className='flex justify-center items-center cursor-pointer hover:opacity-60'>
                    <img src='/images/document-horizen-dot.png'></img>
                  </div>
                </th>
              </tr>
              <tr className='w-16 h-16 text-center text-sm'>
                <th className='w-1/12 rounded-tl-lg'><input type='checkbox'></input></th>
                <th className='w-4/12 font-light'>내 아이콘 훔쳐가지마라 소송건다</th>
                <th className='w-1/12 font-light'>Folder</th>
                <th className='w-1/12 font-light'>2TB</th>
                <th className='w-2/12 font-light'>2024-11-22</th>
                <th className='w-2/12 font-light'>
                  <div className='flex justify-center items-center cursor-pointer hover:opacity-60 gap-1'>
                    <img className='w-8 h-8' src='/images/document-default-profile.png'></img>
                    <div className='text-xs flex flex-col gap-1'>
                      <p className='text-left font-bold'>이상훈</p>
                      <p className='text-left opacity-60'>디자이너</p>
                    </div>
                  </div>
                </th>
                <th className='w-1/12 rounded-tr-lg'>
                  <div className='flex justify-center items-center cursor-pointer hover:opacity-60'>
                    <img src='/images/document-horizen-dot.png'></img>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </section>
        <section className='flex justify-start gap-4 text-xs mb-6'>
          <div className='flex gap-2 ml-10'>
            <button onClick={null} className='bg-purple white w-20 h-8 rounded-md text-xs'>파일 삭제</button>
          </div>
        </section>
        <section className="flex justify-center">
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
        <div className='file-modal'>
          <Modal 
            isOpen={isOpen}
            onClose={onClose}
            text="파일 업로드"
          />
        </div>
      </section>
    </div>
  )
}
