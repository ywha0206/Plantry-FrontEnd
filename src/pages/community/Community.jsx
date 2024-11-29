import React from "react";
import { Routes, Route } from "react-router-dom";
import List from "./List";
import View from "./View";
import Write from "./Write";
import Modify from "./Modify";
import "@/pages/community/Community.scss";
import CommunitySidebar from "../../components/community/CommunitySideBar";

function Community({
  favorites,
  toggleFavorite,
  userRole,
  currentUser,
  departmentBoards,
  userBoards,
  onDeleteBoard,
  onUpdateBoard,
  onNewPost,
  onNewBoard,
  onNewUserBoard,
}) {
  return (
    <div className="community-layout">
      {/* 공통적으로 사용될 사이드바 */}
      <CommunitySidebar
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        userRole={userRole}
        currentUser={currentUser}
        departmentBoards={departmentBoards}
        userBoards={userBoards}
        onDeleteBoard={onDeleteBoard}
        onUpdateBoard={onUpdateBoard}
        onNewPost={onNewPost}
        onNewBoard={onNewBoard}
        onNewUserBoard={onNewUserBoard}
      />

      {/* 페이지별 콘텐츠 영역 */}
      <div className="community-content">
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="view/:id" element={<View />} />
          <Route path="write" element={<Write />} />
          <Route path="modify/:id" element={<Modify />} />
        </Routes>
      </div>
    </div>
  );
}

export default Community;
