import { useRef, useState } from "react";
import MyDropzone from "./DropZone";
import axiosInstance from '@/services/axios.jsx'

export const MyModal = ({ isOpen, onClose, children , text }) => {
    if (!isOpen) return null;

return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 modal-custom-fixed">
      <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full modal-custom-width">
        <div className="display-flex mb-8 py-5 px-12 bg-gray-300 rounded-t-2xl">
            <span className="text-2xl">{text}</span>
            <button 
            onClick={onClose}
            className="text-xl float-right display-block font-bold text-gray-600 hover:text-gray-900"
            >
            닫기
            </button>
        </div>
        <div className="modal-content mx-12">
          {text !== '비밀번호 수정' &&
            <>{children}</>
          }
          {text === '결제정보 등록' &&
            <>{children}</>
          }
        </div>
        
      </div>
    </div>
    );
};
