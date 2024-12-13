import { useEffect, useState, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import axiosInstance from '@/services/axios.jsx';

const useWebSocketProject = ({ projectId, userId }) => {
    const [boardData, setBoardData] = useState([]); // 칸반보드 상태 (태스크, 컬럼 등)
    const [isConnected, setIsConnected] = useState(false); // WebSocket 연결 상태
    const [stompClient, setStompClient] = useState(null); // STOMP 클라이언트 인스턴스

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const wsUrl = "ws://" + apiBaseUrl.replace("http://", "") + "/ws-project";

    // WebSocket 연결 헤더 가져오기
    const getWebSocketHeaders = async () => {
        const accessToken = await axiosInstance.defaults.headers.Authorization;
        return {
            Authorization: accessToken || '',
        };
    };

    // STOMP 클라이언트 초기화
    const initializeStompClient = useCallback(async () => {
        const headers = await getWebSocketHeaders();
        const client = new Client({
            brokerURL: wsUrl,
            connectHeaders: headers,
            debug: function (str) {
                console.log("Project WebSocket Debug:", str); // 디버그 메시지 출력
            },
            reconnectDelay: 5000,
            onConnect: () => {
                console.log('Project WebSocket connected');
                setIsConnected(true);
                subscribeToProjectUpdates(client, projectId); // 연결 후 구독 시작
            },
            onStompError: (frame) => {
                console.error("Project STOMP Error:", frame); // STOMP 오류 로그
            },
        });
        setStompClient(client);
    }, [wsUrl]);

    // WebSocket 메시지 처리 함수
    const handleBoardEvent = (eventData) => {
        const { type, payload } = eventData;
    
        switch (type) {
            case 'TASK_ADDED': {
                console.log('TASK_ADDED')
                setBoardData((prevData) => {
                    const updatedColumns = prevData.columns.map((col) => {
                        if (col.id !== payload.columnId) return col;
    
                        if (payload.id) {
                            // 수정된 태스크 업데이트
                            const updatedTasks = col.tasks.map((existingTask) =>
                                existingTask.id === payload.id ? { ...existingTask, ...payload } : existingTask
                            );
                            return { ...col, tasks: updatedTasks };
                        } else {
                            // 새로운 태스크 추가
                            return { ...col, tasks: [...col.tasks, payload] };
                        }
                    });
    
                    return { ...prevData, columns: updatedColumns };
                });
                break;
            }
    
            case 'TASK_UPDATED': {
                console.log('TASK_UPDATED')
                setBoardData((prevData) => {
                    const updatedColumns = prevData.columns.map((col) => {
                        if (col.id !== payload.columnId) return col;
    
    
                        const updatedTasks = col.tasks.map((existingTask) =>
                            existingTask.id === payload.id ? { ...existingTask, ...payload } : existingTask
                        );
                        return { ...col, tasks: updatedTasks };
                    });
    
                    return { ...prevData, columns: updatedColumns };
                });
                break;
            }
    
            case 'TASK_DELETED': {
                const { taskId, columnIndex } = payload;
    
                console.log('TASK_DELETED')
                setBoardData((prevData) => {
                    const updatedColumns = prevData.columns.map((col, idx) => {
                        if (idx !== columnIndex) return col;
    
                        const filteredTasks = col.tasks.filter((task) => task.id !== taskId);
                        return { ...col, tasks: filteredTasks };
                    });
    
                    return { ...prevData, columns: updatedColumns };
                });
                break;
            }
    
            default:
                console.warn(`Unhandled event type: ${type}`);
        }
    };

    const sendWebSocketMessage = useCallback((message, destination) => {
        if (isConnected && stompClient) {
            stompClient.publish({
                destination: destination, // 동적으로 변경되는 목적지
                body: JSON.stringify(message), // 전송할 메시지
            });
        } else {
            console.error('WebSocket is not connected');
        }
    }, [isConnected, stompClient]);  // stompClient와 isConnected만 의존성 배열에 포함

    const subscribeToProjectUpdates = (client, projectId) => {
        // 해당 프로젝트에 대한 업데이트를 구독
        client.subscribe(`/topic/project/${projectId}/update`, (message) => {
          const updatedData = JSON.parse(message.body);
          setBoardData(updatedData); // 받은 데이터를 boardData로 업데이트
        });
      };
    
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
      }, [stompClient]);

    return {
        boardData, // 화면에 보여줄 데이터
        sendWebSocketMessage: sendWebSocketMessage, // 메시지 전송 기능
    };
};

export default useWebSocketProject;
