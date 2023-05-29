import React, { useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Calendar from "react-calendar";
import dynamic from "next/dynamic";
const DynamicCalendar = dynamic<any>(() =>
  import("react-calendar").then((mod) => mod.default),
  { ssr: false }
);
const MyCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const renderCustomTile = ({ date }: { date: Date }) => {
    if (
      date.getFullYear() === 2022 &&
      date.getMonth() === 3 &&
      date.getDate() === 22
    ) {
      return (
        <div className="dot">
          <span className="dot-number">5</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div >
      <DynamicCalendar
        onClickDay={handleDateClick}
        tileContent={renderCustomTile}
        value={selectedDate}
      />
    </div>
  );
};

export default MyCalendar;
