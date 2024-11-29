import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {CustomSearch} from '@/components/Search'
import { Modal } from "../Modal";
import NewDrive from "./NewDrive";
import useUserStore from "../../store/useUserStore";
import axiosInstance from '@/services/axios.jsx'


export default function DocumentAside(){
    const [drive, setDrive] = useState(false);
    const [folders, setFolders] = useState([]); // 폴더 목록 상태
    const [pinnedFolders, setPinnedFolders] = useState([]); // Pinned 폴더
    const [sharedFolders, setSharedFolders] = useState([]); // Shared 폴더

    const makeDrive = () => {
        setDrive(true)
    }


    const [isPinnedOpen, setIsPinnedOpen] = useState(true); // State to track "My Page" section visibility    
    const [isSharedOpen, setIsSharedOpen] = useState(true);
    const togglePinnedSection = () => {
      setIsPinnedOpen((prev) => !prev); // Toggle the section
    };
  
    const toggleSharedSection = () => {
        setIsSharedOpen((prev) => !prev);
    }

    const user = useUserStore((state) => state.user);

    useEffect(()=>{
        
        console.log("현재 로그인된 사용자 : ",user)
        
        const fetchFolders = async () => {
            try {
                const response = await axiosInstance.get(`/api/drive/folders?uid=${user.uid}`); // API 엔드포인트
                const allFolders = Array.isArray(response.data) ? response.data : response.data.data;
                console.log("Fetched Folders Raw Response: ", response);
                console.log("Fetched Folders Data: ", response.data);
                console.log(Array.isArray(response.data)); // true여야 함

                setSharedFolders(allFolders.filter(folder => folder.isShared === 1));
                setFolders(allFolders.filter(folder => folder.isShared === 0));

            } catch (error) {
                console.error("폴더 목록 가져오기 실패:", error);
            }
        };

        fetchFolders(); // 폴더 데이터 가져오기 실행
    }, [user]); // 빈 배열로 마운트 시 한 번만 실행


    return(<>
    
    <aside className='document-aside1 overflow-scroll flex flex-col scrollbar-none'>
                <section className='flex justify-center mb-8'><Link to="/document" className='text-lg'>문서 (6)</Link></section>
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
                <section className="py-[0px] px-[20px] mb-10">
                <div className='flex gap-4 items-center opacity-60 mb-6'>
                        <img className='w-6 h-6' src='/images/document-star.png'></img>
                        <Link   to={'/document/list/favorite'}
                                state={{ folderName: "즐겨찾기" }} // folder.name 전달 
                        >
                            <p>즐겨찾기</p>
                        </Link>
                    </div>
                    <div className='flex gap-4 items-center opacity-60'>
                        <img src='/images/document-recent.png'></img>
                        <Link  to={'/document/list/latest'}
                                state={{ folderName: "최근문서" }} // folder.name 전달 
                        >
                             <p>최근문서</p>
                        </Link>

                    </div>
                </section>


                <section className='flex justify-between items-center p-4 mb-2'>
                    <div>
                        <p className='text-2xl font-bold'>나의 드라이브 <span className='text-xs font-normal opacity-60'>({folders.length})</span></p>
                    </div>
                    <div>
                        <img
                            className={`cursor-pointer hover:opacity-20 w-[15px] h-[10px] opacity-60 transform transition-transform duration-300 ${
                                isPinnedOpen ? "rotate-0" : "-rotate-90"
                            }`}
                            src="/images/arrow-bot.png"
                            alt="Toggle"
                            onClick={togglePinnedSection}
                            />                    
                    </div>
                </section>


                <section className={`mypageArea flex flex-col px-8  overflow-scroll scrollbar-none transition-all duration-300 ${
                isPinnedOpen ? "max-h-[180px]" : "max-h-0"
                    }`}>
                    {folders.map((folder) => (
                    <div className="flex gap-4 items-center mb-1" key={folder.id}>
                        <Link    to={`/document/list/${folder.id}`}
                                state={{ folderName: folder.name }} // folder.name 전달
                                className="flex gap-4 items-center mb-1">
                            <img src="/images/document-folder.png" alt="Folder Icon" />
                            <p className="opacity-60 pt-1">{folder.name}</p>
                        </Link>
                    </div>
                    ))}  
                    {folders.length === 0 && <p className="opacity-60">Shared 폴더가 없습니다.</p>}
                </section>
                <section className='flex justify-between items-center p-4 mb-2 mt-4'>
                    <div>
                        <p className='text-2xl font-bold'>공유 드라이브 <span className='text-xs font-normal opacity-60'>({sharedFolders.length})</span></p>
                    </div>
                    <div>
                    <img
                        className={`cursor-pointer hover:opacity-20 w-[15px] h-[10px] opacity-60 transform transition-transform duration-300 ${
                            isSharedOpen ? "rotate-0" : "-rotate-90"
                        }`}
                        src="/images/arrow-bot.png"
                        alt="Toggle"
                        onClick={toggleSharedSection}
                        />
                    </div>
                </section>
                <section
                        className={`mypageArea flex flex-col px-8  overflow-scroll scrollbar-none transition-all duration-300 ${
                            isSharedOpen ? "max-h-[180px] " : "max-h-0"
                        }`}>
                     {sharedFolders.map((folder) => (
                        <div className="flex gap-4 items-center mb-1" key={folder.id}>
                            <Link   to={`/document/list/${folder.id}`}
                                    state={{ folderName: folder.name }} // folder.name 전달
                                    className="flex gap-4 items-center mb-1">
                                <img src="/images/document-folder.png" alt="Folder Icon" />
                                <p className="opacity-60 pt-1">{folder.name}</p>
                            </Link>
                        </div>
                        ))}  
                        {sharedFolders.length === 0 && <p className="opacity-60">Shared 폴더가 없습니다.</p>}
                </section>
                <section className='mt-auto flex flex-col gap-5'>
                    <button onClick={makeDrive} className='bg-purple white h-8 rounded-md'>드라이브 생성</button>
                </section>
                <div className='drive-modal'>
                    <NewDrive 
                       isOpen={drive}
                       onClose={() => setDrive(false)}
                       text="드라이브 만들기"
                    />
                </div>
            </aside>
    </>)
}