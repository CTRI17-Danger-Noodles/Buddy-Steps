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
  // console.log('this is enddate', enddate)
  const currentDate = new Date();
  // console.log('Current date: ', currentDate)
  // console.log('currentDate: ', currentDate.toString().slice(0, 15));
  // console.log('The enddate: ', enddate);
  // console.log('type of endDate: ', typeof enddate)
  const newEndDate = new Date(enddate);
  // console.log('newEndDate: ', newEndDate);
  // console.log('task: ', task);
  
  // const formattedStartDate = formatDateTime(currentDate);
  const formattedStartDate = currentDate.toString().slice(0, 15);
  // console.log('formattedStartDate:', formattedStartDate)
  // const formattedEndDate = formatDate(newEndDate);
  const formattedEndDate = newEndDate.toString().slice(0, 15);
  // console.log('formattedEndDate: ', formattedEndDate)
  const daysLeft = calcDaysLeft(newEndDate, currentDate);
  // console.log('daysLeft: ', daysLeft)
  const [progressBarValue, setProgressBarValue] = useState(0);
  const { globalUsername } = useContext(UserContext);
  const loggedUser = localStorage.getItem('username');



  //& Note: stretch feature we could not implement (updating progress bar)
  // //& Update progress bar on render, render every time progressBarValue changes
  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       //~ Get current progress
  //       let response = await fetch('/api/progress/', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           taskId: taskID,
  //           username: globalUsername,
  //         }),
  //       })
  //       let data = await response.json()
  //       console.log('taskID and data in task.jsx: ', taskID, data)
  //       console.log('value being assigned to progress value: ', data.currprogress)
  //       setProgressBarValue(data.currprogress)
  //     }
  //     catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   getData()
  // }, [])

  //& NOTE: could not implement full feature below
  //& increment progressBarValue
  //& get data from server then update data on server
  async function updateProgress() {
    setProgressBarValue(progressBarValue + 10);
  }
  function formatDate(date) {
    return new Intl.DateTimeFormat('en-US').format(date);
  }

 function calcDaysLeft(date1, date2) {
  var diff = Math.floor(date1.getTime() - date2.getTime());
  // console.log('diff', typeof diff);
  var day = 1000 * 60 * 60 * 24;

  var days = Math.floor(diff / day);
  // console.log('days: ', days);

  var message = `${days} days left`;
  // console.log('message: ', message);

  return message;
}

  return (
    <div className="task">
      <div className="task-name">
        <h3>{task}</h3>
      </div>
      <hr />
      <div id="start-date">Start Date: {formattedStartDate}</div>
      {/* <div id="start-date">Start Date: </div> */}
      {/* <div id="end-date">End Date: {formattedEndDate}</div> */}
      <div id="end-date">End Date: </div>
      {/* <div id="days-left">{daysLeft}</div> */}
      <div id="days-left">Days Left:</div>
      <div id="days-left">Genre:{genre}</div>
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




