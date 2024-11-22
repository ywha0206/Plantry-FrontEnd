
export default function Service(){


    return (<>
            <div className="mainIn"> 
              <section className="serviceInfo relative main-bg">
                    {/* <img className="h-full w-full " src="/images/rending_background.png" alt="topbg"/> */}
                    <div className="up">
                        <div className="h2Wrapper">
                            <h2 className="absolute">
                                Hello, how can we help?
                            </h2>
                            <p className="absolute">or choose a category to quickly find the help you need</p>
                        </div>
                        <img className="absolute" src="images/search-icon.png" alt="돋보기" />
                        <div className="topinput absolute">
                            <input type="text"  className="absolute" placeholder="Ask a question...."/>
                        </div>
                    </div>
                </section>
                <section className="popularLink bg-white h-[462px] m-[2px]" >
                    <div className="w-full text-center py-[20px] text-3xl/[30px] leading-9">Popular Article</div>
                    <article className="flex justify-center	">
                        <div className="w-[360px] h-[360px] border mr-[100px] text-center">
                            <div className="flex flex-col my-auto items-center justify-center h-[400px]">
                                <img  className="mx-auto my-[20px] mt-[20px]" src="images/Union.png" alt="우주선" />
                                <span className="mt-[20px]">Getting Started</span>
                                <span className="mt-[5px]">Plantry 이용해보기</span>
                                <button className="serviceButton">READ MORE</button>

                            </div>
                            
                        </div>
                        <div className="w-[360px] h-[360px] border mr-[100px] text-center">
                            <div className="flex flex-col my-auto items-center justify-center h-[400px]">
                                <img  className="mx-auto my-[20px] mt-[20px]" src="images/Union.png" alt="우주선" />
                                <span className="mt-[20px]">Getting Started</span>
                                <span className="mt-[5px]">Plantry 이용해보기</span>
                                <button className="serviceButton">READ MORE</button>

                            </div>
                            
                        </div>
                        <div className="w-[360px] h-[360px] border  text-center">
                            <div className="flex flex-col my-auto items-center justify-center h-[400px]">
                                <img  className="mx-auto my-[20px] mt-[20px]" src="images/Union.png" alt="우주선" />
                                <span className="mt-[20px]">Getting Started</span>
                                <span className="mt-[5px]">Plantry 이용해보기</span>
                                <button className="serviceButton">READ MORE</button>

                            </div>             
                        </div>
                    </article>
                </section>

                <section className="knowledge mx-auto my-10 pb-[40px]">
                    <h1 className="text-center text-gray-700 text-2xl font-semibold pt-[80px] mb-[25px]">Knowledge Base</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                       
                        <div className="bg-white rounded-lg shadow-md p-5 m-4">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
                                <span className="text-green-500 mr-2">📗</span> Getting Started
                            </h2>
                            <ul className="text-blue-500 space-y-2">
                                <li><a href="#">Account</a></li>
                                <li><a href="#">Authentication</a></li>
                                <li><a href="#">Billing</a></li>
                            </ul>
                            <p className="text-sm text-gray-500 mt-4">14 Articles</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-5 m-4">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
                                <span className="text-blue-500 mr-2">📦</span> Orders
                            </h2>
                            <ul className="text-blue-500 space-y-2">
                                <li><a href="#">Processing orders</a></li>
                                <li><a href="#">Payments</a></li>
                                <li><a href="#">Returns, Refunds and Replacements</a></li>
                            </ul>
                            <p className="text-sm text-gray-500 mt-4">13 Articles</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-5 m-4">
                        <h2 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
                            <span className="text-purple-500 mr-2">🔒</span> Safety and security
                        </h2>
                        <ul className="text-blue-500 space-y-2">
                            <li><a href="#">Security and hacked accounts</a></li>
                            <li><a href="#">Privacy</a></li>
                            <li><a href="#">Spam and fake accounts</a></li>
                        </ul>
                        <p className="text-sm text-gray-500 mt-4">9 Articles</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-5 m-4">
                        <h2 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
                            <span className="text-orange-500 mr-2">📜</span> Rules and policies
                        </h2>
                        <ul className="text-blue-500 space-y-2">
                            <li><a href="#">General</a></li>
                            <li><a href="#">Intellectual property</a></li>
                            <li><a href="#">Guidelines for law enforcement</a></li>
                        </ul>
                        <p className="text-sm text-gray-500 mt-4">14 Articles</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-5 m-4">
                        <h2 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
                            <span className="text-yellow-500 mr-2">💬</span> Chats
                        </h2>
                        <ul className="text-blue-500 space-y-2">
                            <li><a href="#">General</a></li>
                            <li><a href="#">Features</a></li>
                            <li><a href="#">Encryption</a></li>
                        </ul>
                        <p className="text-sm text-gray-500 mt-4">14 Articles</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-5 m-4">
                        <h2 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
                            <span className="text-blue-500 mr-2">🔗</span> Connections
                        </h2>
                        <ul className="text-blue-500 space-y-2">
                            <li><a href="#">Conversations</a></li>
                            <li><a href="#">Jobs</a></li>
                            <li><a href="#">People</a></li>
                        </ul>
                        <p className="text-sm text-gray-500 mt-4">14 Articles</p>
                        </div>
                    </div>
                </section>


            </div>
    
    </>);
}