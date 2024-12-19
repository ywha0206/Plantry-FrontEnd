import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "@/pages/community/Community.scss";
import CommunitySidebar from "@/components/community/CommunitySidebar";
import useUserStore from "../../store/useUserStore";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../services/axios";

function CommunityList() {
  const location = useLocation();
  const { boardId, postId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const boardName = location.state?.boardName || "게시판";
  const currentUser = useUserStore((state) => state.user);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  // 글 목록을 가져오는 함수
  const fetchPosts = async () => {
    const response = await axiosInstance.get(
      `/api/community/posts?boardId=${boardId}`
    );
    return response.data;
  };

  // useQuery에 boardId를 queryKey에 추가
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["posts", boardId], // boardId를 추가하여 게시판이 변경될 때마다 새로운 데이터를 가져오도록 함
    queryFn: fetchPosts,
    enabled: !!boardId, // boardId가 있을 때만 쿼리 실행
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생: {error.message}</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  // 검색 필터링
  const filteredData = data.filter(
    (item) =>
      item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 페이지네이션 데이터 계산
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 페이지네이션 핸들러
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleBoardChange = () => {
    setCurrentPage(1); // 게시판 변경 시 첫 페이지로 이동
    setSearchQuery(""); // 검색어 초기화
  };

  return (
    <div id="community-container">
      <CommunitySidebar 
        currentUser={currentUser} 
        boardId={boardId}
        onBoardChange={handleBoardChange} // 게시판 변경 시 상태 초기화
      />

      <div className="list-container">
        <div className="list-container2">
          <h2>{boardName}</h2>

          <div className="list-header">
            <input
              type="text"
              placeholder="검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="view-toggle">
              <span>view:</span>
              <button className="view-button">☰</button>
              <button className="view-button">▦</button>
            </div>
          </div>

          <table className="list-table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일자</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={item.postId}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                  <td>
                    <Link to={`/community/${boardId}/view/${item.postId}`}>
                      {item.title}
                    </Link>
                  </td>
                  <td>{item.writer}</td>
                  <td>{item.createdAt.split("T")[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="list-footer">
            <button
              onClick={async () => {
                if (window.confirm("게시글을 삭제하시겠습니까?")) {
                  try {
                    await axiosInstance.delete(
                      `api/community/posts/${boardId}/view/${postId}`
                    );
                    alert("게시글이 삭제되었습니다!");
                    navigate(`/community/${boardId}/list`);
                  } catch (error) {
                    console.error("게시글 삭제를 실패:", error);
                    alert("게시글 삭제를 실패했습니다.");
                  }
                }
              }}
              className="delete-button"
            >
              삭제
            </button>
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                이전
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={currentPage === index + 1 ? "active" : ""}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                다음
              </button>
            </div>
            <button
              className="create-button"
              onClick={() => navigate(`/community/${boardId}/write`)}
            >
              <img
                src="/images/component.png"
                alt="새 게시글"
                className="button-icon"
              />
              글쓰기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityList;