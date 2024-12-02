/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { CustomSVG } from "./CustomSVG";


export const AddProjectModal = ({ coworker=[], isOpen, onClose , text }) => {
    if (!isOpen) return null;

    const data = {
        sub: "개발부",
        members: [
            {id: 10, name: "강은경", email:"ppsdd123@gmail.com", img:"/images/document-folder-profile.png",},
            {id: 12, name: "강중원", email:"ppsdd123@gmail.com", img:"/images/document-folder-profile.png",},
            {id: 11, name: "김민희", email:"ppsdd123@gmail.com", img:"/images/document-folder-profile.png",},
            {id: 14, name: "김주경", email:"ppsdd123@gmail.com", img:"/images/document-folder-profile.png",},
            {id: 5, name: "박서홍", email:"ppsdd123@gmail.com", img:"/images/document-folder-profile.png",},
            {id: 1, name: "박연화", email:"ppsdd123@gmail.com", img:"/images/document-folder-profile.png",},
            {id: 7, name: "신승우", email:"ppsdd123@gmail.com", img:"/images/document-folder-profile.png",},
            {id: 13, name: "원기연", email:"ppsdd123@gmail.com", img:"/images/document-folder-profile.png",},
            {id: 2, name: "이상훈", email:"ppsdd123@gmail.com", img:"/images/document-folder-profile.png",},
            {id: 6, name: "전규찬", email:"ppsdd123@gmail.com", img:"/images/document-folder-profile.png",},
            {id: 8, name: "정지현", email:"ppsdd123@gmail.com", img:"/images/document-folder-profile.png",},
            {id: 3, name: "하정훈", email:"ppsdd123@gmail.com", img:"/images/document-folder-profile.png",},
            {id: 4, name: "하진희", email:"ppsdd123@gmail.com", img:"/images/document-folder-profile.png",},
            {id: 9, name: "황수빈", email:"ppsdd123@gmail.com", img:"/images/document-folder-profile.png",},
        ]    
    }

    const [tags, setTags] = useState(coworker); // 선택된 공동작업자
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
    const [filteredMembers, setFilteredMembers] = useState(data.members); // 필터링된 멤버 리스트
    const [selectedMemberIds, setSelectedMemberIds] = useState(coworker.map((work)=>(work.id))); // 선택된 멤버 ID

    // 검색 입력 핸들러
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredMembers(
        data.members.filter(
            (member) =>
            member.name.toLowerCase().includes(term) ||
            member.email.toLowerCase().includes(term)
        )
        );
    };

    // 멤버 클릭 핸들러 (토글 방식)
  const handleMemberClick = (member) => {
    if (selectedMemberIds.includes(member.id)) {
      // 이미 선택된 경우 -> 선택 해제
      setTags((prev) => prev.filter((tag) => tag.id !== member.id));
      setSelectedMemberIds((prev) => prev.filter((id) => id !== member.id));
    } else {
      // 선택되지 않은 경우 -> 선택 추가
      setTags((prev) => [...prev, member]);
      setSelectedMemberIds((prev) => [...prev, member.id]);
      setSearchTerm("");
      setFilteredMembers(data.members);
    }
    document.getElementById('focus').focus();
  };

    // 태그 삭제 핸들러
    const handleDeleteTag = (index) => {
        const removedTag = tags[index];
        setTags((prev) => prev.filter((_, i) => i !== index));
        setSelectedMemberIds((prev) => prev.filter((id) => id !== removedTag.id));
    };

return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg max-w-3xl modal-custom-width">
        <div className="absolute top-5 right-5 rounded-t-xl">
            <button onClick={() => onClose(false)} className="text-md float-right display-block font-bold text-gray-600 hover:text-gray-900" >
            <CustomSVG id="close" />
            </button>
        </div>
        <div className="modal-content flex flex-col items-center">
            <div className="text-xl pt-7 px-12">{text}</div>
          {text === '새 프로젝트' &&
            <>
                <span className="text-xs font-light text-gray-500 mt-10">새 프로젝트를 만드시겠어요? 도와드릴테니 같이 만들어봐요!</span>
                <div className="w-full flex flex-col mt-10">
                    <span className="bg-white text-gray-500 text-xs relative top-2 w-fit ml-10 px-1">프로젝트 명</span>
                    <input type="text" className="border rounded-md h-[45px] indent-4" placeholder="새 프로젝트 1" />
                </div>
                <div className="flex w-full">
                    <div className="w-2/5 flex flex-col">
                        <span className="bg-white text-gray-500 text-xs relative top-2 w-fit ml-10 px-1">프로젝트 형태</span>
                        <select type="text" className="border rounded-md h-[60px] indent-4 mr-2 text-sm">
                            <option value="">부서 내부 프로젝트</option>
                            <option value="">개발 프로젝트</option>
                            <option value="">디자인 프로젝트</option>
                            <option value="">어쩌구 프로젝트</option>
                            <option value="">저쩌구 프로젝트</option>
                        </select>
                    </div>
                    <div className="w-3/5 flex flex-col"> 
                        <span className="bg-white text-gray-500 text-xs relative top-2 w-fit ml-10 px-1">작업자 목록 ({tags.length})</span>
 
                        <div className="border rounded h-[60px] p-3 flex items-center gap-1 overflow-x-auto overflow-y-hidden scrollbar-thin">
                            {tags.map((tag, index) => (
                                <span
                                key={tag.id}
                                className="flex items-center flex-shrink-0 gap-[2px] px-2 py-[2px] rounded-2xl bg-indigo-200 bg-opacity-70 text-xs text-indigo-500"
                                > 
                                    <img src={tag.img} className="h-[24px]" /> 
                                    <span className="">{tag.name}</span>
                                    <button onClick={() => handleDeleteTag(index)}>
                                        <CustomSVG id="cancel" color="#666CFF" />
                                    </button>
                                </span>
                            ))}
                            <input
                                id="focus"
                                type="text" 
                                value={searchTerm} autoFocus 
                                onChange={handleSearch}
                                className="border-0 flex-shrink-0 min-w-[100px]"
                            />
                        </div>
                    </div>
                </div>
                
            </>
          }
            {text === '작업자 추가' &&
                <>
                        <span className="text-xs font-light text-gray-500 mt-10">함께 작업할 사람을 자유롭게 초대해보세요</span>
 
                        <span className="bg-white text-gray-500 text-xs relative top-2 right-[43%] w-fit ml-10 px-1">작업자 목록 ({tags.length})</span>
 
                        <div className="border rounded-md h-[60px] p-3 flex items-center gap-1 overflow-x-auto overflow-y-hidden scrollbar-thin w-full">
                            {tags.map((tag, index) => (
                                <span
                                key={tag.id}
                                className="flex items-center flex-shrink-0 gap-[2px] px-2 py-[2px] rounded-2xl bg-indigo-200 bg-opacity-70 text-xs text-indigo-500"
                                > 
                                    <img src={tag.img} className="h-[24px]" /> 
                                    <span className="">{tag.name}</span>
                                    <button onClick={() => handleDeleteTag(index)}>
                                        <CustomSVG id="cancel" color="#666CFF" />
                                    </button>
                                </span>
                            ))}
                            <input
                                id="focus"
                                type="text"
                                value={searchTerm} 
                                onChange={handleSearch} autoFocus 
                                className="border-0 flex-shrink-0 min-w-[100px]"
                            />
                        </div>
                </>
            }
            {/* 리스트 */}
            <ul className="border rounded-lg w-full h-[300px] mt-10 px-4 py-3 overflow-auto scrollbar-thin scrollbar-thumb-transparent">
                    {filteredMembers.map((m) => (
                        <li
                            key={m.id}
                            onClick={() => handleMemberClick(m)}
                            className={`rounded-3xl px-3 py-3 flex mt-2 cursor-pointer border border-transparent  ${
                                selectedMemberIds.includes(m.id)
                                  ? "bg-indigo-100 hover:border-indigo-300" // 선택된 멤버의 배경색
                                  : "bg-gray-100 hover:border-gray-300"
                              }`}
                        > 
                            <img src={m.img} alt="user-img" className="w-[45px] h-[45px]" /> 
                            <div className="ml-10 flex flex-col">
                            <p className="font-light text-left">{m.name}</p>
                            <span className="font-light text-gray-500 text-sm">
                                {m.email}
                            </span>
                            </div>
                        </li>
                    ))}
                    {filteredMembers.length === 0 && (
                        <li className="text-center text-gray-500">검색 결과가 없습니다.</li>
                    )}
                </ul>
                <div className="flex justify-between w-full mt-1">
                        <span className="flex items-center gap-1 text-xs text-gray-500"><CustomSVG id="supervised-user"/>프로젝트 공개설정 : 누구나</span>
                        <span className="flex items-center gap-1 text-xs text-[#7E7EDF]"><CustomSVG id="link" color="currentColor"/>공유 링크 복사</span>
                </div>
                <button className="h-[40px] bg-[#7E7EDF] px-8 text-white rounded-[8px] mt-10 mb-[30px]" onClick={() => onClose(false)}>
                {text === '작업자 추가'&&'초대하기'||'생성하기'}
                </button>
        </div>
        
      </div>
    </div>
    );
};
