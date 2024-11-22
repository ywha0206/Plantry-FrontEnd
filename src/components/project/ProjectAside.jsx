/* eslint-disable react/prop-types */
export const SidebarItem = ({ icon, label, isActive }) => {
    return (
      <div className={`flex gap-2.5 items-center mt-14 w-full max-md:mt-10 ${isActive ? 'font-medium text-indigo-400' : 'text-gray-600'}`}>
        <img
          loading="lazy"
          src={icon}
          className="object-contain shrink-0 self-stretch my-auto aspect-square w-[25px]"
          alt={`${label} icon`}
        />
        <div className="self-stretch my-auto">{label}</div>
      </div>
    );
  };