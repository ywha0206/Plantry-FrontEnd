import React, { useState } from "react";
import "@/pages/community/Community.scss";
import CommunitySidebar from "@/components/community/CommunitySideBar";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function CommunityWrite() {
  const [type, setType] = useState(""); // 게시판 유형
  const [title, setTitle] = useState(""); // 제목
  const [content, setContent] = useState(""); // 내용
  const [file, setFile] = useState(null); // 첨부 파일
  const [isPinned, setIsPinned] = useState(false); // 필독 등록 여부
  const [isCommentEnabled, setIsCommentEnabled] = useState(false); // 댓글 활성화 여부
  const [commentOption, setCommentOption] = useState("모두"); // 댓글 설정 옵션
  const [showModal, setShowModal] = useState(false); // 모달 상태

  const handleModalOpen = () => setShowModal(true); // 모달 열기
  const handleModalClose = () => setShowModal(false); // 모달 닫기

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      type,
      title,
      content,
      file,
      commentOption: isCommentEnabled ? commentOption : "댓글 비활성화",
      isPinned,
    };
    console.log("작성된 데이터:", postData);
    alert("작성 완료!");
  };

  return (
    <div id="community-container">
      {/* 사이드바 */}
      <CommunitySidebar
        favorites={{}}
        toggleFavorite={() => {}}
        userRole="user"
        currentUser="user123"
        departmentBoards={[
          { key: "dept1", label: "부서 1" },
          { key: "dept2", label: "부서 2" },
        ]}
        onDeleteBoard={(key) => console.log("삭제:", key)}
        onUpdateBoard={(key) => console.log("수정:", key)}
      />

      {/* 작성 폼 */}
      <div className="community-main">
        <h2>{type ? `${type} 작성` : "게시판을 선택하세요"}</h2>
        <form onSubmit={handleSubmit}>
          {/* 게시판 유형 선택 및 필독 등록 */}
          <div className="form-group">
            <label>유형</label>
            <div className="select-pinned-wrapper">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="">게시판 선택</option>
                <option value="공지사항">공지사항</option>
                <option value="일반 게시판">일반 게시판</option>
              </select>
              <div className="pinned">
                <input
                  type="checkbox"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                />
                <label>필독 등록</label>
                <img
                  src="/images/setting.png"
                  alt="설정"
                  className="pinned-settings-icon"
                  onClick={handleModalOpen}
                />
              </div>
            </div>
          </div>

          {/* 모달 */}
          {showModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>필독 표시</h3>
                <p>
                  지정한 기간 동안 게시판 서비스 메인화면에 노출시킬 수
                  있습니다.
                </p>
                <div className="modal-form">
                  <label htmlFor="datepicker">날짜 선택</label>
                  <input
                    type="date"
                    id="datepicker"
                    className="date-input"
                    defaultValue={new Date().toISOString().split("T")[0]}
                  />
                  <span>일까지 노출 (최대 30일)</span>
                </div>
                <div className="modal-buttons">
                  <button onClick={handleModalClose} className="cancel-button">
                    취소
                  </button>
                  <button onClick={handleModalClose} className="confirm-button">
                    확인
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 제목 입력 */}
          <div className="form-group">
            <label>제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요."
              className="title-input"
              required
            />
          </div>

          {/* 파일 첨부 */}
          <div className="form-group">
            <div className="file-upload-wrapper">
              <label htmlFor="file-upload" className="file-upload-label">
                파일 선택
              </label>
              <input
                id="file-upload"
                type="file"
                className="file-upload-input"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <span className="file-selected">
                {file ? file.name : "선택된 파일 없음"}
              </span>
            </div>
          </div>

          {/* CKEditor (내용 입력) */}
          <div className="form-group">
            <label>내용</label>
            <CKEditor
              editor={ClassicEditor}
              data={content}
              onChange={(event, editor) => {
                const data = editor.getData();
                setContent(data);
              }}
            />
          </div>

          {/* 댓글 설정 */}
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={isCommentEnabled}
                onChange={(e) => setIsCommentEnabled(e.target.checked)}
              />
              댓글 설정
            </label>
            {isCommentEnabled && (
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="commentOption"
                    value="모두"
                    checked={commentOption === "모두"}
                    onChange={(e) => setCommentOption(e.target.value)}
                  />
                  모두
                </label>
                <label>
                  <input
                    type="radio"
                    name="commentOption"
                    value="작성자 및 관리자"
                    checked={commentOption === "작성자 및 관리자"}
                    onChange={(e) => setCommentOption(e.target.value)}
                  />
                  작성자 및 관리자
                </label>
              </div>
            )}
          </div>

          {/* 버튼 그룹 */}
          <div className="button-group">
            <button type="button" onClick={() => alert("취소했습니다!")}>
              취소하기
            </button>
            <button type="submit">작성하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CommunityWrite;
