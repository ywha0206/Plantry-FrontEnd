import { useCallback, useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import axiosInstance from '@/services/axios.jsx';


const useProjectData  = (projectId) => {
    const [subTasks, setSubTasks] = useState([{
        id:"",
        taskId:"",
        isChecked:false,
        name:""
    }],)
    const [comments, setComments] = useState([{
        id:"",
        userId:"",
        writer:null,
        user:[],
        taskId:"",
        content:"",
        rdate:"",
    }],)
    const [tasks, setTasks] = useState([{
        id:"",
        columnId:"",
        title:"",
        content:"",
        priority:"",
        status:"",
        position:"",
        duedate:"",
        subTasks:subTasks||[],
        comments:comments||[],
        assign:[],
    }]);
    const [columns, setColumns] = useState([{
        id:"",
        projectId:"",
        title:"",
        color:"",
        position:"",
        tasks:tasks||[]
    }]);
    const [coworkers, setCoworkers] = useState([{
        id:"",
        name:"",
        profileImgPath:"",
        isOwner:false,
        canRead:false,
        canAddTask:false,
        canUpdateTask:false,
        canDeleteTask:false,
        canEditProject:false,
    }]);
    const [boardData, setBoardData] = useState({
        id:1,
        title:null,
        type:"",
        status:"",
        columns:columns||[],
        coworkers:coworkers||[],
    });
    const [isConnected, setIsConnected] = useState(false); // WebSocket 연결 상태
    const [stompClient, setStompClient] = useState(null); // STOMP 클라이언트 인스턴스

    // HTTP GET으로 초기 데이터 가져오기
    useEffect(() => {
        const fetchBoardData = async () => {
            try {
                const response = await axiosInstance.get(`/api/project/${projectId}`);
                setBoardData(response.data); // 받은 데이터로 boardData 설정
            } catch (error) {
                console.error('Error fetching board data:', error);
            }
        };
        fetchBoardData();
    }, [projectId]);


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
    useEffect(() => {
        const initializeStompClient = async () => {
            const headers = await getWebSocketHeaders();

            const client = new Client({
                brokerURL: wsUrl,
                connectHeaders: headers,
                debug: (str) => console.log("Project Debug Log:", str),
                reconnectDelay: 5000, // 5초마다 재연결 시도
                onConnect: () => {
                    console.log('Project connected');
                    setIsConnected(true);

                    client.subscribe(`/topic/project/${projectId}/update`, (message) => {
                        const eventData = JSON.parse(message.body);
                        handleBoardEvent(eventData); // 메시지 처리
                    });
                },
                onStompError: (frame) => {
                    console.error('Project STOMP Error:', frame.headers['message']);
                },
            });

            setStompClient(client);
            client.activate();
        };

        initializeStompClient();

        return () => {
            if (stompClient) {
                stompClient.deactivate();
            }
        };
    }, [projectId]);

    const sendWebSocketMessage = useCallback((message, destination) => {
        if (isConnected && stompClient) {
            stompClient.publish({
                destination: destination, // 동적으로 변경되는 목적지
                body: JSON.stringify(message), // 전송할 메시지
            });
        } else {
            console.error('Project is not connected');
        }
    }, [isConnected, stompClient]);  // stompClient와 isConnected만 의존성 배열에 포함


    const updateState = (type, stateUpdater, payload) => {
        stateUpdater((prev) => {
            switch (type) {
                case 'ADDED':
                    return [...prev, payload];
                case 'UPDATED':
                    return prev.map((item) => (item.id === payload.id ? { ...item, ...payload } : item));
                case 'DELETED':
                    return prev.filter((item) => item.id !== payload.id);
                default:
                    return prev;
            }
        });
    };
    
    const handleBoardEvent = (eventData) => {
        if (!eventData || !eventData.type || !eventData.payload) {
            console.warn('Invalid event data received:', eventData);
            return;
        }
    
        const { type, payload } = eventData;
    
        switch (type) {
            case 'TASK_ADDED':
                updateState('ADDED', setTasks, payload);
                break;
            case 'TASK_UPDATED':
                updateState('UPDATED', setTasks, payload);
                break;
            case 'TASK_DELETED':
                updateState('DELETED', setTasks, { id: payload.taskId });
                break;
    
            case 'COLUMN_ADDED':
                updateState('ADDED', setColumns, payload);
                break;
            case 'COLUMN_UPDATED':
                updateState('UPDATED', setColumns, payload);
                break;
            case 'COLUMN_DELETED':
                updateState('DELETED', setColumns, { id: payload.columnId });
                break;
    
            case 'SUBTASK_ADDED':
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === payload.taskId
                            ? {
                                  ...task,
                                  subTasks: [...(task.subTasks || []), payload],
                              }
                            : task
                    )
                );
                break;
            case 'SUBTASK_UPDATED':
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === payload.taskId
                            ? {
                                  ...task,
                                  subTasks: task.subTasks.map((subTask) =>
                                      subTask.id === payload.id
                                          ? { ...subTask, ...payload }
                                          : subTask
                                  ),
                              }
                            : task
                    )
                );
                break;
            case 'SUBTASK_DELETED':
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === payload.taskId
                            ? {
                                  ...task,
                                  subTasks: task.subTasks.filter(
                                      (subTask) => subTask.id !== payload.id
                                  ),
                              }
                            : task
                    )
                );
                break;
    
            case 'COMMENT_ADDED':
                updateState('ADDED', setComments, payload);
                break;
            case 'COMMENT_UPDATED':
                updateState('UPDATED', setComments, payload);
                break;
            case 'COMMENT_DELETED':
                updateState('DELETED', setComments, { id: payload.commentId });
                break;
    
            default:
                console.warn(`Unhandled event type: ${type}`);
        }
    };

    return {
        boardData, // 화면에 보여줄 데이터
        sendWebSocketMessage
    };
};

export default useProjectData ;