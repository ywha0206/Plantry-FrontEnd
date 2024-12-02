import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axiosInstance from '@/services/axios.jsx';

const MyDropzone = ({ folderId ,maxOrder, uid }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]); // 업로드된 파일 목록
  const [isUploading, setIsUploading] = useState(false); // 업로드 중 상태
  const [isPopupVisible, setIsPopupVisible] = useState(false); // 팝업 상태

  // 파일 업로드 함수
  const uploadFiles = async (files) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });

    formData.append("maxOrder", maxOrder);
    formData.append("uid",uid);

    setIsUploading(true); // 업로드 중 상태로 설정
    try {
      const response = await axiosInstance.post(`/api/drive/upload/${folderId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("업로드 성공:", response.data);

      // 업로드 성공 시 파일 목록 업데이트
      setUploadedFiles((prevFiles) => [
        ...prevFiles,
        ...files.map((file) => ({
          name: file.name,
          size: file.size,
        })),
      ]);

      // 팝업 상태 활성화
      setIsPopupVisible(true);
    } catch (error) {
      console.error("업로드 실패:", error);
    } finally {
      setIsUploading(false); // 업로드 완료 상태로 설정
    }
  };

  // 드롭존 설정
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log("받은 파일들:", acceptedFiles);
      uploadFiles(acceptedFiles); // 파일 업로드 함수 호출
    },
  });

  // 팝업 닫기
  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div>
      {/* 드래그 앤 드롭 영역 */}
      <div
        className="flex items-center justify-center"
        {...getRootProps()}
        style={styles.dropzone}
      >
        <input {...getInputProps()} />
        <p>파일을 드래그하거나 클릭하여 업로드하세요.</p>
      </div>

      {/* 업로드 중 메시지 */}
      {isUploading && (
        <div className="mt-4 text-center text-blue-600">
          파일 업로드 중입니다. 잠시만 기다려주세요...
        </div>
      )}

      {/* 업로드된 파일 팝업 */}
      {isPopupVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          style={styles.overlay}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
            <h3 className="text-lg font-semibold mb-4">업로드된 파일</h3>
            <ul>
              {uploadedFiles.map((file, index) => (
                <li key={index} className="flex justify-between border-b py-2">
                  <span>{file.name}</span>
                  <span>{(file.size / 1024).toFixed(2)} KB</span>
                </li>
              ))}
            </ul>
            <button
              onClick={closePopup}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  dropzone: {
    border: "1px dashed black",
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    height: "170px",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

export default MyDropzone;
