/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
// src/contexts/UnreadCountContext.js
import { createContext, useState, useEffect, useCallback, useRef } from "react";
import { Client } from "@stomp/stompjs";
import axiosInstance from "../../services/axios";
import useUserStore from "../../store/useUserStore";
import { useAuthStore } from "../../store/useAuthStore";

export const UnreadCountContext = createContext();

export const UnreadCountProvider = ({ children }) => {
  const [unreadCounts, setUnreadCounts] = useState({});
  const [lastMessages, setLastMessages] = useState({});
  const [lastTimeStamp, setLastTimeStamp] = useState({});
  const [selectedRoomId, setSelectedRoomId] = useState();
  const [roomData, setRoomData] = useState([]);
  const [messageList, setMessageList] = useState([]);

  const [isConnected, setIsConnected] = useState(false);
  const [stompClient, setStompClient] = useState(null);

  const subscriptionRef = useRef(null);
  const shouldScrollToBottomRef = useRef(true);
  const selectedRoomIdRef = useRef(""); // Ref 생성
  const notificationsSubscriptionRef = useRef(null); // 알림 구독 Ref 추가

  // selectedRoomId가 변경될 때 Ref 업데이트
  useEffect(() => {
    selectedRoomIdRef.current = selectedRoomId;
  }, [selectedRoomId]);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const wsUrl = "ws://" + apiBaseUrl.replace("http://", "") + "/ws-chat";
  const uid = useUserStore((state) => state.user?.uid);
  const getWebSocketHeaders = async () => {
    const accessToken = axiosInstance.defaults.headers.Authorization;
    return {
      Authorization: accessToken || "",
    };
  };
  useEffect(() => {
    if (uid === undefined) {
      return;
    }
    const initializeStompClient = async () => {
      const headers = await getWebSocketHeaders();
      const client = new Client({
        brokerURL: wsUrl,
        connectHeaders: headers,
        debug: function (str) {
          console.log(`[STOMP DEBUG]: ${str}`);
        },
        reconnectDelay: 5000, // 재연결 시도 간격 (밀리초)
        onConnect: () => {
          console.log("WebSocket connected");
          setIsConnected(true);

          // 읽지 않은 메시지 수 전용 큐 구독
          notificationsSubscriptionRef.current = client.subscribe(
            `/topic/notifications/${uid}`,
            (message) => {
              if (message.body) {
                const data = JSON.parse(message.body);
                console.log(
                  "현재 방ID : " +
                    selectedRoomIdRef.current +
                    " 받은 방ID : " +
                    data.chatRoomId
                );

                if (data.type === "unreadCount") {
                  // 현재 선택된 채팅방이 아닌 경우에만 unreadCount 업데이트
                  if (data.chatRoomId !== selectedRoomIdRef.current) {
                    setUnreadCounts((prevCounts) => ({
                      ...prevCounts,
                      [data.chatRoomId]: data.unreadCount,
                    }));
                    console.log("전파 받은 안읽은 수 : ", data.unreadCount);
                  }
                } else if (data.type === "lastMessage") {
                  // 모든 채팅방의 마지막 메시지와 타임스탬프 업데이트
                  setLastMessages((prevMessages) => ({
                    ...prevMessages,
                    [data.chatRoomId]: data.lastMessage,
                  }));
                  setLastTimeStamp((prevTimeStamp) => ({
                    ...prevTimeStamp,
                    [data.chatRoomId]: data.lastTimeStamp,
                  }));
                  console.log("마지막 메시지 업데이트 : ", data);
                } else if (data.type === "newRoom") {
                  console.log("뭘 받았지? : ", data);
                  const toRoomData = {
                    id: data.chatRoomId,
                    chatRoomFavorite: data.chatRoomFavorite,
                    chatRoomName: data.chatRoomName,
                    chatRoomReadCnt: 0,
                    lastMessage: data.lastMessage,
                    lastTimeStamp: data.lastTimeStamp,
                    leader: data.leader,
                    members: data.members,
                    status: data.status,
                    unreadCount: data.unreadCount,
                  };
                  setRoomData((prevRoomData) => [...prevRoomData, toRoomData]);
                  console.log("새로운 채팅방 생성됨");
                }
              }
            }
          );
        },
        onStompError: (frame) => {
          console.error("STOMP Error:", frame.headers["message"]);
        },
      });
      // updateSubscriptions(client);

      client.activate();
      setStompClient(client);
    };

    initializeStompClient();

    // 클린업: 컴포넌트 언마운트 시 클라이언트 비활성화
    return () => {
      if (stompClient) {
        console.log("1~~~", selectedRoomId);
        console.log("2~~~", selectedRoomIdRef.current);

        // 알림 구독 해제
        if (notificationsSubscriptionRef.current) {
          notificationsSubscriptionRef.current.unsubscribe();
          console.log("알림 구독 해제");
          notificationsSubscriptionRef.current = null;
        }

        // WebSocket 클라이언트 비활성화
        stompClient.deactivate();
        setStompClient(null);
        setIsConnected(false);

        // 상태 초기화
        setSelectedRoomId(null);
        selectedRoomIdRef.current = null;
        console.log("WebSocket 클라이언트 비활성화 및 상태 초기화");
      }
    };
  }, [uid]);

  // 로그아웃 시 STOMP 클라이언트 비활성화
  useEffect(() => {
    if (!uid && stompClient) {
      if (notificationsSubscriptionRef.current) {
        notificationsSubscriptionRef.current.unsubscribe();
        notificationsSubscriptionRef.current = null;
        console.log("로그아웃 시 구독 해제2");
      }
      stompClient.deactivate();
      setStompClient(null);
      setIsConnected(false);
      console.log("로그아웃 시 WebSocket 클라이언트 비활성화2");
    }
  }, [uid, stompClient]);

  // const updateSubscriptions = useCallback(
  //   (client) => {
  //     if (selectedRoomId) {
  //       if (subscriptionRef.current) {
  //         subscriptionRef.current.unsubscribe();
  //       }
  //       // 새로운 구독 설정
  //       subscriptionRef.current = client.subscribe(
  //         `/topic/chat/${selectedRoomId}`,
  //         (message) => {
  //           try {
  //             const response = JSON.parse(message.body);
  //             setMessageList((prev) => [...prev, response]);
  //             shouldScrollToBottomRef.current = true;
  //           } catch (error) {
  //             console.error("Failed to parse message:", error);
  //           }
  //         }
  //       );
  //       console.log("현재 구독", subscriptionRef.current);
  //     }
  //   },
  //   [selectedRoomId, setMessageList]
  // );

  return (
    <UnreadCountContext.Provider
      value={{
        unreadCounts,
        setUnreadCounts,
        lastMessages,
        setLastMessages,
        isConnected,
        lastTimeStamp,
        setLastTimeStamp,
        selectedRoomId,
        setSelectedRoomId,
        roomData,
        setRoomData,
      }}
    >
      {children}
    </UnreadCountContext.Provider>
  );
};
