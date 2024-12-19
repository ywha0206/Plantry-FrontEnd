import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import '@/pages/my/My.scss'
import { Link, useNavigate } from 'react-router-dom'
import { MyModal } from '@/components/my/Modal';
import axiosInstance from '@/services/axios.jsx'
import CustomAlert from '../../components/Alert';
import useUserStore from '../../store/useUserStore';
import { PassModal } from '../../components/my/PassModal';
import DeleteAccount from '../../components/my/DeleteAccount';
import MySocial from '../../components/my/MySocial';
import MyProfile from '../../components/my/MyProfile';



export default function MyModify() {
    const navigate = useNavigate();
    const user = useUserStore((state) => state.user);

    const [alertClass, setAlertClass] = useState("");
    const [alert, setAlert] = useState({ message: '', type: '', isOpen: false, onClose: false });

    const closeAlert = () => {
        setAlert({ message: '', type: '', isOpen: false, onClose: false });
    };
    useEffect(() => {
        if (alert.isOpen) {
            let timer = setTimeout(() => {
                setAlertClass("fade-out"); // fade-out 클래스 추가
                setTimeout(() => {
                    setAlert({ message: '', type: '', isOpen: false, onClose: false });
                }, 300); // 애니메이션 후 alert 닫기
            }, 500); // 3초 뒤 애니메이션 시작

            return () => clearTimeout(timer); // 타이머 정리
        }
    }, [alert.isOpen]);
    const showAlert = (message, type = 'success') => {
        setAlert({
            message,
            type,
            isOpen: true,
            onClose: false,
        });
        setAlertClass(''); // fade-out 클래스 제거
    };
    
    const [pass, setPass] = useState(false);
    const showMoreRef = useRef();
    const modifyPass = (event) => {
        event.preventDefault();
        setPass(true);
    }
    const passClose = () => {
        setPass(false)
    }

    const getUserAPI = async () => {
        if (!user?.uid) {
        throw new Error("유저 정보가 없습니다.");
        }
        const resp = await axiosInstance.get('/api/my/user');
        console.log("유저 데이터 조회 "+JSON.stringify(resp.data));
        return resp.data;
    }
    const { data: userData, isError: userError, isLoading: userLoading } = useQuery({
        queryKey: [`${user.uid}`],
        queryFn: getUserAPI,
        enabled: !!user?.uid,
    })

    const cancelHandler = (event) => {
        event.preventDefault();
        navigate("/my")
    }
   
    const [email, setEmail] = useState({ emailAddr: "", emailDomain: "" });
    const [hp, setHp] = useState({ hp1: "", hp2: "", hp3: "" });
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        hp: '',
        addr1: '',
        addr2: '',
        country: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,  // 기존 상태 유지
            [name]: value, // 입력값 업데이트
        }));
    };
    const hpHandler = (e) => {
        const { name, value } = e.target;
        setHp((prevHp) => {
            const updatedHp = { ...prevHp, [name]: value };
            setUserInfo((prevUserInfo) => ({
                ...prevUserInfo,
                hp: `${updatedHp.hp1}-${updatedHp.hp2}-${updatedHp.hp3}`, // 최신 병합된 hp 값
            }));
            return updatedHp;
        });
    };
    const emailHandler = (e) => {
        const { name, value } = e.target;
        setEmail((prevEmail) => {
            const updatedEmail = { ...prevEmail, [name]: value };
            setUserInfo((prevUserInfo) => ({
                ...prevUserInfo,
                email: `${updatedEmail.emailAddr}${updatedEmail.emailDomain}`, // 최신 병합된 email 값
            }));
            return updatedEmail;
        });
    };
    
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("보낼 데이터: ", JSON.stringify(userInfo)); // 이미 최신 데이터
        try{
            const resp = await axiosInstance.post('/api/my/modify',userInfo);
            console.log("회원수정 api 결과 "+resp.status);
            setAlert({message: '회원 정보가 수정되었습니다.', isOpen: true, type:'success', onClose: false})
        }catch(err){
            console.error(err);
            setAlert({message: '수정 중 오류가 발생했습니다. 다시 시도해주세요.', isOpen: true, type:'success', onClose: false})
        }

    };

    useEffect(() => {
        if (userData) {
            const [hp1, hp2, hp3] = userData.hp.split("-");
            const [emailAddr, emailDomain] = userData.email.split("@");
            setHp({ hp1, hp2, hp3 }); // 전화번호 부분 초기화
            setEmail({emailAddr: emailAddr, emailDomain: `@${emailDomain}`});
            setUserInfo({
                name: userData?.name || "",
                email: userData?.email || "",
                hp: userData?.hp || "",
                addr1: userData?.addr1 || "",
                addr2: userData?.addr2 || "",
                country: userData?.country || "",
            });
        }
    }, [userData]);
    

  return <>
    <div id='my-modify-container'>
        <section className='my-modify1 border'>
            <div className={`alert-container ${alertClass}`}>
                <CustomAlert
                    type={alert.type}
                    message={alert.message}
                    isOpen={alert.isOpen}
                    onClose={closeAlert}
                />
            </div>
            {/* <h2 className='text-2xl font-light'>My profile</h2> */}
            <form className='my-modify-form'>
                {userLoading ? (
                    <p>로딩 중...</p>
                ) : userError ? (
                    <p>데이터를 불러오는 데 실패했습니다.</p>
                ) : (<>
                    <MyProfile
                        userData = {userData}
                    />
                    <table className='w-full'>
                        <tbody>
                            <tr>
                                <td className='flex mt-10'>
                                    <div className='flex flex-col w-full'>
                                        <span className='text-xs bg-white relative top-2 text-center w-[29px] text-gray-500 ml-10'>이름</span>
                                        <input type="text" className='my-modify-input'
                                        name='name'
                                        onChange={handleInputChange}
                                        value={userInfo.name || ''}
                                        />
                                    </div>
                                    {/* <div className='flex flex-col w-1/2'>
                                        <span className='text-xs bg-white relative top-2 border text-center w-[50px] text-gray-500 ml-10'>이름</span>
                                        <input type="text" className='border my-modify-input'
                                        value={userData?.name || ''}
                                        />
                                    </div> */}
                                </td>
                            </tr>
                            <tr>
                                <td className='flex mt-10'>
                                    <div className='flex flex-col w-full'>
                                        <span className='text-xs bg-white relative top-2 text-center w-[45px] text-gray-500 ml-10'>이메일</span>
                                        <div className='flex '>
                                            <input type="text" className='my-modify-input w-1/2'
                                            value={email.emailAddr || ''} name='emailAddr'
                                            onChange={emailHandler}
                                            />
                                            {/* <span className='h-full text-gray-500 text-2xl mr-10'>@</span>                             */}
                                            <select 
                                                value={email.emailDomain || ''}
                                                onChange={emailHandler} name='emailDomain'
                                                className='my-modify-select text-gray-700 w-1/2'>
                                                <option className='text-gray-500' value="">직접 입력</option>
                                                <option className='text-gray-500' value="@naver.com">@ naver.com</option>
                                                <option className='text-gray-500' value="@gmail.com">@ gmail.com</option>
                                                <option className='text-gray-500' value="@daum.net">@ daum.net</option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className='flex mt-10'>
                                    <div className='flex flex-col w-full'>
                                        <span className='text-xs bg-white relative top-2 text-center w-[50px] text-gray-500 ml-10'>전화번호</span>
                                        <div className='flex items-center'>
                                        <input
                                            type="text"
                                            className="border w-full my-modify-input"
                                            name="hp1"
                                            value={hp.hp1 || ''}
                                            onChange={hpHandler}
                                            maxLength={3}
                                        />
                                        <span className="mr-10">-</span>
                                        <input
                                            type="text"
                                            className="border w-full my-modify-input"
                                            name="hp2"
                                            value={hp.hp2 || ''}
                                            onChange={hpHandler}
                                            maxLength={4}
                                        />
                                        <span className="mr-10">-</span>
                                        <input
                                            type="text"
                                            className="border w-full my-modify-input"
                                            name="hp3"
                                            value={hp.hp3 || ''}
                                            onChange={hpHandler}
                                            maxLength={4}
                                        />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className='flex mt-10'>
                                    <div className='flex flex-col w-1/2'>
                                        <span className='text-xs bg-white relative top-2 text-center w-[43px] text-gray-500 ml-10'>주소지</span>
                                        <input type="text" className='border my-modify-input' 
                                         onChange={handleInputChange} name='addr1'
                                        value={userInfo?.addr1 || ''}/>
                                    </div>
                                    <div className='flex flex-col w-1/2'>
                                        <span className='text-xs bg-white relative top-2 text-center w-[50px] text-gray-500 ml-10'>상세주소</span>
                                        <input type="text" className='border my-modify-input'
                                         onChange={handleInputChange} name='addr2'
                                        value={userInfo?.addr2 || ''} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className='flex mt-10'>
                                    <div className='flex flex-col w-full'>
                                        <span className='text-xs bg-white relative top-2 text-center w-[28px] text-gray-500 ml-10'>국가</span>
                                        <select name="country" className=" my-modify-input text-gray-700"
                                         value={userInfo.country} onChange={handleInputChange} >
                                            <option name="country" value="NotSelected" selected>선택 안 함</option>
                                            <option name="country" value="SouthKorea">대한민국</option>
                                            <option name="country" value="USA">미국</option>
                                            <option name="country" value="China">중국</option>
                                            <option name="country" value="Jepan">일본</option>
                                            <option name="country" value="Taiwan">대만</option>
                                            <option name="country" value="France">프랑스</option>
                                            <option name="country" value="UK">영국</option>
                                            <option name="country" value="Ghana">가나</option>
                                            <option name="country" value="Philippines">필리핀</option>
                                            <option name="country" value="Canada">캐나다</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='flex float-right mt-[50px]'>
                        <button onClick={modifyPass} className='btn-profile border border-indigo-500 hover:bg-indigo-50 text-indigo-700 mr-10'>비밀번호 수정</button>
                        <button onClick={submitHandler} className='btn-profile bg-indigo-500 hover:bg-indigo-600 text-white mr-10'>마이프로필 수정</button>
                        <button className='btn-profile border text-gray-500 hover:bg-gray-100' onClick={cancelHandler}>취소</button>
                    </div>
                </>)}
            </form>
        </section>
        <section className='my-modify2'>
            <article className='my-del-account flex flex-col justify-between border'>
                <DeleteAccount/>
            </article>
            <article className='my-social border'>
                <MySocial/>
            </article>
            <div className='pass-modal'>
                <PassModal
                    isOpen={pass}
                    onClose={passClose}
                    text="비밀번호 변경"
                    showMoreRef={showMoreRef}
                />
            </div>

        </section>
    </div>
  </>
};