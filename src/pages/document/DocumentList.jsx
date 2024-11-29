import React, { useEffect, useState } from 'react'
import '@/pages/document/Document.scss'
import {CustomSearch} from '@/components/Search'
import {DocumentCard1} from '../../components/document/DocumentCard1';
import { DocumentCard2 } from '../../components/document/DocumentCard2';
import { Modal } from '../../components/Modal';
import { Link, useLocation } from 'react-router-dom';
import DocumentAside from '../../components/document/DocumentAside';
import DocumentLayout from '../../layout/document/DocumentLayout';
import axiosInstance from '@/services/axios.jsx'
import NewFolder from '../../components/document/NewFolder';
import useUserStore from '../../store/useUserStore';

export default function DocumentList() {
    const [subFolders, setSubFolders] = useState([]); // 하위 폴더
    const [files, setFiles] = useState([]); // 파일
    const [selectOption, setSelectOption] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [folder, setFolder] = useState(false);
    const [drive, setDrive] = useState(false);
    const [viewType, setViewType] = useState('box'); // Default to 'box'
    const user = useUserStore((state) => state.user);
    const [full,setFull] = useState([]);
    const [editing, setEditing] = useState(false); // 이름 변경 모드
    const [newFolderName, setNewFolderName] = useState(''); // 새로운 폴더 이름



    const location = useLocation(); // 현재 경로 가져오기
    const { folderName } = location.state || {}; // 전달된 state 받기

    const pathParts = location.pathname.split('/'); // '/' 기준으로 경로 분리
    let text = pathParts[pathParts.length - 1]; // 마지막 부분 추출

    text = decodeURIComponent(text);


   
    

    useEffect(() => {
        const fetchFolderContents = async () => {
            try {
                const response = await axiosInstance.get(`/api/drive/folder-contents?folderId=${text}&ownerId=${user.uid}`);
                const allFolders = Array.isArray(response.data) ? response.data : response.data.data;
                console.log("Fetched subFolders Raw Response: ", response);
                console.log("Fetched subFolders Data: ", response.data);

                const subFolders = response.data.subFolders?.map((folder) => ({
                    ...folder,
                    type: 'folder', // 폴더 타입 추가
                })) || [];
                const files = response.data.files?.map((file) => ({
                    ...file,
                    type: 'file', // 파일 타입 추가
                })) || [];
    
                setSubFolders(subFolders || []);
                setFiles(files || []);
                setFull([...subFolders, ...files]);

            } catch (error) {
                console.error("Failed to fetch folder contents:", error);
                return null;
            }
        };
        fetchFolderContents();
    }, [text]); // 폴더 ID가 변경될 때마다 실행


    const handleEditClick = () => {
        setEditing(true);
        setNewFolderName(folderName); // 기존 폴더 이름을 입력란에 미리 표시
    };

    const handleRename = async () => {
        try {
            // API 호출로 폴더 이름 변경
            await axiosInstance.put(`/api/drive/folder/${text}/rename`, {
                newName: newFolderName,
            });
            setEditing(false); // 이름 변경 완료 후 수정 모드 종료
            location.state.folderName = newFolderName; // 상태 업데이트
        } catch (error) {
            console.error("Failed to rename folder:", error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // 기본 동작 방지
            handleRename(); // Enter 키로 이름 변경 확정
        }
    };

    const optionChanger = (e)=>{
        setSelectOption(Number(e.target.value))
        console.log(selectOption)
    }

    const viewHandler = (view) => {
        setViewType(view); // Correctly set the view type
    };

    const userHandler = (e) => {

    }

    const uploadFile = () => {
        setIsOpen(true)
    }

    const onClose = () => {
        setIsOpen(false)
    }

    const folderClose = () => {
        setFolder(false)
    }

    const driveClose = () => {
        setDrive(false)
    }

    const makeFolder = () => {
        setFolder(true)
    }

    const makeDrive = () => {
        setDrive(true)
    }

    const wheelHandler = (e) =>{
        const container = e.currentTarget;
        container.scrollLeft += e.deltaY; // 세로 스크롤 값을 가로로 적용
        e.preventDefault(); // 기본 휠 동작 방지
    }

    return (
       <DocumentLayout>
                <section className='flex gap-4 items-center'>
                {editing ? (
                    <input
                        className="text-2xl ml-4 mt-4 border-b-2 border-gray-400 outline-none"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        onBlur={handleRename} // 입력란에서 포커스가 벗어나면 변경 확정
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                ) : (
                    <>
                        <p className="text-2xl ml-4 mt-4">{folderName}</p>
                        <img
                            className="w-6 h-6 mt-3 cursor-pointer"
                            src="/images/document-pen.png"
                            alt="Rename"
                            onClick={handleEditClick} // 이름 변경 모드 활성화
                        />
                    </>
                )}
                </section>
                <section className='mt-3 text-xs opacity-40 w-full flex justify-end'>
                    <p className='mr-4'>last edited : 1 hour ago</p>
                </section>
                <img className='w-full h-1 mt-1' src='/images/document-line.png'></img>
                <section className='flex  justify-between mt-8 mb-6'>
                    <div className='flex gap-4 mx-[20px] w-[98%] items-center'>
                        <CustomSearch
                            width1="20"
                            width2="60"
                        />
                        <p className='ml-4'>View :</p>
                        <button
                            className={`list ${viewType === 'list' ? 'active' : ''}`} // Add active class for styling
                            onClick={() => viewHandler('list')}> 
                            <img src='/images/document-note.png'></img>

                            </button>
                        <button
                            className={`box ${viewType === 'box' ? 'active' : ''}`} // Add active class for styling
                            onClick={() => viewHandler('box')}>                       
                            <img src='/images/document-menu.png'></img>
                            </button>
                    </div>
                    <div className='flex gap-2'>
                        <button onClick={makeFolder} className='bg-purple white w-20 h-8 rounded-md text-xs'>폴더생성</button>
                        <button onClick={uploadFile} className='bg-purple white w-20 h-8 rounded-md text-xs'>파일업로드</button>
                    </div>
                </section>
                
                {viewType === 'box' ? ( <>
                 <section className='flex gap-6 ml-16 mt-12 h-[200px] overflow-scroll scrollbar-none overflow-x-auto ' 
                    onWheel={wheelHandler}
                 >
                 {subFolders?.length > 0 ? (
                    subFolders.map((folder) => (
                        <DocumentCard1
                            key={folder.id}
                            cnt={folder.order || 0} // 폴더 순서가 null일 경우 0으로 대체
                            folderId={folder.id}
                            fileName={folder.name || "Unnamed Folder"} // 이름이 없으면 기본 텍스트로 표시
                        />
                    ))
                ) : (
                    <p className="opacity-60">No folders available.</p> // 폴더가 없을 때 메시지
                )}
                </section>
                    <section className='ml-16 mt-12 inline-block overflow-scroll scrollbar-none overflow-x-auto ' 
                    onWheel={wheelHandler}>
                    {files?.length > 0 ? (
                            files.map((file) => (
                                <DocumentCard2
                                    key={file.id}
                                    fileName={file.name || "Unnamed File"} // 이름이 없으면 기본 텍스트로 표시
                                />
                            ))
                        ) : (
                            <p className="opacity-60">No files available.</p> // 파일이 없을 때 메시지
                        )}
                    </section> </> ):( 
                        <section  className="h-[500px] overflow-scroll scrollbar-none">
                        <table className='docList mx-[20px] w-[98%] '>
                        <thead className='h-[48px] bg-[#F2F4F8] sticky top-0 z-10'>
                            <tr>
                                <th><input type="checkbox" className="checkbox text-center" /></th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Size</th>
                                <th>Last Modified</th>
                                <th>Author</th>
                            </tr>
                        </thead>
                        <tbody>
                        {full.length > 0 ? (
                            full.map((item) => (
                                <tr key={item.id}>
                                    <td><input type="checkbox" className="checkbox text-center" /></td>
                                    <td><Link to={`/document/list/${item.id}` } state={{ folderName: item.name }}>
                                        {item.name || (item.type === 'folder' ? "Unnamed Folder" : "Unnamed File")}
                                        </Link>
                                    </td>
                                    <td>{item.type === 'folder' ? 'Folder' : 'File'}</td>
                                    <td>{item.size ? `${item.size} MB` : '-'}</td>
                                    <td>{item.lastModified || "Unknown"}</td>
                                    <td>{item.ownerId || "Unknown"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center opacity-60">No folders or files available.</td>
                            </tr>
                        )}

                        </tbody>
                        </table>
                        </section>
                        )
        }
                <div className='file-modal'>
                    <Modal
                        isOpen={isOpen}
                        onClose={onClose}
                        text="파일 업로드"
                    />
                </div>
                <div className='folder-modal'>
                    <NewFolder
                        isOpen={folder}
                        onClose={folderClose}
                        parentId={text}
                        text="폴더 만들기"
                    />
                </div>
               
        </DocumentLayout>

    )
}
