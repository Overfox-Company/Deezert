import React, { useState, useContext, useEffect } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Calendar from "react-calendar";
import moment from "moment";
import dynamic from "next/dynamic";
import { WorkspaceContext } from "../../../../context/WorkspaceContext";
import { AppContext } from "../../../../context/AppContext";
import { useRouter } from "next/router";
import { TaskType } from "../../../../types/Proyects";
const DynamicCalendar = dynamic<any>(
  () => import("react-calendar").then((mod) => mod.default),
  { ssr: false }
);
const MyCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { taskList, setSelectedTask } = useContext(WorkspaceContext);
  const { setLoader, loader, user, setStaff, selectedCompany } =
    useContext(AppContext);

  const [userTasks, setUserTask] = useState([]);
  useEffect(() => {
    setUserTask(
      taskList.filter((task: TaskType) => {
        return task.assigned.includes(user._id);
      })
    );
  }, [user]);
  useEffect(() => {
    if (loader) {
      const timeout = setTimeout(() => {
        setLoader(false);
      }, 10000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [loader]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

const renderCustomTile = ({ date }: { date: Date }) => {
  const targetDate = moment(date);

  // Filtrar las tareas en userTasks que tienen la misma fecha que targetDate
  const tasksForSameDay = userTasks.filter((task:any) => {
    const taskDate = moment(task.dateEnd);
    return taskDate.isSame(targetDate, 'day');
  });

  const taskCount = tasksForSameDay.length;

  if (taskCount > 0) {
    return (
      <div className="dot">
        <span className="dot-number">{taskCount}</span>
      </div>
    );
  }
  
  return null;
};


  return (
  <div>
    <DynamicCalendar
      onClickDay={handleDateClick}
      tileContent={({ date }:any) => renderCustomTile({ date })}
      value={selectedDate}
    />
  </div>
  );
};

export default MyCalendar;
