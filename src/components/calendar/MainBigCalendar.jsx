import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '@/services/axios.jsx'
import DateChangerModal from './DateChangerModal';
import CustomAlert from '../Alert';
import ClickDateModal from './ClickDateModal';
import EventClickConfirm from './EventClickConfirm';

const MainBigCalendar = () => {
    const [dateChanger, setDateChanger] = useState(false);
    const [oldData, setOldData] = useState({})
    const [putData, setPutData] = useState([]);
    const [alert, setAlert] = useState(false);
    const [customAlert,setCustomAlert] = useState(false);
    const [customAlertType,setCustomAlertType] = useState("")
    const [customAlertMessage,setCustomAlertMessage] = useState("")
    const [clickDateModal, setClickDateModal] = useState(false);
    const [clickedDate, setClickedDate] = useState("");
    const [eventClickConfirm, setEventClickConfirm] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [selectedId, setSelectedId] = useState(0);
    const [selectedGroupId,setSelectedGroupId] = useState(0)
    const queryClient = useQueryClient();
    const [lastModified , setLastModified] = useState();

    useEffect(() => {
        const timeout = setTimeout(() => {
<<<<<<< HEAD
            if (Date.now() - lastModified >= 60 * 60 * 1000) {
                mutation.mutateAsync(); // 자동으로 수정 요청 보내기
            }
        }, 60 * 60 * 1000);
=======
            if (Date.now() - lastModified >= 2 * 60 * 1000) {
                mutation.mutateAsync(); // 자동으로 수정 요청 보내기
            }
        }, 5 * 60 * 1000);
>>>>>>> 98f236428002da84caccc043697ce76292703f8f
    
        return () => clearTimeout(timeout);
    }, [lastModified]);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            mutation.mutateAsync();
            
            event.preventDefault();
            event.returnValue = '';
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const dropEvent = (e) => {
        setDateChanger(true);
        setOldData({
            title : e.event.title,
            contentId : e.event.id,
            startDate : new Date(e.event.start).toLocaleString('sv-SE'),
            endDate : new Date(e.event.end).toLocaleString('sv-SE')
        })
        setPutData((prev) => {
            const updatedData = prev.map(item => 
            // contentId가 같은 경우 데이터를 업데이트
            item.contentId === e.event.id
                ? { ...item, 
                    title: e.event.title, 
                    startDate : new Date(e.event.start).toLocaleString('sv-SE'),
                    endDate : new Date(e.event.end).toLocaleString('sv-SE')
                }
                : item
            );
            
            // 만약 contentId가 없는 경우 새로운 데이터 추가
            if (!updatedData.some(item => item.contentId === e.event.id)) {
            updatedData.push({
                title: e.event.title,
                contentId: e.event.id,
                startDate : new Date(e.event.start).toLocaleString('sv-SE'),
                endDate : new Date(e.event.end).toLocaleString('sv-SE')
            });
            }
            
            return updatedData;
        });
        setLastModified(Date.now());
    }

    useEffect(()=>{
        if(alert){
            setTimeout(() => {
                setAlert(false)
            }, 500);
        }
    },[alert])

    const {data : calendarDate, isLoading : isLoadingCalendarDate, isError : isErrorCalendarDate} = useQuery({
        queryKey : ['calendar-date'],
        queryFn : async () => {
        try {
            const response = await axiosInstance.get(`/api/calendar`)
            return response.data
        } catch(err){
            return err
        }
        },
        enabled : isFirstLoad,
        refetchOnWindowFocus: false,  
        staleTime: 300000,  
        retry: false,
        cacheTime : 5 * 60 * 1000
    })

    useEffect(()=>{
        if(calendarDate){
            setIsFirstLoad(false)
        }
    },[calendarDate])

    const mutation = useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.put('/api/calendar/contents', putData, {
                
            });
            return response.data;
        },
        onSuccess: (data) => {
        setCustomAlert(true)
        setCustomAlertType("success")
        setCustomAlertMessage(data)
        queryClient.setQueryData(['calendar-date'],(prevData)=>{
            const updatedData = prevData
                ? prevData.map((item) => {
                    const updatedItem = putData.find(data => String(data.contentId) === String(item.id));
                    
                    if (updatedItem) {
                        return {
                            ...item,
                            title: updatedItem.title, 
                            start: updatedItem.startDate,  
                            end: updatedItem.endDate, 
                            color: item.color, 
                        };
                    }
                    return item;
                })
                : [];
        
            return updatedData;
        })
        queryClient.invalidateQueries(['calendar-content-name'])
        setTimeout(() => {
            setCustomAlert(false);
        }, 1000);
        },
        onError: (error) => {
            console.error("Error updating user", error);
        },
    });

    const handleCustomButtonClick = async () => {
        try {
            await mutation.mutateAsync(); 
        } catch (error) {
            console.error("Error in mutation", error);
        }
    };
    
    if(isLoadingCalendarDate){
        return <p>로딩중입니다...</p>
    }

    if(isErrorCalendarDate){
        return <p>{calendarDate}</p>
    }
    const closeDateChanger = () => {setDateChanger(false)}
    // 날짜 클릭 이벤트 처리
    const handleDateClick = (info) => {
        setClickedDate(info.dateStr)
        setClickDateModal(true)
    };

    const handleEventClick = (info) => {
        setEventClickConfirm(true)
        setSelectedId(info.event.id)
        setSelectedGroupId(info.event.gId)
        console.log(info.event)
    };
        
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin,timeGridPlugin]}
        events={calendarDate}
        selectable={true}
        editable={true}
        dragging={true}
        aspectRatio={3}
        expandRows={true}
        dayMaxEvents={3}
        contentHeight="auto"
        timezone="local"
        buttonText={{
            prev: '이전',
            next: '다음',
            today: '오늘',
            dayGridMonth: '월간달력',
            dayGridWeek: '주간달력',
        }}
        
        eventDisplay='block'
        headerToolbar= {{
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek'
        }}
        dateClick={handleDateClick}  
        eventClick={handleEventClick}
        datesSet={(dateInfo) => {
            const dayCells = document.querySelectorAll('.fc-daygrid-day');
            dayCells.forEach((cell) => {
              cell.style.height = '100px';  
              cell.style.minHeight = '100px';
              cell.style.maxHeight = '100px';
            });
        }}
        eventDrop={dropEvent}
        customButtons={{
            click: { // custom 버튼 정의
              text: '수정하기',
              click: handleCustomButtonClick, // 클릭 시 호출할 함수
              className: 'custom-click-button'
            },
          }}
      />
      <DateChangerModal 
      dateChanger={dateChanger}
      onclose = {closeDateChanger}
      data={oldData}
      setPutData={setPutData}
      putData={putData}
      />
      <CustomAlert 
        type="info"
        message="수정하기를 클릭하셔야 최종 수정됩니다."
        isOpen={alert}
      />
      <CustomAlert 
        type={customAlertType}
        message={customAlertMessage}
        isOpen={customAlert}
      />
      <ClickDateModal 
        onclose={()=>setClickDateModal(false)}
        confirm={clickDateModal}
        clickedDate = {clickedDate}
      />
      <EventClickConfirm 
        clickedDate={clickedDate}
        onclose={()=>setEventClickConfirm(false)}
        isOpen={eventClickConfirm}
        selectedId={selectedId}
        selectedGroupId={selectedGroupId}
      />
      </>
  );
};

export default MainBigCalendar;
