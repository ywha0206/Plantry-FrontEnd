import { Link } from "react-router-dom";

const HomeNotice = () => {

    


    return(
        <>
            <div className="flex items-center justify-between">
                <h2 className='text-2xl mb-10'>Notice</h2>
                <Link to={"/community/1/list"}className='relative bottom-2 flex justify-between items-center text-gray-600 border border-gray-400 rounded-lg px-3 h-[28px]'>
                    <span>전체보기</span>
                    <img className='ml-2 w-[20px] h-[20px]' src="/images/ArrowForward.png" alt="allow" />
                </Link>    
            </div>
            <ul>
                <li className='border rounded-lg flex flex-col py-2 px-5 mt-1'>
                <div className='flex justify-between'>
                    <p>이번 달 대체공휴일 공지</p>
                    <span className='text-gray-400 font-extralight'>2024.11.18</span>
                </div>
                <p className='text-right'>전체공지</p>
                </li>
                <li className='border rounded-lg flex flex-col py-2 px-5 mt-1'>
                <div className='flex justify-between'>
                    <p>이번 달 대체공휴일 공지</p>
                    <span className='text-gray-400 font-extralight'>2024.11.18</span>
                </div>
                <p className='text-right'>전체공지</p>
                </li>
                <li className='border rounded-lg flex flex-col py-2 px-5 mt-1'>
                <div className='flex justify-between'>
                    <p>이번 달 대체공휴일 공지</p>
                    <span className='text-gray-400 font-extralight'>2024.11.18</span>
                </div>
                <p className='text-right'>전체공지</p>
                </li>
            </ul>
        </>
    )
}
export default HomeNotice;