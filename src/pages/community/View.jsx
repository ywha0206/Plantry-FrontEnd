import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiscussionEmbed } from "disqus-react";

import CommunitySidebar from "../../components/community/CommunitySideBar";

function CommunityView() {
  const navigate = useNavigate();
  const { boardType, postId } = useParams();

  // 더미 데이터 (API 연동 시 교체 가능)
  const dummyData = {
    id: postId,
    title: "[안내] 공지사항입니다.",
    date: "2022.11.30",
    department: "첨부부서명",
    content: `안녕하세요, 공지사항 내용입니다.
G사와 해외의 구매처를 사칭하는 피싱 문자 거래건과 관련하여
해외발 주문 및 이와 관련된 주요 공지 사항을 알려드립니다.`,
    attachments: [
      { name: "파일명1.pdf", url: "/downloads/file1.pdf" },
      { name: "파일명2.docx", url: "/downloads/file2.docx" },
    ],
  };

  // 파일 다운로드 핸들러
  const handleDownload = (url) => {
    window.open(url, "_blank");
  };

  // Disqus 설정
  const disqusShortname = "Plantry"; // Disqus에서 설정한 Shortname
  const disqusConfig = {
    url: `http://localhost:8010/community/${boardType}/view/${postId}`, // 현재 게시물 URL (배포 시 수정 필요)
    identifier: postId, // 고유 게시물 ID
    title: dummyData.title, // 게시물 제목
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
            { key: "dept1", label: "생산팀" },
            { key: "dept2", label: "영업팀" },
          ]}
          onDeleteBoard={(key) => console.log("삭제:", key)}
          onUpdateBoard={(key) => console.log("수정:", key)}
        />
     
      {/* 본문 */}
      <div className="community-view">
        <h2>{dummyData.title}</h2>
        <div className="view-header">
          <span className="view-date">{dummyData.date}</span>
        </div>
        <div className="view-content">
          <p>
            <strong>부서명: {dummyData.department}</strong>
          </p>
          <p>{dummyData.content}</p>
        </div>
        {dummyData.attachments && dummyData.attachments.length > 0 && (
          <div className="view-attachments">
            <h4>첨부파일</h4>
            <ul>
              {dummyData.attachments.map((attachment, index) => (
                <li key={index}>
                  <button onClick={() => handleDownload(attachment.url)}>
                    {attachment.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="view-footer">
          <button
            onClick={() => navigate(`/community/${boardType}/list`)}
            className="list-button"
          >
            목록
          </button>
          <button
            onClick={() => navigate(`/community/${boardType}/modify/${postId}`)}
            className="modify-button"
          >
            수정
          </button>
          <button
            onClick={() => alert("삭제 기능은 구현되지 않았습니다.")}
            className="delete-button"
          >
            삭제
          </button>
        </div>

        {/* Disqus 댓글 섹션 */}
        <div className="comment-section">
          <h3>댓글</h3>
          <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        </div>
      </div>
    </div>
  );
}

export default CommunityView;
