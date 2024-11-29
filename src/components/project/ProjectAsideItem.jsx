/* eslint-disable react/prop-types */
import * as React from "react";
import { CustomSVG } from "./CustomSVG";

function ProjectAsideItem({ title, isActive, onStatusChange }) {
  return (
    <div 
      className={`flex justify-between items-center px-4 py-3.5 w-full rounded-xl min-h-[50px] ${
        isActive ? 'bg-indigo-100' : 'bg-white'
      } ${isActive ? 'mt-2.5' : ''}`}
      onClick={onStatusChange} // Toggle on click
    >
      <div className="flex flex-1 shrink gap-2.5 items-center self-stretch my-auto w-full basis-0">
        <CustomSVG id="subject" />
        <span className="flex-1 shrink self-stretch my-auto basis-0">
          {title}
        </span>
        <CustomSVG id="more" />
      </div>
    </div>
  );
}

export default ProjectAsideItem;