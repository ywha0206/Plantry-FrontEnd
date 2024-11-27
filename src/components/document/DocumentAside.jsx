import { useState } from "react";
import { Link } from "react-router-dom";
import {CustomSearch} from '@/components/Search'
import { Modal } from "../Modal";

export default function DocumentAside(){
    const [drive, setDrive] = useState(false);
    const makeDrive = () => {
        setDrive(true)
    }

    return(<>
    
    <aside className='document-aside1 overflow-scroll flex flex-col scrollbar-none'>
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
                    <div className='flex gap-4 items-center opacity-60 mb-6'>
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
                <div className='drive-modal'>
                    <Modal
                       isOpen={drive}
                       onClose={() => setDrive(false)}
                       text="드라이브 만들기"
                    />
                </div>
            </aside>
    </>)
}