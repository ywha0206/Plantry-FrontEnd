import "@/pages/message/Message.scss";
import { useState } from "react";
import InvitationModal from "./InvitationModal";

export default function Message() {
  const [isOpen, setIsOpen] = useState(false);

  const openHandler = () => {
    setIsOpen(true);
  };
  const closeHandler = () => {
    setIsOpen(false);
  };

  return (
    <div id="message-container">
      <div className="aside">
        <div className="aside-top">
          <img className="profile" src="../images/sample_item1.jpg" alt="" />
          <div className="search">
            <img className="searchImg" src="../images/image.png" alt="" />
            <input type="text" placeholder="Search..." />
          </div>
        </div>
        <div className="list frequent">
          <h3>즐겨찾기</h3>
          <div className="rooms">
            <div className="room selected">
              <img
                className="profile"
                src="../images/sample_item1.jpg"
                alt=""
              />
              <div className="name_preview">
                <div className="name">
                  전규찬
                  <img
                    className="frequentImg"
                    src="../images/gold_star.png"
                    alt=""
                  />
                </div>
                <div className="preview">
                  <span>반갑습니다</span>
                </div>
              </div>
              <div className="date_unRead">
                <span>2024.11.20</span>
                <img
                  className="unReadImg"
                  src="../images/unreadNum.png"
                  alt=""
                />
              </div>
            </div>
            <div className="room">
              <img
                className="profile"
                src="../images/sample_item1.jpg"
                alt=""
              />
              <div className="name_preview">
                <div className="name">
                  전규찬
                  <img
                    className="frequentImg"
                    src="../images/gray_star.png"
                    alt=""
                  />
                </div>
                <div className="preview">
                  <span>반갑습니다</span>
                </div>
              </div>
              <div className="date_unRead">
                <span>2024.11.20</span>
                <img
                  className="unReadImg"
                  src="../images/unreadNum.png"
                  alt=""
                />
              </div>
            </div>
            <div className="room">
              <img
                className="profile"
                src="../images/sample_item1.jpg"
                alt=""
              />
              <div className="name_preview">
                <div className="name">
                  전규찬
                  <img
                    className="frequentImg"
                    src="../images/gray_star.png"
                    alt=""
                  />
                </div>
                <div className="preview">
                  <span>반갑습니다</span>
                </div>
              </div>
              <div className="date_unRead">
                <span>2024.11.20</span>
                <img
                  className="unReadImg"
                  src="../images/unreadNum.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        <div className="list">
          <h3>대화방</h3>
          <div className="rooms">
            <div className="room selected">
              <img
                className="profile"
                src="../images/sample_item1.jpg"
                alt=""
              />
              <div className="name_preview">
                <div className="name">
                  전규찬
                  <img
                    className="frequentImg"
                    src="../images/gray_star.png"
                    alt=""
                  />
                </div>
                <div className="preview">
                  <span>반갑습니다</span>
                </div>
              </div>
              <div className="date_unRead">
                <span>2024.11.20</span>
                <img
                  className="unReadImg"
                  src="../images/unreadNum.png"
                  alt=""
                />
              </div>
            </div>
            <div className="room">
              <img
                className="profile"
                src="../images/sample_item1.jpg"
                alt=""
              />
              <div className="name_preview">
                <div className="name">
                  전규찬
                  <img
                    className="frequentImg"
                    src="../images/gray_star.png"
                    alt=""
                  />
                </div>
                <div className="preview">
                  <span>반갑습니다</span>
                </div>
              </div>
              <div className="date_unRead">
                <span>2024.11.20</span>
                <img
                  className="unReadImg"
                  src="../images/unreadNum.png"
                  alt=""
                />
              </div>
            </div>
            <div className="room">
              <img
                className="profile"
                src="../images/sample_item1.jpg"
                alt=""
              />
              <div className="name_preview">
                <div className="name">
                  전규찬
                  <img
                    className="frequentImg"
                    src="../images/gray_star.png"
                    alt=""
                  />
                </div>
                <div className="preview">
                  <span>반갑습니다</span>
                </div>
              </div>
              <div className="date_unRead">
                <span>2024.11.20</span>
                <img
                  className="unReadImg"
                  src="../images/unreadNum.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="create">
          <button className="create-btn" onClick={openHandler}>
            대화방 생성
          </button>
        </div>
      </div>
      <div className="view">
        <div className="others">
          <div className="profile_name_preview">
            <img className="profile" src="../images/sample_item1.jpg" alt="" />
            <div className="name_preview">
              <div className="name">전규찬</div>
              <div className="preview">
                <span>백엔드 개발자</span>
              </div>
            </div>
          </div>
          <div className="search_more">
            <img className="searchImg" src="../images/image.png" alt="" />
            <img className="searchImg" src="../images/More.png " alt="" />
          </div>
        </div>
        <div className="messages">
          <div className="my-message_profile">
            <div className="my-messages_readTime">
              <div className="my-message">
                안녕하세요 저는 전규찬이라고 합니다.
              </div>
              <div className="readTime">1:15 PM</div>
            </div>
            <img
              className="message-profile"
              src="../images/sample_item1.jpg"
              alt=""
            />
          </div>
          <div className="others-messages">
            <img
              className="message-profile"
              src="../images/sample_item1.jpg"
              alt=""
            />
            <div className="others-messages_readTime">
              <div className="others-message">
                어? 이름이 규찬이세요? 이런 우연이!!! 저 살면서 규찬이라는 이름
                쓰는 사람 조규찬 말고는 처음봤어요. 저는 김규찬입니다!
              </div>
              <div className="others-message">
                죄송해요 말이 좀 많았죠? 너무 신기해서 제가 조금 흥분했나봐요..
                어쨌든 만나뵙게 되어 정말 반갑습니다!
              </div>
              <div className="readTime">1:16 PM</div>
            </div>
          </div>
          <div className="my-message_profile">
            <div className="my-messages_readTime">
              <div className="my-message">아 넵.</div>
              <div className="readTime">1:17 PM</div>
            </div>
            <img
              className="message-profile"
              src="../images/sample_item1.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="send-message">
          <div className="input_fileIcon">
            <input
              className="message-input"
              type="text"
              placeholder="메시지를 입력해주세요"
            />
            <img className="fileIcon" src="../images/fileIcon.png" alt="" />
          </div>
          <button className="send-btn">보내기</button>
        </div>
      </div>
      {isOpen == true ? (
        <InvitationModal isOpen={isOpen} closeHandler={closeHandler} />
      ) : null}
    </div>
  );
}
