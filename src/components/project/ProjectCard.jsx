/* eslint-disable react/prop-types */
export const ProjectCard = ({ title, description, stats, labels, status }) => {
    return (
      <div className="flex gap-2 items-start p-3 w-full bg-white rounded-lg border border-solid shadow-sm border-black border-opacity-10">
        <div className={`flex flex-col justify-center items-center px-0.5 py-px w-6 text-lg leading-none ${status === 'active' ? 'text-amber-500' : status === 'completed' ? 'text-rose-500' : 'text-black'} whitespace-nowrap min-h-[24px]`}>
          <div className="opacity-70">􀁣</div>
        </div>
        <div className="flex flex-col flex-1 shrink basis-0 text-black text-opacity-50">
          <div className="text-sm leading-4 min-h-[24px]">{title}</div>
          {description && (
            <div className="leading-none text-ellipsis">{description}</div>
          )}
          {stats && (
            <div className="flex flex-wrap gap-2 items-start pt-3 w-full text-xs leading-none">
              {stats.map((stat, index) => (
                <div key={index} className="flex gap-1 items-center whitespace-nowrap">
                  <div className="self-stretch my-auto text-center">{stat.icon}</div>
                  <div className="self-stretch my-auto text-ellipsis">{stat.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };