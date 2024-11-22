
export function TaskCard() {

    const data = {
        title: "화면 구현",
        content: "Html로 React 실행 화면 되도록이면 구현하기. 불가능할시 다음주에 더 열심히 하기",
        priority: 2,
        toDoList:[{
            isChecked: false,
            task: "화면 구현하기"
        }],
        checked: 0,
        tags: ["Web app","HTML", "React"],
        date: "2024-11-22",
        comments: 1,
        commentsList: [
            {
                id: "chhak0503",
                rdate: "24-11-21 17:05",
                content: "나 철학인데 이거 이번주까지 아니다 정신 차려라"
            }
        ],
    }

  return (
    <article className="flex gap-2 items-start p-3 mt-3 w-full bg-white rounded-lg border border-solid shadow-sm border-black border-opacity-10">
      <div className="flex flex-col flex-1 shrink w-full basis-0">
        <div className="flex justify-between items-start py-px pl-1.5 w-full">
            <h1 className="py-0.5 w-auto">{data.title}</h1>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7aa3da81d7784dbe49f864412cc2154df654082feea3bd718405e30fd85bfbb?placeholderIfAbsent=true&apiKey=64129ff822ae4d01a6810b1149e35589"
              alt=""
              className="object-contain shrink-0 w-4 aspect-square"
            />
        </div>
        <section className="flex gap-1.5 items-start pt-1.5 mt-1.5 max-w-full rounded-lg w-[231px]">
            <div className="flex flex-col justify-center items-start pr-1">
                <i className="ico subject text-color"></i>
            </div>
            <p className="flex flex-col flex-1 shrink w-full text-sm leading-4 basis-0 text-black text-opacity-50">
                <span className="gap-2 w-full">{data.content}</span>
            </p>
        </section>
        <section className="flex flex-col mt-1.5 w-full">
            {data.toDoList.map((todo, index)=>(
                <div className="flex gap-1.5 items-center w-full h-[22px]" key={index}>
                    <div className="flex items-end self-stretch py-0.5 my-auto w-5">
                        {todo.isChecked?(<i className="checkbox checkbox-checked baby-point-color"></i>)
                        :(<i className="checkbox checkbox point-color"></i>)}
                    </div>
                    <div className="flex flex-1 shrink gap-1.5 items-center self-stretch my-auto text-sm leading-6 basis-0 text-neutral-500">
                        <p className="self-stretch my-auto">{todo.task}</p>
                        <div className="flex shrink-0 self-stretch my-auto w-4 h-5" />
                    </div>
                </div>
            ))}
            
            <button className="flex overflow-hidden gap-1.5 justify-center items-center py-1.5 mt-2 w-full text-sm tracking-normal leading-none rounded-lg bg-gray-600 bg-opacity-10 text-gray-600 text-opacity-60">
                <i className="ico add-checkbox text-color"></i>
                <span className="self-stretch my-auto">{data.checked}/{data.toDoList.length} 새 하위 목표 생성</span>
            </button>
        </section>
        <section className="flex overflow-hidden flex-wrap gap-2.5 items-start mt-1.5 w-full text-xs leading-none text-black text-opacity-50">
            <div className="flex flex-wrap flex-1 shrink gap-1.5 items-center pt-1.5 w-full basis-0">
            <i className="tag ico text-color" aria-label=""></i>
            {data.tags.map((tag, index) => (
                <div key={index} className="flex items-center self-stretch p-0.5 my-auto leading-none rounded-2xl bg-zinc-700 bg-opacity-10 text-black text-opacity-50">
                <div className="self-stretch px-1.5 py-1 my-auto">{tag}</div>
                </div>
            ))}
            </div>
        </section>
        <section className="flex overflow-hidden flex-wrap gap-2 items-start mt-1.5 w-full text-sm tracking-normal leading-none text-gray-600 text-opacity-60">
            <div className="flex flex-1 shrink gap-1.5 items-center pt-1.5 whitespace-nowrap basis-5">
                <i className="calendar ico text-color" aria-label=""></i>
                <time className="self-stretch my-auto">{data.date}</time>
            </div>
            <div className="flex gap-1.5 items-center pt-1.5 min-h-[25px] w-[232px]">
                <i className="comment ico text-color" aria-label=""></i>
                <span className="self-stretch my-auto">의견 {data.comments}</span>
            </div>
            {data.commentsList.map((comment, index)=>(
                <article className="flex gap-1.5 items-start leading-4 w-[232px]" key={index}>
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5005caf306e020a63875ae89317ed34981ec083804afbfa938c3ea7760d10078?placeholderIfAbsent=true&apiKey=64129ff822ae4d01a6810b1149e35589"
                        alt=""
                        className="object-contain shrink-0 w-5 aspect-square min-h-[20px]"
                    />
                    <div className="flex-1 shrink basis-0">
                        <span className="text-gray-600">{comment.id}</span>
                        <time className="text-gray-600"> {comment.rdate}</time>
                        <p>{comment.content}</p>
                    </div>
                </article>
            ))}
            
            <form className="flex gap-1.5 items-center px-2.5 py-1 rounded-lg bg-gray-600 bg-opacity-10 min-h-[25px] w-[232px]">
                <i className="reply ico text-color" aria-label=""></i>
                <input
                    type="text"
                    placeholder="의견 작성하기"
                    className="self-stretch my-auto w-[185px] bg-transparent border-none outline-none"
                    aria-label="의견 작성하기"
                />
            </form>
        </section>
        <section className="flex gap-1.5 justify-center items-start pt-2.5 mt-1.5 w-full text-sm font-medium tracking-wide leading-6 uppercase whitespace-nowrap text-slate-500">
            <button className="flex overflow-hidden flex-col justify-center items-center rounded-lg border border-solid border-slate-500 border-opacity-50">
            <span className="overflow-hidden px-6 py-1 max-md:px-5">수정</span>
            </button>
            <button className="flex overflow-hidden flex-col justify-center items-center rounded-lg">
            <span className="overflow-hidden px-4 py-1">삭제</span>
            </button>
        </section>
      </div>
    </article>
  );
}