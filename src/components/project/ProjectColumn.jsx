/* eslint-disable react/prop-types */
import { ProjectCard } from './ProjectCard';
import { TaskCard } from './ProjectTaskCard';

export const ProjectColumn = ({ title, count, color, projects }) => {
  return (
    <div className="flex flex-col w-64 min-w-[240px]">
      <div className="flex flex-col w-full text-base leading-none">
        <div className="flex gap-3 items-center w-full min-h-[32px]">
          <div className="flex flex-1 shrink gap-2 items-start self-stretch my-auto basis-0">
            <div className="font-[590] text-black text-opacity-80">{title}</div>
            <div className="text-black text-opacity-50">{count}</div>
          </div>
          <div className="flex shrink-0 self-stretch my-auto h-[22px] w-[34px]" />
        </div>
        <div className={`flex mt-1 w-full rounded-lg ${color} min-h-[4px]`} />
      </div>
      <div className="flex flex-col mt-3 w-full">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
        <TaskCard />
      </div>
      <div className="flex gap-2 items-center px-3 py-2 mt-3 w-full text-center text-black text-opacity-50">
        <i className="add ico text-color" aria-label=""></i>
        <div className="self-stretch my-auto text-sm leading-none">새 목표</div>
      </div>
    </div>
  );
};