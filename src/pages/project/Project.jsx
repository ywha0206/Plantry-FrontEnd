import { CustomSVG } from "../../components/project/CustomSVG";
import ProjectAside from "../../components/project/ProjectAside";
import { ProjectColumn } from "../../components/project/ProjectColumn";
import "@/pages/project/Project.scss";
import ShareMember from "../../components/ShareMember";
import { AddProjectModal } from "../../components/project/Modal";
import { useEffect, useState } from "react";
import { ProjectTaskDynamic } from "../../components/project/ProjectTask";
import Sortable from "sortablejs";

const data= {
  coworkers:[
    {id: 14, name: "김주경", email:"ppsdd123@gmail.com", img:"/images/document-folder-profile.png",},
    {id: 5, name: "박서홍", email:"ppsdd123@gmail.com", img:"/images/document-folder-profile.png",},
    {id: 1, name: "박연화", email:"ppsdd123@gmail.com", img:"/images/document-folder-profile.png",},
    {id: 7, name: "신승우", email:"ppsdd123@gmail.com", img:"/images/document-folder-profile.png",},
    {id: 2, name: "이상훈", email:"ppsdd123@gmail.com", img:"/images/document-folder-profile.png",},
    {id: 6, name: "전규찬", email:"ppsdd123@gmail.com", img:"/images/document-folder-profile.png",},
    {id: 4, name: "하진희", email:"ppsdd123@gmail.com", img:"/images/document-folder-profile.png",},
  ],
  columns: [
    {
      title: "Get Started",
      color:
        "linear-gradient(0deg,rgba(245,35,75,0.40)0%,rgba(245,35,75,0.40)100%),#F5234B",
      projects: [
        {
          id:0,
          title: "👋 Welcome to your board 👉",
          status: "active",
          content: "Here you'll submit and manage all of your design requests.",
          priority: 4,
        },
      ],
    },
    {
      title: "🛠️ In Progress",
      color:
        "linear-gradient(0deg,rgba(0,112,245,0.40)0%,rgba(0,112,245,0.40)100%),#0070F5",
      projects: [
        {
          id:1,
          title: "화면구현 설계",
          content: "figma 디자인 및 구현 상태 확인",
          status: "completed",
          priority: 2,
        },
        {
          id:2,
          title: "화면 구현",
          content:
            "Html로 React 실행 화면 되도록이면 구현하기. 불가능할시 다음주에 더 열심히 하기",
          status: "active",
          priority: 0,
          subTasks: [
            { id: 1, isChecked: false, name: "화면 구현하기" },
            { id: 2, isChecked: true, name: "DB 설계하기" },
          ],
          checked: 1,
          tags: ["Web app", "HTML", "React"],
          duedate: "2024-11-22",
          commentsList: [
            { id: 1, user: "chhak0503", rdate: "24-11-21 17:05", content: "나 철학인데 이거 이번주까지 아니다 정신 차려라" },
            { id: 2, user: "chhak0503", rdate: "24-11-25 09:01", content: "나 철학인데 이거 이번주까지다 정신 차려라" },
          ],
        },
      ],
    },
    {
      title: "✅ Approved",
      color:
        "linear-gradient(0deg,rgba(30,195,55,0.40)0%,rgba(30,195,55,0.40)100%),#1EC337",
      projects: [
        {
          id:3,
          title: "Search history for Backlinks and Keywords tool",
          priority: 1,
          status: "completed",
        },
      ],
    },
  ],
};

export default function Project() {
  // Tailwind CSS 클래스 묶음
  const addBoardClass = "flex gap-2 items-center px-3 py-2 w-full text-sm rounded-lg bg-zinc-200 bg-opacity-30";

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 관리
  const [selectedTasks, setSelectedTasks] = useState([]);
  const handleToggle = (id) => {
    // 이미 열린 상태라면 선택 해제, 아니면 배열에 추가
    setSelectedTasks(prev => {
      if (prev.includes(id)) {
        return prev.filter(taskId => taskId !== id); // 이미 열린 태스크라면 제거
      } else {
        return [...prev, id]; // 새로운 태스크를 열기 위해 배열에 추가
      }
    });
  };
  useEffect(() => {
    for (let i = 0; i < data.columns.length; i++) {
      const column = document.getElementById(`column${i}`);
      if (column) {
        Sortable.create(column, {
          group: 'kanban',
          animation: 150,
        });
      }}
  }, []);

  return (
    <div id="project-container" className="flex min-h-full">
      {/* 사이드바 */}
      <div className="w-[270px]">
        <ProjectAside />
      </div>

      {/* 메인 섹션 */}
      <section className="flex-grow py-6 pl-6 min-w-max bg-white rounded-3xl">
        
        {/* 헤더 */}
        <div className="flex pb-2.5 w-full mb-4">

          <div className="w-[30%]"></div>

          <header className="flex w-[40%] overflow-hidden relative justify-between items-center px-5 py-1 rounded-xl bg-zinc-100">
              <div></div>
                <span className="text-lg text-center text-black">새 프로젝트 (1)</span>
              <button>
                <CustomSVG id="rename" />
              </button>
          </header>

          {/* 네비게이션 */}
          <div className="w-[30%] flex justify-end">
            <ShareMember listName="작업자" isShareOpen={isModalOpen} setIsShareOpen={setIsModalOpen} members={data.coworkers}>
              <AddProjectModal isOpen={isModalOpen} onClose={setIsModalOpen} text="작업자 추가" coworker={data.coworkers}/>
            </ShareMember>
          </div>
        </div>

        {/* 프로젝트 컬럼 */}
        <div className="flex gap-5 max-md:flex-col">
            {data.columns.map((column, index) => (
              <ProjectColumn key={index} {...column} index={index}>
                {column.projects.map((project) => (
                  <ProjectTaskDynamic
                    key={project.id}  // 고유한 title 또는 id 사용
                    isSelected={selectedTasks.includes(project.id)}   // id로 선택된 상태 관리
                    {...project}
                    handleToggle={() => handleToggle(project.id)}  // id를 파라미터로 전달
                  />
                ))}
              </ProjectColumn>
            ))}
          {/* 새 보드 추가 */}
          <div className="flex flex-col w-64 text-center min-w-[240px] text-black text-opacity-50">
            <div className={addBoardClass}>
              <CustomSVG id="add" /> <span>새 보드</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
