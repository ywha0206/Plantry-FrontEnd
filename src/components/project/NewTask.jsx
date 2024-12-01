/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { CustomSVG } from "./CustomSVG";

function DynamicTaskEditor({ setIsAdded, onSave, taskToEdit, mode }) {
  const [task, setTask] = useState({
    title: "",
    content: "",
    duedate: "",
    tags:[],
    priority: 0
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [isNewTagAdded, setIsNewTagAdded] = useState(false);

  useEffect(() => {
    if (mode === "edit" && taskToEdit) {
      setTask(taskToEdit); // 기존 task로 초기화
    }
  }, [mode, taskToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleClose = () => setIsAdded(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title.trim() === "") return;

    const newTask = {
      ...task,
      id: Date.now(), // 고유 ID
      status: "active",
    };

    onSave(newTask); // 상위 컴포넌트로 태스크 전달
    setIsAdded(false);  // 태스크 추가 후 창 닫기
  };

  const handleAddTag = () => {
    if (newTag.trim() === "") return;
    setTask((prevTask) => ({...prevTask, tags: [...prevTask.tags, newTag],}));
    setNewTag("");
    setIsNewTagAdded(false);
  };
  const handleDeleteTag = (index) => {
    setTask((prevTask) => ({...prevTask,tags: prevTask.tags.filter((_, i) => i !== index),}));
  };
  const handleNewTag = () => {
    if (!isNewTagAdded) setIsNewTagAdded(true);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handlePrioritySelect = (priority) => {
    setTask((prevTask) => ({ ...prevTask, priority }));
    setIsDropdownOpen(false);
  };

  const priorities = [
    { id: "none", label: "None", icon: null },
    { id: "p0", icon: "p0", label: "P0 - 아주 높음" },
    { id: "p1", icon: "p1", label: "P1 - 높음" },
    { id: "p2", icon: "p2", label: "P2 - 보통" },
    { id: "p3", icon: "p3", label: "P3 - 낮음" },
    { id: "p4", icon: "p4", label: "P4 - 아주 낮음" },
  ];

  const colClassName =
    "flex gap-1.5 items-start pt-1.5 mt-1.5 max-w-full tracking-normal leading-none rounded-lg min-h-[26px] text-gray-600 text-opacity-60 w-[231px]";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mt-3 w-full text-sm relative"
      aria-labelledby="new-task-form"
    >
      <div className="flex gap-2 items-start p-3 pt-2 w-full bg-white rounded-lg border border-solid shadow-sm border-black border-opacity-10">
        <div className="flex flex-col flex-1 shrink w-full basis-0">
          {/* Task Name */}
          <label htmlFor="taskName" className="sr-only">
            Task Name
          </label>
          <div className="flex items-center justify-between">
            <input
              autoFocus
              id="taskName"
              type="text"
              name="title"
              value={task.title}
              onChange={handleInputChange}
              placeholder="이름을 입력하세요"
              className="flex flex-col max-w-full tracking-normal leading-6 rounded-lg min-h-[26px] text-gray-600 text-opacity-60 w-[198px]"
              aria-label="Task name"
            />
            <button onClick={handleClose} aria-label="Close form" type="button">
              <CustomSVG id="close" />
            </button>
          </div>

          {/* Priority Dropdown */}
          <div className={colClassName}>
            <CustomSVG
              id={
                priorities[task.priority].label === "None"
                  ? "bar-chart"
                  : priorities[task.priority].icon
              }
            />
            <button
              type="button"
              className="flex flex-col flex-1 shrink basis-0 text-sm"
              onClick={toggleDropdown}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
              aria-label="Select priority"
            >
              {priorities[task.priority].label === "None"
                ? "중요도 선택"
                : priorities[task.priority].label}
            </button>
            {isDropdownOpen && (
              <ul
                className="absolute mt-1 w-36 py-2 bg-white border rounded shadow-md z-30"
                role="listbox"
                aria-labelledby="priority-dropdown"
              >
                {priorities.map((priority,index) => (
                  <li
                    key={priority.id}
                    className="flex items-center gap-2 px-3 h-6 text-xs hover:bg-gray-100 cursor-pointer"
                    onClick={() => handlePrioritySelect(index)}
                    role="option"
                    aria-selected={priorities[task.priority].id === priority.id}
                  >
                    <CustomSVG id={priority.icon} />
                    <span>{priority.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Task Details */}
          <div className={colClassName}>
            <CustomSVG id="post-add" />
            <textarea
              id="taskDetails"
              name="content"
              value={task.content}
              onChange={handleInputChange}
              placeholder="세부 내용 입력"
              className="flex flex-col flex-1 shrink basis-0"
              aria-label="Task contents"
            />
          </div>

          {/* Task Date */}
          <div className={colClassName}>
            <CustomSVG id="calendar" />
            <label htmlFor="taskDate" className="sr-only">
              Task date
            </label>
            <input
              id="taskDate"
              type="date"
              name="duedate"
              value={task.duedate}
              onChange={handleInputChange}
              placeholder="일정 추가"
              min="2020-01-01"
              max="9999-12-31"
              aria-label="Task date"
            />
          </div>

          {/* Tags */}
          <div className={`${colClassName} flex-wrap`}>
            <CustomSVG id="tag" />
            {task.tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center justify-center px-2 py-1 rounded-2xl bg-zinc-700 bg-opacity-10 text-xs"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleDeleteTag(index)}
                  aria-label={`Remove tag ${tag}`}
                >
                  <CustomSVG id="cancel" size="14" />
                </button>
              </span>
            ))}
            {isNewTagAdded ? (
              <span className="flex items-center self-stretch px-0.5 py-1 my-auto rounded-2xl bg-zinc-700 bg-opacity-10">
                <span className="flex justify-center px-1 my-auto text-xs">
                  <input
                    className="bg-transparent"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    aria-label="New tag input"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    aria-label="Add new tag"
                  >
                    <CustomSVG id="add" size="15" />
                  </button>
                </span>
              </span>
            ) : (
              <button
                onClick={handleNewTag}
                type="button"
                className="flex gap-1.5 items-center tracking-normal leading-none text-black text-opacity-50"
                aria-label="Add new tag"
              >
                <span className="flex items-center self-stretch px-0.5 py-1 my-auto rounded-2xl bg-zinc-700 bg-opacity-10">
                  <span className="flex justify-center px-1 my-auto text-xs">
                    <CustomSVG id="add" size="15" /> 새 태그
                  </span>
                </span>
              </button>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex overflow-hidden flex-wrap gap-2 items-start mt-2 w-full">
            <button
              type="submit"
              className="flex grow shrink justify-center items-start font-medium tracking-wide leading-6 uppercase whitespace-nowrap text-zinc-700 w-[214px]"
              aria-label="Submit task"
            >
              <span className="flex overflow-hidden flex-col justify-center items-center rounded-lg border border-solid border-zinc-700 border-opacity-50">
                <span className="overflow-hidden px-6 py-1 max-md:px-5">
                  {mode === "edit" ? "수정" : "저장"}
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default DynamicTaskEditor;
