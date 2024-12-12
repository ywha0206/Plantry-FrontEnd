import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatBubbleBottomCenterTextIcon, ClockIcon, UserGroupIcon, BoltIcon } from "@heroicons/react/24/outline";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeItem, setActiveItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [isAdmin, setIsAdmin] = useState(true); // 관리자 여부 (true: 관리자, false: 일반 회원)
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 로그인 여부 (true: 로그인, false: 비로그인)
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleActive = (index) => {
    setActiveIndex(index === activeIndex ? 0 : index);
    setActiveItem(null);
  };

  const handleItemClick = (item) => {
    setActiveItem(item); // 클릭된 항목 설정
    setIsModalOpen(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
    setActiveItem(null);
  };

  const handleDelete = (item) => {
    alert(`Deleted: ${item.title}`);
    handleCloseModal();
  };

  const handleButtonClick = (buttonLabel) => {
    if (buttonLabel === "Ask a Question" && isAdmin) {
      navigate("/faq/write"); // "Ask a Question" 클릭 시 이동 (관리자만 가능)
    } else {
      alert("You do not have permission to perform this action.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    if (searchQuery.trim()) {
      // Search logic implementation
      alert(`Search query: ${searchQuery}`);
      // TODO: Implement actual search functionality
    }
  };

  const contents = [
    {
      title: "PAYMENT",
      image: "/images/paymentIcon_gray.png",
      items: [
        {
          title: "What payment methods do you accept?",
          content: "We accept various payment methods including credit cards, PayPal, bank transfers, and other major digital payment solutions.",
          author: "Admin",
          hasAnswer: true,
          reply: "All major payment methods are supported for your convenience."
        },
        {
          title: "When will my subscription payment be processed?",
          content: "Subscription payments are automatically processed on your monthly billing date.",
          author: "Admin",
          hasAnswer: true,
          reply: "Automatic billing occurs on the same date each month."
        },
        {
          title: "Can I make payments from overseas?",
          content: "Yes, we accept international payments through major credit cards and PayPal.",
          author: "Admin",
          hasAnswer: true,
          reply: "VISA, MasterCard, and other major international cards are accepted."
        },
        {
          title: "How can I get a receipt for my payment?",
          content: "You can download receipts from your account dashboard after any payment.",
          author: "Admin",
          hasAnswer: true,
          reply: "Receipts are also automatically sent to your email."
        },
        {
          title: "Are installment payments available?",
          content: "Yes, installment payments are available for purchases above certain amounts.",
          author: "Admin",
          hasAnswer: true,
          reply: "Interest-free installments vary by card issuer."
        }
      ],
      buttonLabel: "Manage Payment",
    },
    {
      title: "CANCELLATION & RETURN",
      image: "/images/return.png",
      items: [
        {
          title: "What is your refund process?",
          content: "Refunds can be requested within 7 days of purchase through your account.",
          author: "Admin",
          hasAnswer: true,
          reply: "Refund requests can be submitted through your dashboard."
        },
        {
          title: "Until when can I cancel my order?",
          content: "Orders can be cancelled any time before shipping begins.",
          author: "Admin",
          hasAnswer: true,
          reply: "Cancellation is not possible once shipping has started."
        },
        {
          title: "Are partial refunds possible?",
          content: "Yes, you can request refunds for individual items in a multiple-item order.",
          author: "Admin",
          hasAnswer: true,
          reply: "Each item can be refunded separately."
        },
        {
          title: "How long does the refund process take?",
          content: "Refunds typically process within 3-5 business days after approval.",
          author: "Admin",
          hasAnswer: true,
          reply: "Processing time may vary depending on your payment provider."
        },
        {
          title: "How do I cancel my subscription?",
          content: "Subscription cancellation must be requested before the next billing date.",
          author: "Admin",
          hasAnswer: true,
          reply: "You can cancel directly through your account settings."
        }
      ],
      buttonLabel: "Request Refund",
    },
    {
      title: "QNA",
      image: "/images/CardGiftcard.png",
      items: [
        {
          title: "How do I contact customer support?",
          content: "You can submit inquiries through our customer support portal.",
          author: "Admin",
          hasAnswer: true,
          reply: "We respond within 24 hours."
        },
        {
          title: "What is your response time for inquiries?",
          content: "We aim to respond to all inquiries within 24 hours.",
          author: "Admin",
          hasAnswer: true,
          reply: "Urgent inquiries may receive faster responses."
        },
        {
          title: "Is phone support available?",
          content: "Phone support is available on weekdays from 9 AM to 6 PM.",
          author: "Admin",
          hasAnswer: true,
          reply: "Weekend support is available through online inquiries only."
        },
        {
          title: "Where can I view my support history?",
          content: "All support interactions are available in your account dashboard.",
          author: "Admin",
          hasAnswer: true,
          reply: "Response notifications are also sent via email."
        },
        {
          title: "Can I submit anonymous inquiries?",
          content: "Login is required to submit inquiries for better support.",
          author: "Admin",
          hasAnswer: true,
          reply: "Guest inquiries are not supported."
        }
      ],
      buttonLabel: "Ask a Question",
    },
    {
      title: "PRODUCT & SERVICES",
      image: "/images/Settings.png",
      items: [
        {
          title: "What are your service hours?",
          content: "Our services are available 24/7, 365 days a year.",
          author: "Admin",
          hasAnswer: true,
          reply: "Maintenance times are announced separately."
        },
        {
          title: "Is there a free trial period?",
          content: "New users get a 7-day free trial with full access to all features.",
          author: "Admin",
          hasAnswer: true,
          reply: "You can experience all premium features during the trial."
        },
        {
          title: "When do service updates occur?",
          content: "Regular updates are scheduled for the first Tuesday of each month.",
          author: "Admin",
          hasAnswer: true,
          reply: "Emergency patches are announced separately."
        },
        {
          title: "Do you offer enterprise solutions?",
          content: "We provide customized solutions based on business size and needs.",
          author: "Admin",
          hasAnswer: true,
          reply: "Please contact our sales team for enterprise inquiries."
        },
        {
          title: "Is mobile access supported?",
          content: "Our service is available on both mobile apps and web browsers.",
          author: "Admin",
          hasAnswer: true,
          reply: "iOS and Android apps are both available."
        }
      ],
      buttonLabel: "View Services",
    },
  ];

  const filteredItems = contents[activeIndex]?.items.filter(
    (item) => isAdmin || item.hasAnswer // 관리자: 모든 질문, 일반 회원: 답변만 표시
  );

  // 각 카테고리별 write 경로와 버튼 텍스트 설정
  const categoryConfig = {
    0: {
      path: '/faq/write/payment',
      buttonText: 'Payment Inquiry'
    },
    1: {
      path: '/faq/write/cancellation',
      buttonText: 'Cancellation & Return Inquiry'
    },
    2: {
      path: '/faq/write/qna',
      buttonText: 'QNA Inquiry'
    },
    3: {
      path: '/faq/write/services',
      buttonText: 'Product & Services Inquiry'
    }
  };

  // ContactButton 컴포넌트 수정
  const ContactButton = ({ index }) => (
    <button
      onClick={() => navigate(categoryConfig[index].path)}
      className="px-6 py-3 bg-[#666bff] text-white rounded-lg text-base 
                hover:bg-[#5555ee] transition-all duration-300 
                flex items-center space-x-2 shadow-md"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      <span>{categoryConfig[index].buttonText}</span>
    </button>
  );

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen pt-[120px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="serviceInfo relative py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How can we help you?
            </h1>
            <p className="text-gray-600 mb-8">
              Find answers to frequently asked questions.<br />
              If you can't find what you're looking for, please use our 1:1 inquiry.
            </p>
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-white rounded-xl shadow-lg border border-gray-100 
                         focus:ring-2 focus:ring-[#666bff] focus:border-transparent
                         transition-all duration-300 pl-14 pr-20"
                placeholder="Search for help..."
              />
              <svg 
                className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 
                         px-4 py-2 bg-[#666bff] text-white rounded-lg
                         hover:bg-[#5555ee] transition-all duration-300"
              >
                Search
              </button>
            </form>
          </div>
        </section>

        {/* Main Content */}
        <section className="flex flex-wrap lg:flex-nowrap gap-6 my-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 bg-white p-4 rounded-lg shadow-lg">
            <ul>
              {contents.map((content, index) => (
                <li
                  key={index}
                  className={`py-3 px-4 mb-2 rounded-md cursor-pointer flex items-center transition-all duration-300 text-base ${
                    activeIndex === index
                      ? "bg-[#666bff] text-white font-bold"
                      : "hover:bg-[#666bff] hover:text-white"
                  }`}
                  onClick={() => handleActive(index)}
                >
                  <img
                    src={content.image}
                    alt="icon"
                    className={`w-6 h-6 mr-3 transition-transform duration-300 ${
                      activeIndex === index
                        ? "brightness-150"
                        : "hover:scale-105 hover:opacity-75"
                    }`}
                  />
                  <span>{content.title}</span>
                </li>
              ))}
            </ul>
          </aside>

          {/* Content Area */}
          <article className="w-full lg:w-3/4 bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {contents[activeIndex]?.title}
              </h2>
              <p className="text-gray-600">자주 묻는 질문들을 확인해보세요</p>
            </div>
            
            <ul className="space-y-4">
              {filteredItems.map((item, idx) => (
                <li
                  key={idx}
                  className="group border border-gray-100 rounded-lg hover:border-[#666bff] transition-all duration-300"
                >
                  <div
                    className="p-5 cursor-pointer flex items-center justify-between hover:bg-gray-50 rounded-lg transition-all"
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {item.hasAnswer ? (
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-500">
                            <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-500">
                            <ClockIcon className="w-5 h-5" />
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-[#666bff]">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.content.length > 100 
                            ? `${item.content.substring(0, 100)}...` 
                            : item.content}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">
                        {item.author}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        item.hasAnswer 
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {item.hasAnswer ? '답변완료' : '답변대기'}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* 버튼 영역 */}
            <div className="mt-8 flex justify-end">
              {isAdmin && (
                <ContactButton index={activeIndex} />
              )}
            </div>

            {/* 결과가 없을 때 */}
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <ChatBubbleBottomCenterTextIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">등록된 문의가 없습니다</h3>
                <p className="text-gray-500">새로운 문의를 등록해주세요</p>
              </div>
            )}
          </article>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                You still have a question?
              </h2>
              <p className="text-lg text-gray-600">
                If you cannot find a question in our FAQ, you can always contact us. We will answer you shortly!
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Phone Card */}
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#666bff]/10 rounded-full flex items-center justify-center mb-6">
                    <span className="text-3xl">📞</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    82+ (02) 1234 5678
                  </h3>
                  <p className="text-gray-600">
                    We are always happy to help!
                  </p>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#666bff]/10 rounded-full flex items-center justify-center mb-6">
                    <span className="text-3xl">✉️</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    sanghun1101088@gmail.com
                  </h3>
                  <p className="text-gray-600">
                    We are always happy to help!
                  </p>
                </div>
              </div>

              {/* Live Chat Card */}
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#666bff]/10 rounded-full flex items-center justify-center mb-6">
                    <span className="text-3xl">💬</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Live Chat
                  </h3>
                  <p className="text-gray-600">
                    Chat with our support team!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modal */}
        {isModalOpen && activeItem && (
          <div
            className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4"
            onClick={handleCloseModal}
          >
            <div
              className="bg-white rounded-2xl w-[90%] max-w-[600px] relative transform transition-all duration-300 scale-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 모달 헤더 */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">문의 상세내용</h2>
                  <button
                    onClick={handleCloseModal}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span className="flex items-center">
                    <UserGroupIcon className="w-4 h-4 mr-1" />
                    {activeItem.author}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    activeItem.hasAnswer 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {activeItem.hasAnswer ? '답변완료' : '답변대기'}
                  </span>
                </div>
              </div>

              {/* 모달 본문 */}
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">문의내용</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">{activeItem.title}</h4>
                    <p className="text-gray-600">{activeItem.content}</p>
                  </div>
                </div>

                {/* 답변 영역 */}
                {activeItem.reply && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">답변</h3>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <div className="flex items-start space-x-3">
                        <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-blue-500 mt-1" />
                        <p className="text-gray-700">{activeItem.reply}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 관리자 답변 입력 영역 */}
                {isAdmin && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      답변 작성
                      {!activeItem.reply && <span className="text-red-500 text-sm ml-2">* 필수 입력</span>}
                    </h3>
                    <div className="space-y-4">
                      <textarea
                        className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#666bff] focus:border-transparent transition-all duration-200 min-h-[120px] resize-none"
                        placeholder="답변을 입력해주세요..."
                        value={activeItem.reply || ""}
                        onChange={(e) => setActiveItem(prev => ({...prev, reply: e.target.value}))}
                      />
                      
                      <div className="flex justify-end space-x-3">
                        <button
                          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                          onClick={handleCloseModal}
                        >
                          취소
                        </button>
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                          onClick={() => handleDelete(activeItem)}
                        >
                          삭제
                        </button>
                        <button
                          className="px-4 py-2 bg-[#666bff] text-white rounded-lg hover:bg-[#5555ee] transition-colors duration-200"
                          onClick={() => {
                            alert("답변이 저장되었습니다.");
                            handleCloseModal();
                          }}
                        >
                          답변 저장
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
