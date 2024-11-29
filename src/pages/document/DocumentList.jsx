import React, { useState, useCallback, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useLocation } from 'react-router-dom';
import '@/pages/document/Document.scss';
import { CustomSearch } from '@/components/Search';
import { DocumentCard1 } from '../../components/document/DocumentCard1';
import { DocumentCard2 } from '../../components/document/DocumentCard2';
import DocumentLayout from '../../layout/document/DocumentLayout';
import axiosInstance from '@/services/axios.jsx';
import NewFolder from '../../components/document/NewFolder';
import useUserStore from '../../store/useUserStore';
import { Modal } from '../../components/Modal';

export default function DocumentList() {
    const [viewType, setViewType] = useState('box'); // Default to 'box'
    const [isOpen, setIsOpen] = useState(false);
    const [folder, setFolder] = useState(false);
    const [editing, setEditing] = useState(false); // 이름 변경 모드
    const [newFolderName, setNewFolderName] = useState(''); // 새로운 폴더 이름

    const location = useLocation();
    const user = useUserStore((state) => state.user);
    const folderId = decodeURIComponent(location.pathname.split('/').pop());
    const queryClient = useQueryClient();
    const [draggedFolder, setDraggedFolder] = useState(null); // 드래그된 폴더
    


    // 폴더 및 파일 데이터 가져오기
    const { data, isLoading, isError } = useQuery({
        queryKey: ['folderContents', folderId, user.uid],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `/api/drive/folder-contents?folderId=${folderId}&ownerId=${user.uid}`
            );
            return response.data;
        },
        staleTime: 300000, // 데이터가 5분 동안 신선하다고 간주
    });

    // 폴더 이름 변경 Mutation
    const renameFolderMutation = useMutation({
        mutationFn: async (newName) => {
            if (!newName) throw new Error('Folder name cannot be empty');
            await axiosInstance.put(`/api/drive/folder/${folderId}/rename`, { newName });
        },
        onError: (error) => {
            console.error('Failed to rename folder:', error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['folderContents', folderId, user.uid]);
            setEditing(false);
        },
    });
    // 파일 업로드 Mutation
    const uploadFileMutation = useMutation({
        mutationFn: async (files) => {
            const formData = new FormData();
            files.forEach((file) => formData.append('files', file));
            await axiosInstance.post(`/api/drive/upload?folderId=${folderId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['folderContents', folderId, user.uid] });
        },
    });

    // 이름 변경 핸들러
    const handleRename = () => {
        if (newFolderName.trim() && newFolderName !== location.state?.folderName) {
            renameFolderMutation.mutate(newFolderName);
        }
    };
    // 드래그 시작 핸들러
    const handleDragStart = (folder) => {
        setDraggedFolder(folder); // 드래그된 폴더 저장
    }
     
     // 드래그 오버 핸들러 (드롭 가능 영역 활성화)
     const handleDragOver = (e) => {
        e.preventDefault(); // 기본 동작 방지
    };

    // 폴더 이동 Mutation
    const moveFolderMutation = useMutation({
        mutationFn: async ({ folderId, targetFolderId }) => {
            await axiosInstance.put(`/api/drive/folder/${folderId}/move`, { targetFolderId });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['folderContents']);
        },
    });

    const handleDrop = (targetFolder) => {
        if (draggedFolder && draggedFolder.id !== targetFolder.id) {
            // 폴더 이동 처리
            console.log(`Moving folder ${draggedFolder.name} to ${targetFolder.name}`);
    
            // 서버로 폴더 이동 요청
            moveFolderMutation.mutate({
                folderId: draggedFolder.id,
                targetFolderId: targetFolder.id,
            });
        }
        setDraggedFolder(null); // 드래그 상태 초기화
        setTimeout(() => {
            alert('폴더 이동 완료!'); // 상태 변경 알림
        }, 500); // 상태 업데이트 후 약간의 딜레이를 줘서 변경 확인
    };

    // 드래그 앤 드롭 업로드 핸들러
    const handleFileDrop = useCallback(
        (event) => {
            event.preventDefault();
            const files = Array.from(event.dataTransfer.files);
            if (files.length === 0) {
                console.error('No files dropped');
                return;
            }
            uploadFileMutation.mutate(files);
        },
        [uploadFileMutation]
    );

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleRename();
        }
    };

    const wheelHandler = (e) =>{
        const container = e.currentTarget;
        container.scrollLeft += e.deltaY; // 세로 스크롤 값을 가로로 적용
        e.preventDefault(); // 기본 휠 동작 방지
    }

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading folder contents.</div>;

    const subFolders = (data?.subFolders || []).map((folder) => ({
        ...folder,
        type: 'folder', // 폴더 타입 추가
    }));
    
    const files = (data?.files || []).map((file) => ({
        ...file,
        type: 'file', // 파일 타입 추가
    }));
    return (
        <DocumentLayout>
            <section className="flex gap-4 items-center">
                {editing ? (
                    <input
                        className="text-2xl ml-4 mt-4 border-b-2 border-gray-400 outline-none"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        onBlur={handleRename}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                ) : (
                    <>
                        <span className="text-[25px] ml-[25px]">{location.state?.folderName}</span>
                        <img
                            className="w-6  h-6 cursor-pointer"
                            src="/images/document-pen.png"
                            alt="Rename"
                            onClick={() => setEditing(true)}
                        />
                    </>
                )}
            </section>
            <section className="flex justify-between mt-[22px] mb-6">
                <div className="flex gap-4 mx-[15px] w-[98%] items-center">
                    <CustomSearch width1="20" width2="80" />
                    <p className="ml-4">View :</p>
                    <button
                        className={`list ${viewType === 'list' ? 'active' : ''}`}
                        onClick={() => setViewType('list')}
                    >
                        <img src="/images/document-note.png" alt="List View" />
                    </button>
                    <button
                        className={`box ${viewType === 'box' ? 'active' : ''}`}
                        onClick={() => setViewType('box')}
                    >
                        <img src="/images/document-menu.png" alt="Box View" />
                    </button>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setFolder(true)}
                        className="bg-purple white w-20 h-8 rounded-md text-xs"
                    >
                        폴더생성
                    </button>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-purple white w-20 h-8 rounded-md text-xs"
                    >
                        파일업로드
                    </button>
                </div>
            </section>

            {viewType === 'box' ? (
                <div>
                    <section   onWheel={() =>wheelHandler()} className="flex gap-6 ml-16 mt-12 h-[200px] inline-block overflow-scroll scrollbar-none overflow-x-auto">
                        {subFolders.map((folder) => (
                            <DocumentCard1
                                key={folder.id}
                                folderId={folder.id}
                                fileName={folder.name}
                                folder={folder}
                                onDragStart={handleDragStart}
                                onDrop={handleDrop}
                                onDragOver={(e) => e.preventDefault()}
                            />
                        ))}
                    </section>
                    <section className="ml-16 mt-12 inline-block overflow-scroll scrollbar-none overflow-x-auto">
                        {files.map((file) => (
                            <DocumentCard2 key={file.id} fileName={file.name} />
                        ))}
                    </section>
                </div>
            ) : (<>
                <div  className="h-[570px] overflow-scroll scrollbar-none">
                    <table className="docList mx-[20px] w-[98%]">
                    <thead className="h-[48px] bg-[#F2F4F8] sticky top-0 z-10">
                        <tr>
                            <th><input type="checkbox"  /></th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Size</th>
                            <th>Last Modified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...subFolders, ...files].map((item) => (
                            <tr key={item.id}>
                                <td><input type="checkbox"  /></td>
                                <td>
                                    <Link to={`/document/list/${item.id}`} state={{ folderName: item.name }}>
                                        {item.name}
                                    </Link>
                                </td>
                                <td>{item.type}</td>
                                <td>{item.size || '-'}</td>
                                <td>{item.lastModified || 'Unknown'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                </div>
                <button>선택삭제</button>
                </>

            )}

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} text="파일 업로드" />
            <NewFolder isOpen={folder} onClose={() => setFolder(false)} parentId={folderId} />
        </DocumentLayout>
    );
}
