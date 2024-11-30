import { Link, useNavigate } from "react-router-dom";


export default function Terms() {

  const navigate = useNavigate();

    return (
      <div className='terms-container'>
        <div className='login-form'>
          <div className="flex justify-between items-start">
              <p className='text-3xl font-light'>REGISTER</p>
              <Link to="/user/login">
                <img src="/images/Logo_font.png" alt="logo" className="w-[110px] h-[35px]" />
              </Link>
          </div>
          <div className='inp-box'>
            <div>
              <p className="text-sm ml-2">
                (<span>필수</span>)
                서비스 이용약관
              </p>
              <div name="" id="" className="terms-text mt-1">이용약관</div>
              <label className="flex justify-end items-center text-sm mt-1"><input name="check" type="checkbox" className="mr-1"/>동의합니다.</label>
            </div>
            <div>
              <p className="text-sm ml-2">
                (<span>필수</span>)
                서비스 이용약관
              </p>
              <div name="" id="" className="terms-text mt-1">이용약관</div>
              <label className="flex justify-end items-center text-sm mt-1"><input name="check" type="checkbox" className="mr-1"/>동의합니다.</label>
            </div>
            <div>
              <p className="text-sm ml-2">
                (<span>필수</span>)
                서비스 이용약관
              </p>
              <div name="" id="" className="terms-text mt-1">이용약관</div>
              <label className="flex justify-end items-center text-sm mt-1"><input name="check" type="checkbox" className="mr-1"/>동의합니다.</label>
            </div>
            <div className="flex justify-between custom-mt-30">
              <button
                className="btn-prev"
                onClick={() => navigate("/user/login")}
              >
                이전
              </button>
              <button className="btn-next" onClick={() => navigate("/user/register")}>다음</button>
            </div>
          </div>
        </div>
      </div>
    )
}
