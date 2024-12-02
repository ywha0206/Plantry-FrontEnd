import ProjectAsideSection from "./ProjectAsideSection";
import { CustomSearch } from "../Search";
import { useState } from "react";
import { AddProjectModal } from "./_Modal";

const projectData = {
  waiting: {
    title: "대기중인 프로젝트",
    items: [
      { id:0, title: "프로젝트 목록" }
    ]
  },
  inProgress: {
    title: "진행중인 프로젝트",
    items: [
      { id:1, title: "프로젝트 목록" },
      { id:2, title: "활성화된 프로젝트" }
    ]
  },
  completed: {
    title: "완료된 프로젝트",
    items: [
      { id:3, title: "비활성화된 프로젝트" }
    ]
  }
};

const count = 
projectData.waiting.items.length +
projectData.inProgress.items.length +
projectData.completed.items.length;

function ProjectAside() {

   // 열림 상태를 중앙에서 관리
   const [openSections, setOpenSections] = useState({
    waiting: true,
    inProgress: true,
    completed: false,
  });
  const [activeItemId, setActiveItemId] = useState(null); // 활성화된 항목의 ID를 상태로 관리

  const handleItemClick = (id) => {
    setActiveItemId(id); // 클릭된 항목의 ID를 활성화
  };
  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 관리
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col max-w-full min-h-[100%] w-[270px] grow justify-between items-center p-2.5 bg-white rounded-3xl">
        {/* Header Section */}
        <section className="flex flex-col w-full min-h-[479px]">
          <h1 className="text-center text-black p-3">
            <span className="text-lg">내 프로젝트 ({count})</span>
          </h1>
          <CustomSearch width1="200" />

          {/* Dynamic Sections */}
          {Object.entries(projectData).map(([key, section]) => (
            <ProjectAsideSection
              key={key}
              data={section}
              isCompleted={key === "completed"}
              isOpen={openSections[key]} 
              toggleSection={() => toggleSection(key)}
              activeItemId={activeItemId} // 상태 변경 핸들러 전달
              onItemClick={handleItemClick}
            />
          ))}
        </section>

        {/* Footer Section */}
        <section className="flex flex-col w-full">
          <div className="flex flex-col justify-center items-center self-center mt-2.5 w-full text-base text-center text-black">
            <hr className="w-full border border-solid border-neutral-500" />
            <button className="pt-3 pb-2" onClick={handleOpenModal}>새 프로젝트 생성</button>
          </div>
        </section>
        <AddProjectModal isOpen={isModalOpen} onClose={handleCloseModal} text="새 프로젝트"/>
      </div>
  );
}

export default ProjectAside;