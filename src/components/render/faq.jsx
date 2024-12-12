import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeItem, setActiveItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [isAdmin, setIsAdmin] = useState(true); // 관리자 여부 (true: 관리자, false: 일반 회원)
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 로그인 여부 (true: 로그인, false: 비로그인)
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

  const contents = [
    {
      title: "PAYMENT",
      image: "/images/paymentIcon_gray.png",
      items: [
        {
          title: "Does my subscription automatically renew?",
          content:
            "Yes, your subscription will automatically renew unless you cancel it before the renewal date.",
          author: "John Doe",
          hasAnswer: true,
          reply: "Your subscription renews every month.",
        },
        {
          title: "Can I store the item on an intranet so everyone has access?",
          content:
            "No, items cannot be stored on an intranet. Each user needs to purchase their own license.",
          author: "Jane Smith",
          hasAnswer: true,
          reply: "Each user must purchase their own license.",
        },
      ],
      buttonLabel: "Manage Payment",
    },
    {
      title: "CANCELLATION & RETURN",
      image: "/images/return.png",
      items: [
        {
          title: "What is the refund policy?",
          content:
            "You can request a refund within 30 days of purchase. Refunds are subject to approval.",
          author: "Alice Brown",
          hasAnswer: true,
          reply: "Refunds are processed within 7 days.",
        },
        {
          title: "How do I cancel an order?",
          content:
            "To cancel an order, please go to your order history and click 'Cancel Order'.",
          author: "Charlie Green",
          hasAnswer: true,
          reply: "Visit your order history to cancel orders.",
        },
      ],
      buttonLabel: "Request Refund",
    },
    {
      title: "QNA",
      image: "/images/CardGiftcard.png",
      items: [
        {
          title: "Where can I find FAQs?",
          content:
            "FAQs can be found on our website under the 'Help Center' section.",
          author: "Sarah Lee",
          hasAnswer: true,
          reply: "FAQs are available under the 'Help Center'.",
        },
        {
          title: "How do I ask a question?",
          content:
            "You can ask a question by clicking 'Ask a Question' and submitting your query.",
          author: "Michael Brown",
          hasAnswer: false,
        },
      ],
      buttonLabel: "Ask a Question",
    },
    {
      title: "PRODUCT & SERVICES",
      image: "/images/Settings.png",
      items: [
        {
          title: "What services do you offer?",
          content:
            "We offer a variety of services including consulting, product customization, and technical support.",
          author: "David Wilson",
          hasAnswer: true,
          reply: "We offer consulting and customization services.",
        },
        {
          title: "Are there any discounts available?",
          content:
            "Yes, discounts are available during promotional periods. Check our website for updates.",
          author: "Emily Davis",
          hasAnswer: false,
        },
      ],
      buttonLabel: "View Services",
    },
  ];

  const filteredItems = contents[activeIndex]?.items.filter(
    (item) => isAdmin || item.hasAnswer // 관리자: 모든 질문, 일반 회원: 답변만 표시
  );

  return (
    <>
      <div className="mainIn bg-white min-h-screen">
        <section className="serviceInfo relative bg-white">
          <div className="up">
            <div className="h2Wrapper">
              <h2 className="absolute">Hello, how can we help?</h2>
              <p className="absolute">
                or choose a category to quickly find the help you need
              </p>
            </div>
            <img
              className="absolute"
              src="/images/search-icon.png"
              alt="돋보기"
            />
            <div className="topinput absolute">
              <input
                type="text"
                className="absolute"
                placeholder="Ask a question...."
              />
            </div>
          </div>
        </section>
        <div className="mainIn bg-gray-100 flex justify-center">
  <section className="w-full max-w-screen-2xl flex flex-wrap lg:flex-nowrap mt-4 mb-4">
    {/* 사이드바 */}
    <aside className="w-full lg:w-1/5 bg-white p-4 rounded-lg shadow-lg">
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

    {/* 콘텐츠 영역 */}
    <article className="w-full lg:w-4/5 bg-white rounded-lg shadow-lg p-6 ml-6">
      <ul className="space-y-3">
        {filteredItems.map((item, idx) => (
          <li
            key={idx}
            className="py-3 px-5 border-b text-base cursor-pointer hover:bg-gray-50 transition"
            onClick={() => handleItemClick(item)}
          >
            <span className="text-gray-800">{item.title}</span>
          </li>
        ))}
      </ul>
      <div className="text-center mt-4">
        {isAdmin && (
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-lg text-base hover:bg-blue-400"
            onClick={() =>
              handleButtonClick(contents[activeIndex]?.buttonLabel)
            }
          >
            {contents[activeIndex]?.buttonLabel}
          </button>
        )}
      </div>
    </article>
  </section>
</div>

        {/* 이메일/연락처 섹션 */}
        <section className="question flex flex-col text-center bg-white">
          <span className="text-[24px] font-bold text-gray-800 transition-all duration-300 hover:text-[#666bff]">
            You still have a question?
          </span>
          <p className="qp mt-[10px] text-gray-600 transition-all duration-300 hover:text-[#7d84ff] hover:font-semibold">
            If you cannot find a question in our FAQ, you can always contact us.
            We will answer you shortly!
          </p>
          <article className="flex flex-wrap justify-center items-center mt-[40px] space-y-4 lg:space-y-0">
        {/* 전화번호 카드 */}
        <div className="w-full lg:w-[384px] h-[180px] text-center flex flex-col items-center shadow-lg bg-white rounded-lg p-4 text-gray-800 transition-all duration-300 hover:bg-gradient-to-br hover:from-[#666bff] hover:to-[#7d84ff] hover:text-white">
          <div className="w-[50px] h-[50px] flex justify-center items-center rounded-full bg-white text-[#666bff] mb-3 shadow-md transition-all duration-300 hover:text-white">
            <img
              src="/images/phoneIcon.png"
              alt="phone"
              className="w-[28px] h-[28px]"
            />
          </div>
          <span className="text-lg font-semibold transition-all duration-300 hover:text-white">
            82+ (010) 2548 2568
          </span>
          <p className="text-sm mt-2 transition-all duration-300 hover:text-white">
            We are always happy to help!
          </p>
        </div>

        {/* 이메일 카드 */}
        <div className="w-full lg:w-[384px] h-[180px] text-center flex flex-col items-center shadow-lg bg-white rounded-lg p-4 text-gray-800 transition-all duration-300 hover:bg-gradient-to-br hover:from-[#666bff] hover:to-[#7d84ff] hover:text-white">
          <div className="w-[50px] h-[50px] flex justify-center items-center rounded-full bg-white text-[#666bff] mb-3 shadow-md transition-all duration-300 hover:text-white">
            <img
              src="/images/LetterIcon.png"
              alt="mail"
              className="w-[28px] h-[28px]"
            />
          </div>
          <span className="text-lg font-semibold transition-all duration-300 hover:text-white">
            sanghun1101088@gmail.com
          </span>
          <p className="text-sm mt-2 transition-all duration-300 hover:text-white">
            We are always happy to help!
          </p>
        </div>
      </article>
    </section>

        {/* 모달 창 */}
        {isModalOpen && activeItem && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={handleCloseModal}
          >
            <div
              className="bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-[600px] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-6">
                <img
                  src="/images/plantryLogo.png"
                  alt="Plantry Logo"
                  className="w-24 h-auto"
                />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-800 text-center mb-4">
                Inquiry Details
              </h2>
              <div
                className="bg-gray-100 p-4 rounded-md shadow-inner"
                style={{
                  background:
                    "url('/images/rending_background.png') no-repeat center",
                  backgroundSize: "cover",
                }}
              >
                <p className="text-gray-700 font-semibold">
                  <strong>Title:</strong> {activeItem.title}
                </p>
                <p className="text-gray-700 mt-2">
                  <strong>Content:</strong> {activeItem.content}
                </p>
                <p className="text-gray-700 mt-2">
                  <strong>Author:</strong> {activeItem.author}
                </p>
              </div>
              {activeItem.reply && (
                <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded-md shadow-sm">
                  <p className="text-blue-700">
                    <strong>Reply:</strong> {activeItem.reply}
                  </p>
                </div>
              )}
              {isAdmin && (
                <div className="mt-6">
                  <label
                    htmlFor="adminReply"
                    className="block text-gray-800 font-bold mb-2"
                  >
                    Write a Reply:
                  </label>
                  <textarea
                    id="adminReply"
                    className="w-full h-24 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your reply here..."
                    value={activeItem.reply || ""}
                    onChange={(e) =>
                      setActiveItem((prev) => ({
                        ...prev,
                        reply: e.target.value,
                      }))
                    }
                  />
                  <div className="mt-4 flex justify-end space-x-4">
                    {/* 삭제 버튼 */}
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400"
                      onClick={() => handleDelete(activeItem)}
                    >
                      Delete
                    </button>

                    {/* 답글 저장 버튼 (삭제 버튼과 위치 교체 가능) */}
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                      onClick={() => {
                        alert("Reply saved successfully!");
                        handleCloseModal();
                      }}
                    >
                      Save Reply
                    </button>
                  </div>
                </div>
              )}
              <div className="mt-6 text-center">
                <button
                  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
