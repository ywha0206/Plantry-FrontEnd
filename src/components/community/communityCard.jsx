import React from "react";

export default function CommunityCard({
  title,
  content,
  icon = "/images/Notice Icon.png", // 기본 아이콘 경로
  isOwner,
  onDelete,
}) {
  return (
    <div className="flex flex-col items-start p-4 w-[430px] h-[320px] border bg-white rounded-3xl shadow-md">
      <div className="title_link flex flex-row items-center justify-between w-full">
        <span className="title text-start ml-4 text-lg font-bold">{title}</span>
        <img
          src={icon}
          alt={`${title} Icon`}
          className="linkImg w-6 h-6 mr-4"
        />
      </div>
      <div className="communityCardcontent mt-4 ml-4 text-gray-600">
        <p>{content}</p>
      </div>
     
    </div>
  );
}
