/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import axiosInstance from "@/services/axios.jsx";

const useChatWebSocket = ({
  initialMembers,
  initialUserId,
  selectedRoomId,
  setMessageList,
}) => {
  const [members, setmembers] = useState(initialMembers || []);
  const [isConnected, setIsConnected] = useState(false);
  const [userId, setUserId] = useState(initialUserId);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const wsUrl = "ws://" + apiBaseUrl.replace("http://", "") + "/ws-chat";

  const [stompClient, setStompClient] = useState(null);

  const getWebSocketHeaders = async () => {
    const accessToken = await axiosInstance.defaults.headers.Authorization;
    return {
      Authorization: accessToken || "",
    };
  };

  const initializeStompClient = useCallback(async () => {
    const headers = await getWebSocketHeaders();
    const client = new Client({
      brokerURL: wsUrl,
      connectHeaders: headers,
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("WebSocket connected");
        setIsConnected(true);
        updateSubscriptions(client);
      },
      onStompError: (frame) => {
        console.log("STOMP Error:", frame);
      },
    });
    setStompClient(client);
  }, [wsUrl, selectedRoomId]);

  const updateSubscriptions = useCallback(
    (client) => {
      if (selectedRoomId) {
        client.subscribe(`/topic/chat/${selectedRoomId}`, (message) => {
          try {
            const response = JSON.parse(message.body);
            console.log("구독 응답 : ", response);
            setMessageList((prev) => [...prev, response]);
          } catch (error) {
            console.error("Failed to parse message:", error);
          }
        });
      }
    },
    [selectedRoomId]
  );

  useEffect(() => {
    if (!stompClient) {
      initializeStompClient();
    } else {
      stompClient.activate();
    }

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [stompClient, initializeStompClient, selectedRoomId]);

  useEffect(() => {
    if (stompClient && isConnected) {
      updateSubscriptions(stompClient);
    }
  }, [members, userId, isConnected, stompClient]);

  const sendWebSocketMessage = useCallback(
    (message, path) => {
      if (isConnected && stompClient) {
        stompClient.publish({
          destination: path,
          body: JSON.stringify(message),
        });
      } else {
        console.error("WebSocket is not connected");
      }
    },
    [stompClient, isConnected]
  );

  const updateMembers = (newIds) => {
    setmembers(newIds);
  };

  const updateUserId = (newId) => {
    setUserId(newId);
  };

  return {
    stompClient,
    setmembers,
    members,
    isConnected,
    sendWebSocketMessage,
    updateMembers,
    updateUserId,
    initializeStompClient,
    updateSubscriptions,
  };
};

export default useChatWebSocket;
