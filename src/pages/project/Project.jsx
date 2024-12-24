import "@/pages/project/Project.scss";
import ShareMember from "@/components/ShareMember";
import ProjectAside from "@/components/project/ProjectAside";
import { CustomSVG } from "@/components/project/_CustomSVG";
import { AddProjectModal } from "@/components/project/_Modal";
import { ProjectColumn } from "@/components/project/Column";
import  DynamicTask  from "@/components/project/Task";
import { useCallback, useEffect, useRef, useState } from "react";
import Sortable from "sortablejs";
import axiosInstance from "@/services/axios.jsx";
import useProjectStore from "../../util/useProjectData";
import useUserStore from "../../store/useUserStore";


export default function Project() {
 // Tailwind CSS 클래스 묶음
  const addBoardClass ="flex gap-2 items-center px-3 py-2 w-full text-sm rounded-lg bg-zinc-200 bg-opacity-30";

  const [data, setData] = useState({ title: '', columns: [], coworkers: [] });
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 관리
  const [isNewColumnAdded, setIsNewColumnAdded] = useState(false);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [projectId, setProjectId] = useState(1);
  const {project, sendWebSocketMessage} = useProjectStore(projectId);
  const columnsRef = useRef(null); 
  const loginUser = useUserStore((state) => state.user)

  
  const handleEditTitle = () => {
  setIsEditTitle(!isEditTitle);
  };
  const onCoworkerSelect = value => {
  setData((prev) => ({
    ...prev,
    coworkers: value,
  }));
  }
  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleTaskUpsert = useCallback((task) => {
    const msg = task.id > 0 ? 'updated' : 'added';
    const updatedTask = { ...task, projectId: projectId };
    sendWebSocketMessage(updatedTask, `/app/project/${projectId}/task/${msg}`);
  }, [projectId, sendWebSocketMessage]);
  
  useEffect(() => {
    if (project) {
      console.log('Updated Board Data:', [project]); // 상태 업데이트 후 데이터를 출력
      setData(project||[])
    }
  }, [projectId,project]); 
  useEffect(() => {
    if (!Array.isArray(columnsRef.current)) {
      columnsRef.current = [];
    }
  }, []);
  useEffect(() => {
    const sortables = data.columns.map((column, columnIndex) => {
      const columnEl = columnsRef.current[columnIndex];
      if (!columnEl) return null;

      return new Sortable(columnEl, {
        group: 'shared',
        animation: 150,
        ghostClass: 'sortable-ghost',
        dragClass: 'sortable-drag',
        onEnd: async (evt) => {
          const { item, from, to } = evt;
          const fromColumnId = from.getAttribute('data-column-id');
          const toColumnId = to.getAttribute('data-column-id');
          const taskId = item.getAttribute('data-task-id');
          
          // Find the task that was moved
          const task = data.columns
            .find(col => col.id === fromColumnId)
            ?.tasks
            .find(t => t.id === parseInt(taskId));
            
          if (!task) return;

          // Calculate new position
          const newIndex = evt.newIndex;
          const toColumn = data.columns.find(col => col.id === toColumnId);
          let newPosition;
          
          if (toColumn.tasks.length === 0) {
            newPosition = 1000; // First position in empty column
          } else if (newIndex === 0) {
            newPosition = toColumn.tasks[0].position / 2; // Position before first task
          } else if (newIndex === toColumn.tasks.length) {
            newPosition = toColumn.tasks[toColumn.tasks.length - 1].position + 1000; // Position after last task
          } else {
            // Position between two tasks
            const prevPosition = toColumn.tasks[newIndex - 1].position;
            const nextPosition = toColumn.tasks[newIndex].position;
            newPosition = (prevPosition + nextPosition) / 2;
          }

          // Update task with new position and column
          const updatedTask = {
            ...task,
            position: newPosition,
            columnId: toColumnId
          };

          // Send update to server
          handleTaskUpsert(updatedTask);
        }
      });
    });

    // Cleanup
    return () => {
      sortables.forEach(sortable => sortable?.destroy());
    };
  }, [data.columns, handleTaskUpsert]);


  const clearTasks = (columnId) => {
    setData((prevData) => ({
      ...prevData,
      columns: prevData.columns.map((col) =>
        col.id === columnId ? { ...col, tasks: [] } : col
      ),
    }));
  };
  const ToggleAddColumn = () => {
    if (!isNewColumnAdded) {setIsNewColumnAdded(true);}
  };
  const handleAddColumn = (column) => {
    sendWebSocketMessage(column,`/app/project/${projectId}/column/added`);
  };
  const handleDeleteColumn = (column) => {
    sendWebSocketMessage(column,`/app/project/${projectId}/column/deleted`);
  };

  const handleDeleteTask = (task, columnId) => {
    const updatedTask = { ...task, projectId: projectId,columnId: columnId };
    sendWebSocketMessage(updatedTask,`/app/project/${projectId}/task/deleted`);
  };

  const handleAddComment = (comment, taskId) => {
    console.log(comment);
    const updatedComment = { ...comment, taskId: taskId, user: loginUser, user_id: loginUser.uid };
    sendWebSocketMessage(updatedComment,`/app/project/${projectId}/comment/added`);
  };
  const handleDeleteComment = (comment, taskId) =>{
    console.log(comment);
    const updatedComment = { ...comment, taskId: taskId, user: loginUser, user_id: loginUser.uid };
    sendWebSocketMessage(updatedComment,`/app/project/${projectId}/comment/deleted`);
  }

  const handleAddSubTask = (columnId, taskId, newSubTask) => {
    const subTask = {isChecked : false, name : newSubTask, taskId: taskId, columnId: columnId, projectId: projectId,}
    sendWebSocketMessage(subTask,`/app/project/${projectId}/sub/added`);
  };
  const handleClickSubTask = (subTask) => {
    sendWebSocketMessage(subTask, `/app/project/${projectId}/sub/updated`);
  };
  const handleDeleteSubTask = (subTask) => {
    sendWebSocketMessage(subTask, `/app/project/${projectId}/sub/deleted`);
  };

  return (
    <div id="project-container" className="flex min-h-full">
      {/* 사이드바 */}
      <div className="w-[270px]">
        <ProjectAside setProjectId={setProjectId} onOpennedChange={handleProjectChange}/>
      </div>

      {/* 메인 섹션 */}
      <section className="flex-grow py-6 pl-6 min-w-max bg-white rounded-3xl">
        {/* 헤더 */}
        <div className="flex pb-2.5 w-full mb-4">
          <div className="w-[30%]"></div>

          <header className="flex w-[40%] overflow-hidden relative justify-between items-center px-5 py-1 rounded-xl bg-zinc-100">
            
              <span className="text-lg text-center w-full text-black">
                {data.title}
              </span>

          </header>

          {/* 네비게이션 */}
          <div className="w-[30%] flex justify-end">
          <ShareMember
              listName="작업자"
              isShareOpen={isModalOpen}
              setIsShareOpen={setIsModalOpen}
              members={data.coworkers}
            >
              <AddProjectModal
                isOpen={isModalOpen}
                onClose={setIsModalOpen}
                text="작업자 추가"
                selectedUsers={data.coworkers}
                setSelectedUsers={onCoworkerSelect}
                projectId={data.id}
              />
            </ShareMember>
          </div>
        </div>

        {/* 프로젝트 컬럼 */}
        <div className="flex gap-5 max-md:flex-col">
          {data?.columns?.map((column, index) => (
            
        <div key={column.id} className="flex flex-col w-64 min-w-[240px]">
            <ProjectColumn
            {...column}
            projectId={data.id}
            index={index}
            coworkers={data.coworkers}
            clearTasks={() => clearTasks(column.id)}
            onDelete={() => handleDeleteColumn(column)}
            handleTaskUpsert={handleTaskUpsert}
          >
            <div 
              ref={el => columnsRef.current[index] = el}
              data-column-id={column.id}
              className="flex flex-col gap-2"
            >
            {column.tasks.map((task) =>(
            <div 
            key={task.id}
            data-task-id={task.id}
          >
                <DynamicTask
                  {...task}
                  projectId={data.id}
                  columnIndex={index}
                  columnId={column.id}
                  onAddSubTask={(newSubTask) =>handleAddSubTask(column.id, task.id, newSubTask)}
                  onClickSubTask={handleClickSubTask}
                  onAddComment={handleAddComment}
                  onDeleteComment={handleDeleteComment}
                  onSaveTask={handleTaskUpsert}
                  onDeleteTask={() => handleDeleteTask(task, column.id)}
                  coworkers={data.coworkers}
                />
              </div>
            ))}
            </div>
          </ProjectColumn>
          </div>
          ))}
          {/* 새 보드 추가 */}
          {isNewColumnAdded ? (
            <ProjectColumn
            projectId={data.id}
            index={data.columns.length}
            status="new"
          />
          ) : (
            <div className="flex flex-col w-64 text-center min-w-[240px] text-black text-opacity-50">
              <button className={addBoardClass} onClick={ToggleAddColumn}>
                <CustomSVG id="add" /> <span>새 보드</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
