import React, { useEffect, useState } from "react";
import Sidebar from "@/components/community/CommunitySidebar";
import "@/pages/community/Community.scss";
import communityCard2 from "@/components/community/communityCard2";
import useUserStore from "../../store/useUserStore";
import axiosInstance from "@/services/axios";
import { useParams } from "react-router-dom";

export default function CommunityIndex() {
  const user = useUserStore((state) => state.user);
  const [boardPosts, setBoardPosts] = useState({});
  const { boardId } = useParams();
  console.log("boardId:", boardId); // 디버깅용 로그 출력

  const cardsData = [
    {
      id: 1,
      title: "공지사항",
      content: "이번 주 공지사항입니다.",
      boardId: 1,
    },
    {
      id: 2,
      title: "자유게시판",
      content: "이번 주 자유게시판입니다.",
      boardId: 3,
    },
    {
      id: 3,
      title: "익명 게시판",
      content: "익명으로 의견을 남겨보세요.",
      boardId: 2,
    },
    {
      id: 4,
      title: "부서별 게시판",
      content: "부서별 공지사항을 확인하세요.",
      boardId: 6,
    },
    { id: 5, title: "자료실", content: "업무 자료를 공유하세요.", boardId: 4 },
    {
      id: 6,
      title: "오늘의 식단",
      content: "오늘의 메뉴를 확인하세요.",
      boardId: 5,
    },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      console.log("Requesting posts for boardId:", boardId); // boardId 값 로그 출력

      const url = `/api/community/posts?boardId=${boardId}&limit=3`;
      console.log("Requesting URL:", url);

      try {
        const response = await axiosInstance.get(url);
        return response.data;
      } catch (error) {
        console.error(
          "API 요청 실패:",
          error.response?.status,
          error.response?.data
        );
        throw error;
      }
    };

    fetchPosts();
  }, []);

  return (
    <div id="community-container" className="flex">
      {/* Sidebar */}
      <Sidebar currentUser={user} />

      {/* Main Content */}
      <div className="community-main flex-1 p-4">
        <div className="flex flex-col space-y-6">
          {/* 첫 번째 줄의 카드 */}
          <div className="flex flex-row justify-evenly w-full gap-4 mb-6">
            {cardsData.slice(0, 3).map((card) => (
              <communityCard2
                key={card.id}
                title={card.title}
                content={card.content}
                boardId={card.boardId}
                posts={boardPosts[card.boardId] || []}
              />
            ))}
          </div>
          {/* 두 번째 줄의 카드 */}
          <div className="flex flex-row justify-evenly w-full gap-4">
            {cardsData.slice(3).map((card) => (
              <communityCard2
                key={card.id}
                title={card.title}
                content={card.content}
                boardId={card.boardId}
                posts={boardPosts[card.boardId] || []}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
