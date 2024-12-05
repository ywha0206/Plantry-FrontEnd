import "@/pages/message/Message.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import MessageToolTip from "../../components/message/MessageToolTip";
import InviteModal from "../../components/message/InviteModal";
import ShowMoreModal from "../../components/message/ShowMoreModal";
import AttachFileModal from "../../components/message/AttachFileModal";
import ProfileModal from "../../components/message/ProfileModal";
import axiosInstance from "../../services/axios";
import useUserStore from "./../../store/useUserStore";
import useChatWebSocket from "../../util/useChatWebSocket";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Message() {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const [option, setOption] = useState(2);
  const [search, setSearch] = useState(false);
  const [moreFn, setMoreFn] = useState(false);
  const [file, setFile] = useState(false);
  const [fileInfos, setFileInfos] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [roomData, setRoomData] = useState([]);
  const [roomInfo, setRoomInfo] = useState({});

  const fileRef = useRef();
  const profileRef = useRef();
  const inviteRef = useRef();
  const showMoreRef = useRef();

  const openHandler = () => {
    setIsOpen(true);
  };
  const closeHandler = () => {
    setIsOpen(false);
    setOption(2);
  };
  const profileHandler = () => {
    setProfile(!profile);
  };
  const optionHandler = (e) => {
    e.preventDefault();
    if (e.target.className === "userSearch") {
      setOption(1);
    } else if (e.target.className === "orgChart") {
      setOption(2);
    } else if (e.target.className === "frequent") {
      setOption(3);
    }
  };

  const propsObject = {
    isOpen,
    closeHandler,
    option,
    optionHandler,
    inviteRef,
  };

  const searchHandler = () => {
    setSearch(!search);
  };

  const moreFnHandler = () => {
    setMoreFn(!moreFn);
  };

  const fileHandler = (e) => {
    e.preventDefault();
    saveFileInfos();
  };
  const formatFileSize = (size) => {
    if (size >= 1024 * 1024) {
      return (size / (1024 * 1024)).toFixed(2) + " MB";
    } else if (size >= 1024) {
      return (size / 1024).toFixed(2) + " KB";
    } else {
      return size + " bytes";
    }
  };
  const saveFileInfos = () => {
    const selectedFiles = Array.from(fileRef.current.files);
    console.log("selectedFiles.length : " + selectedFiles.length);

    if (selectedFiles.length === 0) {
      alert("파일을 첨부해주세요");
      return;
    } else if (selectedFiles.length > 5) {
      alert("파일은 최대 5개까지 첨부 가능합니다.");
      return;
    } else {
      // 파일 크기 제한 (16MB)
      const maxSize = 16 * 1024 * 1024; // 16MB
      const oversizedFiles = selectedFiles.filter(
        (file) => file.size > maxSize
      );
      if (oversizedFiles.length > 0) {
        alert("파일 크기는 최대 16MB를 초과할 수 없습니다.");
        return;
      }
      const readFilePromises = selectedFiles.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (file.type.startsWith("image/")) {
              resolve({
                fileName: file.name,
                fileSize: formatFileSize(file.size),
                fileURL: reader.result,
              });
            } else {
              resolve({
                fileName: file.name,
                fileSize: formatFileSize(file.size),
                fileURL: null,
              });
            }
          };
          reader.onerror = () => {
            reject(
              new Error(`파일을 읽는 중 오류가 발생했습니다: ${file.name}`)
            );
          };
          if (file.type.startsWith("image/")) {
            reader.readAsDataURL(file);
          } else {
            reader.readAsArrayBuffer(file); // 이미지가 아닌 경우 처리 방식에 따라 변경
          }
        });
      });

      Promise.all(readFilePromises)
        .then((results) => {
          setFileInfos(results);
        })
        .catch((err) => {
          console.error(err);
          alert("파일을 읽는 중 오류가 발생했습니다.");
        });
      setFile(true);
    }
  };

  const uid = useUserStore((state) => state.user.uid);

  const frequentHandler = useCallback(
    async (e, room) => {
      e.preventDefault();
      const newFavoriteStatus = room.chatRoomFavorite === 0 ? 1 : 0;

      const jsonData = {
        id: room.id,
        chatRoomFavorite: newFavoriteStatus,
      };
      try {
        await axiosInstance
          .patch("/api/message/frequentRoom", jsonData)
          .then((resp) => console.log(resp.data));

        setRoomData((prevRooms) =>
          prevRooms.map((r) =>
            r.id === room.id ? { ...r, chatRoomFavorite: newFavoriteStatus } : r
          )
        );
      } catch (error) {
        console.error(error);
      }
    },
    [setRoomData]
  );

  useEffect(() => {
    if (!uid) return;

    const fetchChatRooms = async () => {
      try {
        const response = await axiosInstance.get(`/api/message/room/${uid}`);
        setRoomData(response.data);
      } catch (error) {
        console.error("채팅방 호출 오류:", error);
      }
    };
    fetchChatRooms();
  }, [uid, isOpen]);

  const [messageList, setMessageList] = useState([]);

  const selectRoomHandler = (e, roomId) => {
    e.preventDefault();
    if (selectedRoomId === roomId) {
      return;
    }
    setSelectedRoomId(roomId);
    localStorage.removeItem("roomId");
    localStorage.setItem("roomId", roomId);
    try {
      axiosInstance.get(`/api/message/roomInfo/${roomId}`).then((resp) => {
        setRoomInfo(resp.data);
        setMembers(resp.data.members);
        setMembers((prevMembers) => [...prevMembers, resp.data.leader]);
      });
      axiosInstance.get(`/api/message/getMessage/${roomId}`).then((resp) => {
        console.log("채팅목록:", resp.data);
        setMessageList(...messageList, resp.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const roomId = localStorage.getItem("roomId");
    if (!roomId) return;
    setSelectedRoomId(roomId);
    try {
      axiosInstance.get(`/api/message/roomInfo/${roomId}`).then((resp) => {
        setRoomInfo(resp.data);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  //==========================================▼웹소켓 연결과 채팅 전송===================================================

  const [input, setInput] = useState("");

  const { mutate } = useMutation({
    mutationFn: async (inputText) => {
      if (input.trim() === "") return null;

      const newMessage = {
        roomId: selectedRoomId,
        status: 1,
        type: "MESSAGE",
        content: inputText,
        sender: uid,
        timeStamp: new Date(),
      };

      console.log("Sending message to DB:", newMessage);
      try {
        await axiosInstance.post("/api/message/saveMessage", newMessage);
        return newMessage;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: (newMessage) => {
      if (newMessage) {
        sendWebSocketMessage(newMessage, "/app/chat.sendMessage");
        setInput(""); // 입력 필드 초기화
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  console.log(new Date());
  const handleSendMessage = () => {
    mutate(input);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      mutate(input);
    }
  };

  const {
    stompClient,
    isConnected,
    receiveMessage,
    updateMembers,
    updateUserId,
    sendWebSocketMessage,
  } = useChatWebSocket({ selectedRoomId });

  const [members, setMembers] = useState();

  useEffect(() => {
    if (members && uid) {
      updateMembers(members);
      updateUserId(uid);
    }
  }, [members, uid, updateMembers, updateUserId]);
  console.log("input:", input);

  const processMessages = (messages, currentUserId) => {
    return messages.map((message, index) => {
      const previousMessage = messages[index - 1];
      const nextMessage = messages[index + 1];

      const isFirst =
        !previousMessage || previousMessage.sender !== message.sender;
      const isLast = !nextMessage || nextMessage.sender !== message.sender;

      return {
        ...message,
        isFirst,
        isLast,
        isOwnMessage: message.sender === currentUserId,
      };
    });
  };

  //================================================================================================

  return (
    <div id="message-container">
      <div className="aside">
        <div className="aside-top">
          <div className="profile">
            <img
              src="../images/sample_item1.jpg"
              alt=""
              onClick={profileHandler}
            />
            {profile == true ? (
              <ProfileModal
                profileHandler={profileHandler}
                profileRef={profileRef}
              />
            ) : null}
            <MessageToolTip tooltip={"프로필 보기"} />
          </div>

          <div className="search">
            <img className="searchImg" src="../images/image.png" alt="" />
            <input type="text" placeholder="Search..." onChange={null} />
          </div>
        </div>
        <div className="list frequent">
          <h3>즐겨찾기</h3>
          <div className="rooms">
            {roomData && roomData.length > 0
              ? roomData
                  .filter((room) => room.chatRoomFavorite === 1)
                  .map((room) => (
                    <div
                      className={`room ${
                        selectedRoomId === room.id ? "selected" : null
                      }`}
                      key={room.id}
                      onClick={(e) => selectRoomHandler(e, room.id)}
                    >
                      <img
                        className="profile"
                        src="../images/sample_item1.jpg"
                        alt=""
                      />
                      <div className="name_preview">
                        <div className="name">
                          <span>{room.chatRoomName}</span>
                          <img
                            className="frequentImg"
                            src="../images/gold_star.png"
                            alt=""
                            onClick={(e) => frequentHandler(e, room)}
                          />
                        </div>
                        <div className="preview">
                          <span>반갑습니다</span>
                        </div>
                      </div>
                      <div className="date_unRead">
                        <span className="date">2024.11.20</span>
                        <div className="unReadCnt">
                          <span>{room.chatRoomReadCnt}</span>
                        </div>
                      </div>
                    </div>
                  ))
              : null}
          </div>
        </div>

        <div className="list">
          <h3>대화방</h3>
          <div className="rooms">
            {roomData && roomData.length > 0
              ? roomData
                  .filter((room) => room.chatRoomFavorite === 0)
                  .map((room) => (
                    <div
                      className={`room ${
                        selectedRoomId === room.id ? "selected" : null
                      }`}
                      key={room.id}
                      onClick={(e) => selectRoomHandler(e, room.id)}
                    >
                      <img
                        className="profile"
                        src="../images/sample_item1.jpg"
                        alt=""
                      />
                      <div className="name_preview">
                        <div className="name">
                          <span>{room.chatRoomName}</span>
                          <img
                            className="frequentImg"
                            src="../images/gray_star.png"
                            alt=""
                            onClick={(e) => frequentHandler(e, room)}
                          />
                        </div>
                        <div className="preview">
                          <span>반갑습니다</span>
                        </div>
                      </div>
                      <div className="date_unRead">
                        <span>2024.11.20</span>
                        <div className="unReadCnt">
                          <span>{room.chatRoomReadCnt}</span>
                        </div>
                      </div>
                    </div>
                  ))
              : null}
          </div>
        </div>
        {isOpen == true ? <InviteModal {...propsObject} /> : null}
        <div className="create">
          <button className="create-btn" onClick={openHandler}>
            <img src="/images/message-createRoom.png" alt="" />
            대화방 생성
          </button>
        </div>
      </div>
      {selectedRoomId ? (
        <div className="view">
          <div className="others">
            <div className="profile_name_preview">
              <img
                className="profile"
                src="../images/sample_item1.jpg"
                alt=""
              />
              <div className="chatRoomName">
                <span>{roomInfo.chatRoomName}</span>
              </div>
            </div>
            <div className="search_more">
              {search == true ? (
                <div className="searchBox">
                  <input type="text" placeholder="대화 검색..." />
                  <img
                    className="searchImg"
                    src="../images/image.png"
                    alt=""
                    onClick={null}
                  />
                  <img
                    className="closeSearch"
                    src="../images/closeBtn.png"
                    alt=""
                    onClick={searchHandler}
                  />
                </div>
              ) : (
                <img
                  className="searchImg"
                  src="../images/image.png"
                  alt=""
                  onClick={searchHandler}
                />
              )}

              {moreFn == true ? (
                <ShowMoreModal
                  moreFnHandler={moreFnHandler}
                  showMoreRef={showMoreRef}
                />
              ) : null}
              <img
                className="searchImg"
                src="../images/More.png "
                alt=""
                onClick={moreFnHandler}
              />
            </div>
          </div>
          <div className="messages">
            {messageList && messageList.length > 0
              ? messageList.map((message) => (
                  <div
                    className={
                      message.sender === uid
                        ? "my-message_profile"
                        : "others-messages"
                    }
                    key={message.id}
                  >
                    <div
                      className={
                        message.sender === uid
                          ? "my-messages_readTime"
                          : "others-messages_readTime"
                      }
                    >
                      <div
                        className={
                          message.sender === uid
                            ? "my-message"
                            : "others-message"
                        }
                      >
                        {message.content}
                      </div>
                      <div className="readTime">{message.timeStamp}</div>
                    </div>
                    <img
                      className="message-profile"
                      src="../images/sample_item1.jpg"
                      alt=""
                    />
                  </div>
                ))
              : null}

            <div className="others-messages">
              <img
                className="message-profile"
                src="../images/sample_item1.jpg"
                alt=""
              />
              <div className="others-messages_readTime">
                <div className="others-message">
                  어? 이름이 규찬이세요? 이런 우연이!!! 저 살면서 규찬이라는
                  이름 쓰는 사람 조규찬 말고는 처음봤어요. 저는 김규찬입니다!
                </div>
                <div className="others-message">
                  죄송해요 말이 좀 많았죠? 너무 신기해서 제가 조금
                  흥분했나봐요.. 어쨌든 만나뵙게 되어 정말 반갑습니다!
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
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => handleKeyPress(e)}
              />
              <label className="fileInput" htmlFor="fileInput">
                <img className="fileIcon" src="../images/fileIcon.png" alt="" />
                <MessageToolTip tooltip={"파일 첨부"} />
              </label>
              <input
                id="fileInput"
                type="file"
                multiple
                name="file"
                onChange={fileHandler}
                ref={fileRef}
              />
              {file == true ? (
                <AttachFileModal
                  file={file}
                  fileInfos={fileInfos}
                  closeHandler={() => {
                    setFile(false);
                    setFileInfos([]);
                  }}
                />
              ) : null}
            </div>
            <button
              className="send-btn"
              onClick={(e) => handleSendMessage(e)}
              disabled={!isConnected}
            >
              보내기
            </button>
          </div>
        </div>
      ) : (
        <div className="view noChat">
          <img src="/images/message-IconPurple.png" alt="" />
          <span>대화방을 생성하거나 선택하여 대화를 시작해보세요.</span>
        </div>
      )}
    </div>
  );
}
