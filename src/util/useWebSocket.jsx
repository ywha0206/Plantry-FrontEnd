// useWebSocket.js
import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';

const useWebSocket = ({ initialDestination, initialMessage ,initialCalendarId }) => {
    const [destination, setDestination] = useState(initialDestination);
    const [sendMessage, setSendMessage] = useState(initialMessage);
    const [calendarIds,setCalendarIds] = useState([],initialCalendarId)
    const [isConnected, setIsConnected] = useState(false); // 연결 상태 추적
    const [receiveMessage, setReceiveMessage] = useState("");
    const [sendCalendarId, setSendCalendarId] = useState(0)

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const wsUrl = "ws://" + apiBaseUrl.replace("http://", "") + "/ws-calendar";

    const stompClient = new Client({
        brokerURL: wsUrl, // 서버 WebSocket URL
        connectHeaders: {
            // 필요시 인증 헤더 추가
        },
        debug: function (str) {
            console.log(str);
        },
        onConnect: () => {
            console.log('WebSocket connected');
            setIsConnected(true);  
            // 연결된 후 구독 설정
            if (initialCalendarId) {
                const calendarIds = initialCalendarId[0].split(','); // 문자열을 쉼표로 분리하여 배열로 변환
                // 각 calendarId에 대해 구독 설정
                calendarIds.forEach((calendarId) => {
                    stompClient.subscribe(`/topic/calendar/${calendarId}`, (message) => {
                        try {
                            const response = JSON.parse(message.body); 
                            console.log(`Received calendar update for calendar ${calendarId}:`, response);
                            setReceiveMessage(response); 
                        } catch (error) {
                            console.error("Failed to parse message as JSON:", error);
                            console.log("Received message:", message.body);
                        }
                    });
                });
            }
            

            // 연결된 후 메시지 전송
            if (destination && sendMessage) {
                stompClient.publish({
                    destination: destination, // 메시지를 보낼 경로
                    body: JSON.stringify({ message: sendMessage }), // 보내고자 하는 메시지
                });
            }
        },
        onStompError: (frame) => {
            console.log("STOMP Error:", frame);
        },
    });

    useEffect(() => {
        stompClient.activate(); // WebSocket 연결 활성화

    }, []); // 빈 배열로 컴포넌트 마운트/언마운트 시에만 실행

    // destination과 sendMessage 값을 업데이트할 수 있는 함수를 반환
    return { stompClient, setDestination, setSendMessage, isConnected , receiveMessage };
};

export default useWebSocket;
