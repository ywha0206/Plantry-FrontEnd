import { Link } from "react-router-dom";

export default function MainHeader(){

    return (<>
        <header>
                <div className="headerIn">
                    <div className="headerLogo">
                        
                        <img src="/images/plantryLogo.png" alt="logo"/>
                        <Link to="/">
                        <h1>Plantry</h1>
                        </Link>
                    </div>
                    <section className="gnbWrapper">
                        <div className="gnb">
                            <li><Link to="/service">서비스</Link></li>
                            <li><Link to="/price">가격 및 혜택</Link></li>
                            <li><Link to="/faq">고객센터</Link></li>
                            <li><Link to="/user/login">로그인</Link></li>
                            <li><Link to="/user/terms">회원가입</Link></li>
                        </div>
                        <img className="profileImg" src="/images/user_face_icon.png" alt="프로필"/>

                    </section>             
                </div>
        </header>
    </>);
}