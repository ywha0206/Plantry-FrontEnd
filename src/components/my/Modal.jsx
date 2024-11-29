

export const MyModal = ({ isOpen, onClose , text }) => {
    if (!isOpen) return null;

return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 modal-custom-fixed">
      <div className="bg-white rounded-t-xl rounded-b-md shadow-lg max-w-2xl w-full modal-custom-width">
        <div className="flex justify-between items-center mb-8 py-5 px-12 bg-indigo-200 rounded-t-xl">
            <span className="text-lg text-gray-700">{text}</span>
            <button 
            onClick={onClose}
            className="text-md float-right display-block font-bold text-gray-600 hover:text-gray-900"
            >
            <img className="h-[15px]" src="/images/close-icon.png" alt="close" />
            </button>
        </div>
        <div className="modal-content mx-12">
          {text === '비밀번호 변경' &&
            <>
              <div className="alert-yeollow rounded-lg mt-10 w-full h-[50px] flex items-center px-[20px] py-10">
              보안 강화를 위해 영문, 숫자를 포함하여 8자리 이상의 비밀번호를 만드세요.
              </div>
              <input type="password" className="border w-full h-[40px] indent-3 mt-[20px]" placeholder="비밀번호를 입력해주세요." />
              <input type="password" className="border w-full h-[40px] indent-3 mt-10" placeholder="비밀번호를 다시 입력해주세요." />
              <span className="text-sm font-light ml-10 text-gray-500">비밀번호가 일치합니다.</span>
              <button className="float-right btn-profile bg-indigo-500 text-white mt-[50px] mb-[20px]">비밀번호 변경</button>
            </>
          }
          {text === '결제정보 등록' &&
            <>
              <p className='text-sm custom-mt-30'>결제 정보를 입력해주세요.</p>
              <input type="text" placeholder="카드 별명을 입력해주세요." className="input-lg mt-10"/>
              <select className="w-full input-lg mt-10">
                <option value="">신한</option>
                <option value="">국민</option>
                <option value="">현대</option>
                <option value="">카카오뱅크</option>
                <option value="">우리</option>
                <option value="">NH농협</option>
                <option value="">하나</option>
                <option value="">롯데</option>
                <option value="">삼성</option>
                <option value="">IBK기업은행</option>
                <option value="">BC</option>
              </select>
              <div className="flex items-center justify-between">
                <input type='text' placeholder="카드번호" maxLength={4} className="input-sm mt-10" ></input>
                <input type='password' maxLength={4} className="input-sm mt-10" ></input>
                <input type='password' maxLength={4} className="input-sm mt-10" ></input>
                <input type='text' maxLength={4} className="input-sm mt-10" ></input>
              </div>
              <div className='flex justify-between mt-10'>
                <input type='text' maxLength={2} placeholder='월'
                className="card-inp2 mr-2" ></input>
                <input type='text' maxLength={2} placeholder='연'
                className="card-inp2 mr-2" ></input>
                <input type='text' maxLength={3} placeholder='CVC번호'
                className="card-inp1" ></input>
              </div>
              <button className="bg-indigo-500 btn-profile text-white mt-[20px] mb-[30px] float-right">등록</button>
            </>
          }
          
        </div>
        
      </div>
    </div>
    );
};
