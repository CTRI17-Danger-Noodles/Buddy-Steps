import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../contexts/Contexts';

export function Task(props) {
  const {
    task,
    taskID,
    startdate,
    enddate,
    openEditPopup,
    index,
    deleteTask,
    genre,
    status,
    users
  } = props;
  

  const currentDate = new Date();

  const newEndDate = new Date(enddate);

  
  // const formattedStartDate = formatDateTime(currentDate);

  // console.log('formattedEndDate: ', formattedEndDate)

  const [progressBarValue, setProgressBarValue] = useState(0);
  const { globalUsername } = useContext(UserContext);
  const loggedUser = localStorage.getItem('username');

  function formatDate(date) {
      return new Intl.DateTimeFormat('en-US').format(date);
    }

  const newCurrentDate = formatDate(currentDate)
  
  //& NOTE: could not implement full feature below
  //& increment progressBarValue
  //& get data from server then update data on server
  async function updateProgress() {
    setProgressBarValue(progressBarValue + 10);
  }

  // function formatDate(date) {
  //   return new Intl.DateTimeFormat('en-US').format(date);
  // }

  function calcDaysLeft(date1, date2) {
    let diff = (date1.getTime() - date2.getTime());
    // console.log('diff', typeof diff);
    // console.log('diff', diff);
    let day = 1000 * 60 * 60 * 24;
    
    let days = Math.abs(Math.ceil(diff / day));
    // console.log('days: ', days);
  
    let message = `${days} days left`;
    // console.log('message: ', message);
  
    return days
  }

  const daysLeft = calcDaysLeft(newEndDate, currentDate);

  // console.log(typeof daysLeft) 

  // console.log('days left is ',daysLeft)

  return (
    <div className="task">
      <div className="task-name">
        <h3>{task}</h3>
      </div>
      <hr />
      {/* <div id="start-date">Start Date: {formatDate{StartDate}}</div> */}
      <div id="start-date">Start Date:</div>
      {/* <div id="end-date">End Date: {formatDate{newEndDate}}</div> */}
      <div id="end-date">End Date:</div>
      {/* <div id="days-left">{daysLeft}</div> */}
      {/* <div id="days-left">Days Left: {daysLeft}</div> */}
      <div id="genre">Genre: {genre}</div>
      <div id="users">Users on Task: {users}</div>
      {/* <progress className="progress-bar" value={progressBarValue} max="100" />
      <button
        id="allbuttons"
        className="progress-bar-progress-button"
        onClick={updateProgress}
        index={index}
      >
        Update Progress
      </button> */}
      <hr />
      <button
        id="allbuttons"
        className="progress-bar-edit-button"
        onClick={() => openEditPopup(index)}
        index={index}
      >
        Update
      </button>
      <button
        id="allbuttons"
        className="progress-bar-delete-button"
        onClick={() => deleteTask(index)}
      >
        Delete Task
      </button>
    </div>
  );
}




