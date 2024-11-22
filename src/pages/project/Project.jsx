import { ProjectColumn } from '../../components/project/ProjectColumn';
import '@/pages/project/Project.scss'

const projectColumns = [
  {
    title: "Get Started",
    count: 4,
    color: "bg-[linear-gradient(0deg,rgba(245,35,75,0.40_0%,rgba(245,35,75,0.40)_100%),#F5234B)]",
    projects: [
      {
        title: "👋 Welcome to your board 👉",
        description: "Here you'll submit and manage all of your design requests.",
        status: "active"
      }
    ]
  },
  {
    title: "🛠️ In Progress",
    count: 1,
    color: "bg-[linear-gradient(0deg,rgba(0,112,245,0.40_0%,rgba(0,112,245,0.40)_100%),#0070F5)]",
    projects: [
      {
        title: "화면구현 설계",
        description: "figma 디자인 및 구현 상태 확인",
        status: "active",
        stats: [
          { icon: "􀋳", value: "0/1" },
          { icon: "􀉉", value: "Tomorrow" },
          { icon: "􂄹", value: "1" }
        ]
      }
    ]
  },
  {
    title: "✅ Approved",
    count: 17,
    color: "bg-[linear-gradient(0deg,rgba(30,195,55,0.40_0%,rgba(30,195,55,0.40)_100%),#1EC337)]",
    projects: [
      {
        title: "Search history for Backlinks and Keywords tool",
        status: "completed",
        stats: [
          { icon: "􀋳", value: "2/2" }
        ]
      }
    ]
  }
];

export default function Project() {
  return (
    <div id='project-container'>
      <section className="flex-auto py-8 pl-6 shadow-[0px_4px_8px_rgba(152,152,152,0.25)] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          {projectColumns.map((column, index) => (
            <ProjectColumn key={index} {...column} />
          ))}
          <div className="flex flex-col w-64 text-center min-w-[240px] text-black text-opacity-50">
            <div className="flex gap-2 items-center px-3 py-2 w-full rounded-lg bg-zinc-200 bg-opacity-30">
              <div className="self-stretch px-1.5 py-px my-auto w-6 text-lg leading-none whitespace-nowrap">
                􀅼
              </div>
              <div className="self-stretch my-auto text-sm leading-none">
                새 보드
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
