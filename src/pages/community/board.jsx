import React, { useEffect, useState } from "react";
import "@/pages/community/Community.scss";
import { CustomSearch } from "@/components/Search";
import { CustomButton } from "../../components/Button";

export default function board() {
  const [selectOption, setSelectOption] = useState(0);
  const [favorites, setFavorites] = useState({
    notice: false,
    archive: false,
    freeBoard: false,
    anonymousBoard: false,
    menuToday: false,
    production: false,
    management: false,
    sales: false,
  });
  const optionChanger = (e) => {
    setSelectOption(Number(e.target.value));
    console.log(selectOption);
  };

  // 즐겨찾기 상태 변경 핸들러
  const toggleFavorite = (key) => {
    setFavorites((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div id="community-container">
      <aside className="community-aside overflow-scroll flex flex-col scrollbar-none">
        <section className="flex justify-center">
          <p className="text-lg"></p>
        </section>
        <section className="flex justify-center w-26">
          <CustomSearch width1="100" width2="30" />
        </section>
        <section className="mb-6">
          <div id="community-container">
            <aside className="community-aside overflow-scroll flex flex-col scrollbar-none">
              {/* 상단 아이콘 섹션 */}
              <div className="flex justify-around items-center  px-6">
                <div className="flex flex-col items-center">
                  <img
                    src="/images/checkbox.png"
                    alt="최신글"
                    className="w-6 h-6 mb-1"
                  />
                  <span className="text-sm">최신글</span>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src="/images/alert-circle.png"
                    alt="필독"
                    className="w-6 h-6 mb-1"
                  />
                  <span className="text-sm">필독</span>
                </div>

                <div className="flex flex-col items-center">
                  <img
                    src="/images/account-check.png"
                    alt="내 게시글"
                    className="w-6 h-6 mb-1"
                  />
                  <span className="text-sm">내 게시글</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-[15px] px-6">
                <p className="font-semibold">즐겨찾기</p>
                <img
                  className="w-3 h-2"
                  src="/images/arrow-top.png"
                  alt="toggle"
                />
              </div>
              <div className="flex justify-between items-center px-8 mt-2">
                <p>
                  게시판명 옆의{" "}
                  <img
                    src="/images/star_on.png"
                    alt="star"
                    className="inline-block w-4 h-4 mx-1"
                  />{" "}
                  을 <br />
                  선택해서 추가 해주세요.
                </p>{" "}
              </div>
            </aside>
          </div>
        </section>
        <section className="mb-6">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center">
              <img
                src="/images/document_text.png"
                alt="icon"
                className="w-5 h-5 mr-3"
              />
              <p>전체 게시판</p>
            </div>
            <img className="w-3 h-2" src="/images/arrow-top.png" alt="toggle" />
          </div>

          {/* 게시판 항목들 */}
          {[
            {
              key: "notice",
              label: "공지사항",
              icon: "/images/document_text.png",
            },
            { key: "archive", label: "자료실" },
            { key: "freeBoard", label: "자유게시판" },
            { key: "anonymousBoard", label: "익명 게시판" },
            { key: "menuToday", label: "오늘의 식단" },
          ].map((board) => (
            <div
              key={board.key}
              className="flex items-center justify-between px-8 py-1 group"
            >
              <img
                src="/images/document_text.png"
                alt="common icon"
                className="w-5 h-5 mr-[5px]"
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
        </section>

        <section className="mb-6">
          <div className="flex justify-between items-center">
            <p>부서별 게시판</p>
            <img className="w-3 h-2" src="/images/arrow-top.png" />
          </div>
          {[
            { key: "production", label: "생산팀" },
            { key: "management", label: "관리팀" },
            { key: "sales", label: "영업팀" },
          ].map((board) => (
            <div
              key={board.key}
              className="flex justify-between items-center px-8 mt-[10px] group"
            >
              <img
                src="/images/document_text.png"
                alt="common icon"
                className="w-5 h-5 mr-[5px]"
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
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex justify-start items-center px-8 mt-[10px] gap-2">
            <img src="/images/trash.png" alt="trash icon" className="w-6 h-6" />
            <p className="text-lg font-semibold">휴지통</p>
          </div>
        </section>

        <section className="mt-auto flex flex-col gap-5">
          <button className="bg-blue text-white h-10 rounded-md flex items-center justify-center px-4 space-x-2">
            <img src="/images/component.png" alt="icon" className="w-6 h-6" />
            <span>새 게시글 작성</span>
          </button>
        </section>

        <section className="mt-[10px] flex flex-col gap-5">
          <button className="bg-blue text-white h-10 rounded-md flex items-center justify-center px-4 space-x-5">
            <img src="/images/Vector.png" alt="icon" className="w-6 h-6" />
            <span>게시판 생성</span>
          </button>
        </section>
      </aside>

      {selectOption === 0 && (
        <section className="community-main">
          <section className="flex mb-32">
            <p className="text-lg flex items-center justify-center w-80 rounded-md bg-gray-200 mx-auto">
              공지사항
            </p>
            <div className="flex">
              <img src="/images/dumy-profile.png" className="w-1/3" />
              <img src="/images/dumy-profile.png" className="w-1/3" />
              <img src="/images/dumy-profile.png" className="w-1/3" />
              <img src="/images/dumy-profile.png" className="w-1/3" />
            </div>
          </section>
          <section className="flex items-center gap-4 mb-12">
            <div className="ml-4 text-2xl"></div>
            <div className="ml-auto flex">
              <CustomSearch width1="40" width2="72" />
            </div>

            <div>7 / 11</div>
          </section>
          <table className="w-full table-auto border-collapse mb-16">
            <thead className="bg-gray-200 h-16">
              <tr className="text-center">
                <th className="w-1/10 rounded-tl-lg">
                  <input type="checkbox" />
                </th>
                <th className="w-1/10">번호</th>
                <th className="w-1/10">제목</th>
                <th className="w-1/10">작성자</th>
                <th className="w-2/10">작성일</th>
              </tr>
            </thead>
            <tbody className="h-16">
              <tr className="text-center">
                <td className="w-1/10">
                  <input type="checkbox" />
                </td>
                <td className="w-1/10">1</td>
                <td className="w-1/10">공지사항</td>
                <td className="w-2/10">홍길동</td>
                <td className="w-2/10">2024-01-01</td>
              </tr>
            </tbody>
          </table>
          <section className="flex justify-between">
            <button className="bg-blue white h-10 p-4 flex items-center rounded-md">
              선택삭제
            </button>
          </section>
          <section className="flex justify-center mt-20">
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200">
                <span className="hidden sm:inline">이전</span>
                <svg
                  className="w-4 h-4 sm:hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg text-sm font-semibold hover:from-blue-400 hover:to-indigo-400">
                1
              </button>
              <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-400">
                2
              </button>
              <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-400">
                3
              </button>
              <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200">
                <span className="hidden sm:inline">다음</span>
                <svg
                  className="w-4 h-4 sm:hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </section>
        </section>
      )}
    </div>
  );
}
