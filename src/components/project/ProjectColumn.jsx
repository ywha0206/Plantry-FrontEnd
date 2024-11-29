/* eslint-disable react/prop-types */
import { CustomSVG } from "./CustomSVG";
import { useState } from "react";
import NewTask from './NewTask';
import { ColumnHeader, ColumnHeaderEdit } from "./ColumnHeader";



export const ProjectColumn = ({ title, color="#000000", count=0, children, index, clearTasks, status="basic", setData }) => {

  const initialData = status=="new"?
    {title:title, color:color, count:count, projects:[]}
    :{title:title, color:color, count:count}
  const [column, setColumn] = useState(initialData)
  const [isNewTaskAdded, setIsNewTaskAdded] = useState(false);
  const [mode, setMode] = useState(status);
  

  const handleAddTask = () => {
    if (!isNewTaskAdded) {
      setIsNewTaskAdded(true);
    }
  };
  
  

  return (
    <section className="flex flex-col w-64 min-w-[240px]">
      {/* Column Header */}
      {mode==="basic"&&<ColumnHeader column={column} setMode={setMode} clearTasks={clearTasks}/>
      ||<ColumnHeaderEdit column={column} setColumn={setColumn} setMode={setMode} setData={setData} mode={mode} />}
      

      {/* Column Content */}
      <div className="flex flex-col mt-3 w-full overflow-y-auto max-h-[600px] scrollbar-none" id={`column-${index}`}>
        {children}
      </div>

      {/* Add New Task */}
      {isNewTaskAdded && (<NewTask setIsAdded={setIsNewTaskAdded} />)}
      {mode==="new"||
        <button onClick={handleAddTask} className="flex gap-2 items-center px-3 py-2 mt-3 w-full text-center text-black text-opacity-50">
          <CustomSVG id="add" />
          <div className="self-stretch my-auto text-sm leading-none">새 목표</div>
        </button>
      }
      
    </section>
  );
};