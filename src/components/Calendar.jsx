import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
// import '@fullcalendar/core/main.css';
// import '@fullcalendar/daygrid/main.css';

const MyCalendar = () => {
  return (
    <div style={{ width: '80%', height: '600px', margin: '0 auto' }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: '회의', date: '2024-11-25' },
          { title: '프로젝트 마감', date: '2024-11-30' },
        ]}
        height="auto"
        contentHeight="auto"
        // dayCellContent={(args) => {
        //     args.el.style.height = "100px"; 
        // }}
      />
    </div>
  );
};

export default MyCalendar;