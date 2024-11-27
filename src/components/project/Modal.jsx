

export const AddProjectModal = ({ isOpen, onClose , text }) => {
    if (!isOpen) return null;

return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 modal-custom-fixed">
      <div className="bg-white rounded-t-xl rounded-b-md shadow-lg max-w-3xl w-full modal-custom-width">
        <div className="flex justify-end items-center py-5 px-12 rounded-t-xl">
            <button 
            onClick={onClose}
            className="text-md float-right display-block font-bold text-gray-600 hover:text-gray-900"
            >
            <img className="h-[15px]" src="/images/close-icon.png" alt="close" />
            </button>
        </div>
        <div className="modal-content mx-12 flex flex-col items-center">
          {text === '프로젝트 생성' &&
            <>
                <p className="text-xl">새 프로젝트를 만드시겠어요?</p>
                <span className="text-sm font-light text-gray-500 mt-10">도와드릴테니 같이 만들어봐요!</span>
                <div className="w-full flex flex-col mt-10">
                    <span className="bg-white text-gray-500 text-xs relative top-2 w-[65px] ml-10 px-1">프로젝트 명</span>
                    <input type="text" className="border rounded h-[45px] indent-4" value="새 프로젝트(1)" />
                </div>
                <div className="flex w-full">
                    <div className="w-2/5 flex flex-col">
                        <span className="bg-white text-gray-500 text-xs relative top-2 w-[75px] ml-10 px-1">프로젝트 형태</span>
                        <select type="text" className="border rounded h-[60px] indent-4 mr-2">
                            <option value="">부서 내부 프로젝트</option>
                            <option value="">개발 프로젝트</option>
                            <option value="">디자인 프로젝트</option>
                            <option value="">어쩌구 프로젝트</option>
                            <option value="">저쩌구 프로젝트</option>
                        </select>
                    </div>
                    <div className="w-3/5 flex flex-col">
                        <span className="bg-white text-gray-500 text-xs relative top-2 w-[60px] ml-10 px-1">공동작업자</span>
                        <input type="text" className="border rounded h-[60px] indent-4" value="새 프로젝트(1)" />
                    </div>
                </div>
                <ul className="border rounded-lg w-full h-[300px] mt-10 px-4 py-3 overflow-y-scroll">
                    <li className="bg-indigo-50 rounded-3xl px-3 py-3 flex mt-2">
                        <img src="/images/document-folder-profile.png" alt="user-img" className="w-[45px] h-[45px]" />
                        <div className="ml-10 flex flex-col">
                            <p className="font-light">박연화</p>
                            <span className="font-light text-gray-500 text-sm">ppsdd123@gmail.com</span>
                        </div>
                    </li>
                    <li className="bg-indigo-50 rounded-3xl px-3 py-3 flex mt-2">
                        <img src="/images/document-folder-profile.png" alt="user-img" className="w-[45px] h-[45px]" />
                        <div className="ml-10 flex flex-col">
                            <p className="font-light">박연화</p>
                            <span className="font-light text-gray-500 text-sm">ppsdd123@gmail.com</span>
                        </div>
                    </li>
                    <li className="bg-gray-100 rounded-3xl px-3 py-3 flex mt-2">
                        <img src="/images/document-folder-profile.png" alt="user-img" className="w-[45px] h-[45px]" />
                        <div className="ml-10 flex flex-col">
                            <p className="font-light">박연화</p>
                            <span className="font-light text-gray-500 text-sm">ppsdd123@gmail.com</span>
                        </div>
                    </li>
                    <li className="bg-gray-100 rounded-3xl px-3 py-3 flex mt-2">
                        <img src="/images/document-folder-profile.png" alt="user-img" className="w-[45px] h-[45px]" />
                        <div className="ml-10 flex flex-col">
                            <p className="font-light">박연화</p>
                            <span className="font-light text-gray-500 text-sm">ppsdd123@gmail.com</span>
                        </div>
                    </li>
                </ul>
                <div className="flex justify-between w-full">
                    <span className="flex items-center text-xs text-gray-500"><img src="/images/people-icon.png" alt="public" className="mr-1" />프로젝트 공개설정 : 누구나</span>
                    <span className="flex items-center text-xs text-gray-500"><img src="/images/Link-icon.png" alt="copy" className="mr-1" />공유 링크 복사</span>
                </div>
                <button className="h-[40px] bg-indigo-400 px-8 text-white rounded-lg mt-10 mb-[30px]">생성하기</button>
            </>
          }
            {text === '작업자 추가' &&
                <>
                    <p className="text-xl">작업자 추가</p>
                    <span className="text-sm font-light text-gray-500 mt-10">함께 작업할 사용자를 찾아보세요!</span>
                    <div className="w-full flex flex-col mt-10">
                        <span className="bg-white text-gray-500 text-xs relative top-2 w-[60px] ml-10 px-1">공동작업자</span>
                        <input type="text" className="border rounded h-[60px] indent-4"  />
                    </div>
                    
                    <ul className="border rounded-lg w-full h-[400px] mt-10 px-4 py-3 overflow-y-scroll">
                        <li className="bg-indigo-50 rounded-3xl px-3 py-3 flex mt-2">
                            <img src="/images/document-folder-profile.png" alt="user-img" className="w-[45px] h-[45px]" />
                            <div className="ml-10 flex flex-col">
                                <p className="font-light">박연화</p>
                                <span className="font-light text-gray-500 text-sm">ppsdd123@gmail.com</span>
                            </div>
                        </li>
                        <li className="bg-indigo-50 rounded-3xl px-3 py-3 flex mt-2">
                            <img src="/images/document-folder-profile.png" alt="user-img" className="w-[45px] h-[45px]" />
                            <div className="ml-10 flex flex-col">
                                <p className="font-light">박연화</p>
                                <span className="font-light text-gray-500 text-sm">ppsdd123@gmail.com</span>
                            </div>
                        </li>
                        <li className="bg-gray-100 rounded-3xl px-3 py-3 flex mt-2">
                            <img src="/images/document-folder-profile.png" alt="user-img" className="w-[45px] h-[45px]" />
                            <div className="ml-10 flex flex-col">
                                <p className="font-light">박연화</p>
                                <span className="font-light text-gray-500 text-sm">ppsdd123@gmail.com</span>
                            </div>
                        </li>
                        <li className="bg-gray-100 rounded-3xl px-3 py-3 flex mt-2">
                            <img src="/images/document-folder-profile.png" alt="user-img" className="w-[45px] h-[45px]" />
                            <div className="ml-10 flex flex-col">
                                <p className="font-light">박연화</p>
                                <span className="font-light text-gray-500 text-sm">ppsdd123@gmail.com</span>
                            </div>
                        </li>
                    </ul>
                    <div className="flex justify-between w-full">
                        <span className="flex items-center text-xs text-gray-500"><img src="/images/people-icon.png" alt="public" className="mr-1" />프로젝트 공개설정 : 누구나</span>
                        <span className="flex items-center text-xs text-gray-500"><img src="/images/Link-icon.png" alt="copy" className="mr-1" />공유 링크 복사</span>
                    </div>
                    <button className="h-[40px] bg-indigo-400 px-8 text-white rounded-lg mt-10 mb-[30px]">초대하기</button>
                </>
            }
        </div>
        
      </div>
    </div>
    );
};
