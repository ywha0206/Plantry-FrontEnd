import { useEffect, useState } from "react";
import axiosInstance from "../../services/axios";

const DeleteAccount = () => {
    
    const [deactive , setDeactive] = useState(0);
    const handleCheckboxChange = (event) => {
        setDeactive(event.target.checked ? 1 : 0); // 체크 상태에 따라 값 설정
    };
    const [pass, setPass] = useState('')
    const [successPass, setSuccessPass] = useState(true)
    const [message, setMessage] = useState({message:'', type: ''});


    const changePass = (e) => {
        setPass(e.target.value)
        if(pass !== null){
            setMessage({message: '', type: ''})
        }
    }
    const confirmPass = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify(pass));
        if(pass === null || pass === '' ){
            setMessage({message: '비밀번호를 입력해 주세요.',type: 'warning'} )
            return;
        }
        try{
            const resp = await axiosInstance.post('/api/my/confirmPass', {pwd: pass});
            console.log(resp.data+resp.status+" 비밀번호 결과");
            if(resp.status == 200){
                setMessage({
                    message: `비밀번호 확인이 완료되었습니다.\n계속 진행하시려면 비활성화 버튼을 눌러주세요.`,
                    type: 'success'
                })
                setSuccessPass(false);
            }
          }catch(err){
            console.log(err)
            setMessage({
                message: `비밀번호가 맞지 않습니다.`,
                type: 'warning'
            })
          }
    }
    const deleteAccountHandler = async (e) => {
        e.preventDefault();
        try{
            const resp = await axiosInstance.get('/api/my/deleteAccount');
            console.log('계정 비활성화 결과 '+resp)
            if(resp.status === 200){

                alert(`비활성화가 완료되었습니다.\n지금까지 PLANTRY를 이용해 주셔서 감사합니다.`)
            }
        }catch(err){
            console.log('비활성화 실패');
        }
    }

    return(
        <>
        <h2 className='sub-title text-lg'>Delete Account</h2>
        <div className='flex flex-col justify-start h-full'>
            <label><input type="checkbox" className='mt-[30px] mr-10' onChange={handleCheckboxChange}/> 계정을 비활성화하고 싶습니다.</label>
            {deactive===1&& 
            <div className='mt-10'>
                {message.message && 
                    <div className={`rounded-lg text-sm px-6 py-3 ${message.type==='warning'? 'bg-[#FFF6E5] text-[#E8B041]':'bg-gray-100 text-gray-700'}`}
                    style={{ whiteSpace: "pre-wrap" }}
                    >{message.message}</div>
                }
                <div className='flex items-center input-lg rounded-lg justify-between mt-2'>
                    <input onChange={changePass} value={pass}
                    type="password" className='mr-10 indent-4'/>
                    <button onClick={confirmPass} 
                    className={`btn-delete text-white mr-1
                    ${successPass===false? 'bg-indigo-400':'bg-indigo-500 hover:bg-indigo-600'}
                    `} >확인</button>
                </div>
                <span className='text-xs text-center w-[50px] ml-10'>먼저 비밀번호를 확인하셔야 합니다.</span>
            </div>
            }
        </div>
        <button 
        className={`btn-profile border text-gray-500 w-full ${successPass===false?'hover:bg-gray-100':''}`}
        onClick={deleteAccountHandler}
        disabled={successPass}
        >계정 비활성화</button>
    
        </>
    )
}
export default DeleteAccount;