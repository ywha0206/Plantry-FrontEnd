import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { YAxis } from 'recharts';

const WorkTimeline = () => {
  const date = '2024-11-18T'; 
  // const [color, setColor] = useState("");
  // if(type === 'working'){
  //   setColor("#818CF8")
  // }else{
  //   setColor("#ddd")
  // }
  // 데이터 설정
  const testData = [
      {
        date: '2024/11/18',
        start: '08:55:00',
        end:   `18:00:00`,
        color: '#818CF8'
      },
      {
        date: '2024/11/18',
        start: '18:00:00',
        end:   `19:05:00`,
        color: '#ddd'
      },
      {
        date: '2024/11/19',
        start: '08:30:00',
        end:   `18:00:00`,
        color: '#818CF8'
      },
      {
        date: '2024/11/19',
        start: '18:00:00',
        end:   `18:30:00`,
        color: '#ddd'
      },
      {
        date: '2024/11/20',
        start: '08:55:00',
        end:   `18:00:00`,
        color: '#818CF8'
      },
      {
        date: '2024/11/20',
        start: '18:00:00',
        end:   `18:22:00`,
        color: '#ddd'
      },
      {
        date: '2024/11/21',
        start: '08:56:00',
        end:   `18:00:00`,
        color: '#818CF8'
      },
      {
        date: '2024/11/22',
        start: '08:27:30',
        end:   `18:00:00`,
        color: '#818CF8'
      },
      {
        date: '2024/11/22',
        start: '18:00:00',
        end:   `18:30:00`,
        color: '#ddd'
      },
      {
        date: '2024/11/23',
        start: '08:48:00',
        end:   `18:00:00`,
        color: '#818CF8'
      },
      {
        date: '2024/11/24',
        start: '08:55:00',
        end:   `18:00:00`,
        color: '#818CF8'
      },
      {
        date: '2024/11/25',
        start: '08:55:00',
        end:   `18:00:00`,
        color: '#818CF8'
      },
      {
        date: '2024/11/25',
        start: '18:00:00',
        end:   `22:33:00`,
        color: '#ddd'
      },
      
  ];

  const chartData = testData.map((entry) => ({
    x: entry.date,
    y: [
      new Date(`2024-11-18T${entry.start}`).getTime(),
      new Date(`2024-11-18T${entry.end}`).getTime()
    ],
    fillColor: `${entry.color}` // 데이터마다 같은 색상 적용
  }));


  const options = {
    chart: {
      zoom: {
        enabled: false
      },
      pan: {
        enabled: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '50%',
        rangeBarGroupRows: true
      }
    },
    xaxis: {
      type: 'datetime',
      min: new Date('2024-11-18T08:00:00').getTime(), // X축 시작 시간 (08:00)
      max: new Date('2024-11-18T22:00:00').getTime(), // X축 끝 시간 (19:00)
      labels: {
        format: 'HH:mm', // 시간만 표시
        datetimeUTC: false // 현지 시간 사용
      },
      tickAmount: 11 // 시간대 간격 (08:00, 09:00, ...)
    },
    fill: {
      type: 'solid'
    },
    legend: {
      show: true, 
      position: 'top',
      horizontalAlign: 'left'
    },
  };

  return (
    <div>
      <Chart
        options={options}
        series={[
          {
            data: chartData
          }
        ]}
        type="rangeBar"
        height={300}
      />
    </div>
  );
};

export default WorkTimeline;