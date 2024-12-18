import { useState } from "react";

const HomeProject = () => {

    const [progress, setProgress] = useState(80);
    
    return (
        <>
            <div className='w-full h-full flex justify-around'>
                <div className='home-project'>
                    <span className='text-sm text-gray-400 font-extralight flex justify-end'>Nov.18.2024</span>
                    <h2 className='text-xl'>프로젝트1</h2>
                    <div className='mt-[20px]'>
                    <div className='project-inbox'>
                        <p className='project-title'>프로젝트 세부내역</p>
                        <p className='project-content'>상세설명</p>
                    </div>
                    <div className='project-inbox'>
                        <p className='project-title'>프로젝트 세부내역</p>
                        <p className='project-content'>상세설명</p>
                    </div>
                    <div className='project-inbox'>
                        <p className='project-title'>프로젝트 세부내역</p>
                        <p className='project-content'>상세설명</p>
                    </div>
                    </div>
                    <div className='flex justify-end text-sm text-gray-700 text-extralight'> 80%</div>
                    <div className="progress-bar">
                    <div className="progress-fill" style={{width: `${progress}%`}}></div>
                    </div>
                </div>
                <div className='home-project'>
                    <span className='text-sm text-gray-400 font-extralight flex justify-end'>Nov.18.2024</span>
                    <h2 className='text-xl'>프로젝트1</h2>
                    <div className='mt-[20px]'>
                    <div className='project-inbox'>
                        <p className='project-title'>프로젝트 세부내역</p>
                        <p className='project-content'>상세설명</p>
                    </div>
                    <div className='project-inbox'>
                        <p className='project-title'>프로젝트 세부내역</p>
                        <p className='project-content'>상세설명</p>
                    </div>
                    <div className='project-inbox'>
                        <p className='project-title'>프로젝트 세부내역</p>
                        <p className='project-content'>상세설명</p>
                    </div>
                    </div>
                    <div className='flex justify-end text-sm text-gray-700 text-extralight'> 80%</div>
                    <div className="progress-bar">
                    <div className="progress-fill" style={{width: `${progress}%`}}></div>
                    </div>
                </div>
                <div className='home-project'>
                    <span className='text-sm text-gray-400 font-extralight flex justify-end'>Nov.18.2024</span>
                    <h2 className='text-xl'>프로젝트1</h2>
                    <div className='mt-[20px]'>
                    <div className='project-inbox'>
                        <p className='project-title'>프로젝트 세부내역</p>
                        <p className='project-content'>상세설명</p>
                    </div>
                    <div className='project-inbox'>
                        <p className='project-title'>프로젝트 세부내역</p>
                        <p className='project-content'>상세설명</p>
                    </div>
                    <div className='project-inbox'>
                        <p className='project-title'>프로젝트 세부내역</p>
                        <p className='project-content'>상세설명</p>
                    </div>
                    </div>
                    <div className='flex justify-end text-sm text-gray-700 text-extralight'> 80%</div>
                    <div className="progress-bar">
                    <div className="progress-fill" style={{width: `${progress}%`}}></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeProject;