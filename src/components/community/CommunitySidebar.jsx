import React from "react";
import PropTypes from "prop-types";
import "@/pages/community/Community.scss";
import { Link, useParams } from "react-router-dom";

export default function CommunitySidebar({
  favorites = {},
  toggleFavorite = () => {},
  userRole = "user", // 기본값: 일반 사용자
  currentUser = null,
  departmentBoards = [],
  userBoards = [],
  onDeleteBoard = () => {},
  onUpdateBoard = () => {},
  onNewPost = () => {},
  onNewBoard = () => {},
  onNewUserBoard = () => {},
}) {
  // 즐겨찾기 항목 필터링
  const favoriteBoards = Object.keys(favorites || {}).filter(
    (key) => favorites[key]
  );
  const { boardType } = useParams(); // URL에서 boardType 가져오기

  return (
    <aside className="community-aside overflow-scroll flex flex-col scrollbar-none p-4">
      {/* 상단 메뉴 */}
      <div className="flex justify-around items-center mb-6">
        {[
          { icon: "/images/checkbox.png", label: "최신글" },
          { icon: "/images/alert-circle.png", label: "필독" },
          { icon: "/images/account-check.png", label: "내 게시글" },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <img src={item.icon} alt={item.label} className="w-6 h-6 mb-1" />
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </div>

      {/* 즐겨찾기 섹션 */}
      <div className="mb-6">
        <div className="flex justify-between items-center px-4 py-2">
          <p className="font-semibold">즐겨찾기</p>
          <img className="w-3 h-2" src="/images/arrow-top.png" alt="toggle" />
        </div>
        {favoriteBoards.length === 0 ? (
          <div className="px-4 py-2 text-gray-500">
            게시판명 옆의{" "}
            <img
              src="/images/star_on.png"
              alt="star"
              className="inline-block w-4 h-4 mx-1"
            />{" "}
            을 선택해서 추가 해주세요.
          </div>
        ) : (
          favoriteBoards.map((label) => (
            <div
              key={label}
              className="flex items-center justify-between px-8 py-1 group"
            >
              <img
                src="/images/document_text.png"
                alt="icon"
                className="w-5 h-5 mr-2"
              />
              <p className="flex-grow">{label}</p>
              <img
                src="/images/star_on.png"
                alt="star"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                onClick={() => toggleFavorite(label)}
              />
            </div>
          ))
        )}
      </div>

      {/* 전체 게시판 */}
      <div className="mb-6">
        <div className="flex justify-between items-center px-4 py-2">
          <p className="font-semibold">전체 게시판</p>
          <img className="w-3 h-2" src="/images/arrow-top.png" alt="toggle" />
        </div>
        {[
          { key: "notice", label: "공지사항" },
          { key: "archive", label: "자료실" },
          { key: "free", label: "자유게시판" },
          { key: "secret", label: "익명 게시판" },
          { key: "menuToday", label: "오늘의 식단" },
        ].map((board) => (
          <Link
            to={`/community/${board.key}/list`}
            key={board.key}
            className="flex items-center justify-between px-8 py-1 group"
          >
            <img
              src="/images/document_text.png"
              alt="icon"
              className="w-5 h-5 mr-2"
            />
            <p className="flex-grow">{board.label}</p>
            <img
              src={
                favorites[board.key]
                  ? "/images/star_on.png"
                  : "/images/star_off.png"
              }
              alt="star"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              onClick={() => toggleFavorite(board.key)}
            />
          </Link>
        ))}
      </div>

      {/* 부서별 게시판 */}
      <div className="mb-6">
        <div className="flex justify-between items-center px-4 py-2">
          <p className="font-semibold">부서별 게시판</p>
          <img className="w-3 h-2" src="/images/arrow-top.png" alt="toggle" />
        </div>
        {departmentBoards.map((board) => (
          <div
            key={board.key}
            className="flex items-center justify-between px-8 py-1 group"
          >
            <img
              src="/images/document_text.png"
              alt="icon"
              className="w-5 h-5 mr-2"
            />
            <p className="flex-grow">{board.label}</p>
            <img
              src={
                favorites[board.key]
                  ? "/images/star_on.png"
                  : "/images/star_off.png"
              }
              alt="star"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              onClick={() => toggleFavorite(board.key)}
            />
          </div>
        ))}
      </div>

      {/* 내 게시판 */}
      <div className="mb-6">
        <div className="flex justify-between items-center px-4 py-2">
          <p className="font-semibold">내 게시판</p>
          <img className="w-3 h-2" src="/images/arrow-top.png" alt="toggle" />
        </div>
        {userBoards.map((board) => (
          <div
            key={board.key}
            className="flex items-center justify-between px-8 py-1 group"
          >
            <img
              src="/images/document_text.png"
              alt="icon"
              className="w-5 h-5 mr-2"
            />
            <p className="flex-grow">{board.label}</p>
            {board.owner === currentUser && (
              <div className="flex space-x-2">
                <button
                  onClick={() => onUpdateBoard(board.key)}
                  className="text-blue-500 hover:underline text-xs"
                >
                  수정
                </button>
                <button
                  onClick={() => onDeleteBoard(board.key)}
                  className="text-red-500 hover:underline text-xs"
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 버튼 섹션 */}
      <div className="mt-auto flex flex-col gap-4">
        <Link
          to={`/community/${boardType}/write`}
          className="new-user-board-button"
        >
          <img
            src="/images/component.png"
            alt="새 게시글"
            className="button-icon"
          />
          새 게시글 작성
        </Link>

        <button onClick={onNewUserBoard} className="new-user-board-button">
          <img
            src="/images/Vector.png"
            alt="새 개인 게시판"
            className="button-icon"
          />
          새 개인 게시판 생성
        </button>
        {userRole === "admin" && (
          <button
            onClick={onNewBoard}
            className="bg-green-500 text-white h-10 rounded-md flex items-center justify-center px-4"
          >
            <img
              src="/images/Vector.png"
              alt="새 게시판"
              className="w-5 h-5 mr-2"
            />
            새 게시판 생성
          </button>
        )}
      </div>
    </aside>
  );
}

// PropTypes 설정 (유효성 검사)
CommunitySidebar.propTypes = {
  favorites: PropTypes.object,
  toggleFavorite: PropTypes.func,
  userRole: PropTypes.string,
  currentUser: PropTypes.string,
  departmentBoards: PropTypes.array,
  userBoards: PropTypes.array,
  onDeleteBoard: PropTypes.func,
  onUpdateBoard: PropTypes.func,
  onNewPost: PropTypes.func,
  onNewBoard: PropTypes.func,
  onNewUserBoard: PropTypes.func,
};
