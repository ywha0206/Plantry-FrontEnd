/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { CustomSVG } from "./CustomSVG";

export function CustomDropdown({ options, placeholder, onSelect }) {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림 상태
  const [selected, setSelected] = useState(""); // 선택된 값
  const dropdownRef = useRef(null); // 드롭다운 외부 클릭 감지를 위한 ref

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false); // 선택 후 드롭다운 닫기
    if (onSelect) onSelect(option); // 선택 값 부모로 전달
  };

  const toggleDropdown = () => {setIsOpen((prev) => !prev);};

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false); // 외부 클릭 시 닫기
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* 드롭다운 버튼 */}
      <div
        onClick={toggleDropdown}
        className="border rounded h-[60px] px-4 flex items-center justify-between cursor-pointer"
      >
        <span className={selected ? "text-black" : "text-gray-400"}>
          {selected || placeholder}
        </span>
        <CustomSVG id="expand-down" />
      </div>

      {/* 드롭다운 리스트 */}
      {isOpen && (
        <ul className="absolute left-0 top-full mt-1 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto z-50">
          {options.map((option, index) => (
            <MenuItem
              key={index}
              onClick={() => handleSelect(option)}
              className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              {option}
            </MenuItem>
          ))}
        </ul>
      )}
    </div>
  );
}

export const MenuItem = ({ onClick, children }) => (
  <li
    role="menuitem"
    className="flex items-center p-2 hover:bg-gray-200 cursor-pointer text-xs"
    onClick={onClick}
  >
    {children}
  </li>
);
