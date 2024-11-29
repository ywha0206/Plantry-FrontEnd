import React, { useState } from 'react';
import '@/components/document/DocumentCard1.scss';
import { Link } from 'react-router-dom';

export const DocumentCard1 = ({
    cnt,
    fileName,
    folderId,
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // 토글 상태 관리

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev); // 메뉴 열고 닫기 토글
    };

    const handleRename = () => {
        console.log('Rename folder:', folderId);
        // 이름 변경 로직
    };

    const handleDelete = () => {
        console.log('Delete folder:', folderId);
        confirm('정말 삭제하시겠습니까?');

        // 폴더 삭제 로직
    };

    const handleShare = () => {
        console.log('Share folder:', folderId);
        // 폴더 공유 로직
    };

    return (
        <div className="document-card1 relative">
            <div className="relative">
                <img
                    className="absolute top-[10px] right-[10px] cursor-pointer"
                    src="/images/button-dot.png"
                    alt="버튼"
                    onClick={toggleMenu} // 메뉴 열기
                />
            </div>
            {isMenuOpen && (
                <div className="absolute top-[40px] right-[10px] bg-white shadow-md rounded-md z-20">
                    <ul className="py-2">
                        <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={handleRename}
                        >
                            이름 변경
                        </li>
                        <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={handleDelete}
                        >
                            폴더 삭제
                        </li>
                        <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={handleShare}
                        >
                            공유하기
                        </li>
                    </ul>
                </div>
            )}
            <div className="flex items-center justify-center">
                <button>
                    <img className="mt-2 w-[80px] h-[90px]" src="/images/document-open-folder.png" />
                </button>
            </div>
            <Link to={`/document/list/${folderId}`} state={{ folderName: fileName }}>

                <div className="flex justify-center items-center">
                        <p className="opacity-40 text-xs">{cnt} files</p>
                </div>
                <div className="flex justify-center items-center mt-2">

                    <p className="w-1/2 text-center text-blue-900 text-sm">{fileName}</p>
                </div>
            </Link>

        </div>
    );
};
