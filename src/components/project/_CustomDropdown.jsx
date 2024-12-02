/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export const MenuItem = ({ onClick, children, tooltip, confirm }) => {
  const [showTooltip, setShowTooltip] = useState(false); // 툴팁 표시 상태
  const [confirmReady, setConfirmReady] = useState(false); // 확인 준비 상태
  const [tooltipPosition, setTooltipPosition] = useState({});
  const itemRef = useRef(null);
  const tooltipTimer = useRef(null);

  // 첫 번째 클릭 시 툴팁 표시, 두 번째 클릭 시 동작 실행
  const handleClick = () => {
    if (!confirmReady) {
      setShowTooltip(true); // 툴팁 표시
      setConfirmReady(true); // 확인 준비 상태로 전환
      tooltipTimer.current = setTimeout(() => {
        setShowTooltip(false);
        setConfirmReady(false); // 시간이 지나면 초기화
      }, 3000); // 3초 후 초기화
    } else {
      // 실제 동작 실행
      if (onClick) onClick();
      setConfirmReady(false);
      setShowTooltip(false); // 툴팁 닫기
      clearTimeout(tooltipTimer.current); // 타이머 제거
    }
  };

  // 화면 경계 및 툴팁 위치 조정
  useEffect(() => {
    if (showTooltip && itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      let top = rect.top + scrollY + 3;
      let left = rect.left + scrollX + rect.width;

      // 경계 조정
      if (left + 100 > viewportWidth) left = viewportWidth - 110;
      if (left < 10) left = 10;

      setTooltipPosition({ top, left });
    }
  }, [showTooltip]);

  // 외부 클릭 감지
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (itemRef.current && !itemRef.current.contains(event.target)) {
        setShowTooltip(false);
        setConfirmReady(false);
        clearTimeout(tooltipTimer.current);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative" ref={itemRef}>
      <li
        role="menuitem"
        className="flex items-center p-2 hover:bg-gray-200 cursor-pointer text-xs"
        onClick={confirm?handleClick:onClick}
        onMouseEnter={() => !confirm && tooltip && setShowTooltip(true)}
        onMouseLeave={() => tooltip && setShowTooltip(false)}
      >
        {children}
      </li>
      {showTooltip && (
        <Tooltip text={tooltip} position={tooltipPosition} />
      )}
    </div>
  );
};

export const Tooltip = ({ text, position }) => {
  return createPortal(
    <div
      className="absolute px-3 py-1 text-white bg-black bg-opacity-90 rounded-md shadow-md text-xs"
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        whiteSpace: "nowrap",
        zIndex: 50,
      }}
    >
      {text}
    </div>,
    document.body
  );
};
