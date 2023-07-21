import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/Contexts';
import { Task } from '../components/Task.jsx';
import { EditTask } from '../components/EditTask.jsx';

export function TaskBoard(props) {
  // const { globalName } = useContext(UserContext);
  const { taskData, setTaskData, areTasksChanged, setAreTasksChanged } = props;

  const [editPopup, setEditPopup] = useState(false);
  const [taskIndex, setTaskIndex] = useState(-1);
  const loggedUser = localStorage.getItem('username');
  const teamName = localStorage.getItem('teamName');
  const toDoArr = [];
  const inProgressArr = [];
  const completeArr = [];

  //& Render tasks on start up and re-render them everytime the username or task data changes
  useEffect(() => {
    // console.log('teamName: ', teamName);
    // get tasks associated with username
    async function getTasksData(loggedUser) {
      // update to post
      const response = await fetch(`/api/team`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamName: teamName,
        }),
      });
      const newTaskData = await response.json();
      console.log('newTaskData line 34: ', newTaskData);
      setTaskData(newTaskData);
    }
    // console.log('printing global username in taskboard: ', loggedUser);
    getTasksData(loggedUser);
    // set boolean to false
    setAreTasksChanged(false);
  }, [loggedUser, areTasksChanged]);

  //& When 'Add Task' button is clicked, trigger 'openTaskPopup' which changes the state of 'taskPopup' and causes the 'NewTask' component to appear
  function openEditPopup(index) {
    //~ Pass the index of the Edit Task object to pull data corresponding to index
    setTaskIndex(index);
    //~ set boolean to true so that the edit pop up will appear
    setEditPopup(true);
  }

  function closeEditPopup() {
    setEditPopup(false);
  }

  //& Deletes task from taskData
  async function deleteTask(index) {
    console.log('index', index)
    //~ Get task id corresponding to index
    const taskID = taskData[index].name;
    
    try {
      //~ Delete from database
      const response = await fetch(`/api/task`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamName: teamName,
          name: taskData[index].name,
        }),
      });

      //~ Assign setAreTasksChanged to true to board is refreshed
      setAreTasksChanged(true);
      // location.reload();
    } catch (err) {
      console.log('error occured in delete Task, ', err);
    }
  }

  for (let i = 0; i < taskData.length; i++) {
    if (taskData[i].status === 'to do') {
      toDoArr.push(taskData[i]);
    } else if (taskData[i].status === 'in progress') {
      inProgressArr.push(taskData[i]);
    } else completeArr.push(taskData[i]);
  }

  inProgressArr.push({
    enddate: '2023-07-19T21:00:43.013Z',
    startdate: '2023-07-19T21:33:25.774Z',
    taskID: 200,
    task: 'Give an Awesome Presentation',
    status: 'complete',
    users: 'Kyle',
    genre: 'Productivity'
  });

  // console.log('completeArr.length: ', completeArr.length)
  // console.log('inProgressArr.length: ', inProgressArr.length)
  // console.log('toDoArr.length: ', toDoArr.length)
  console.log('whole Array: ', taskData);
  return (
    <div className="task-board">
      <progress
        className="progress-bar"
        value={
          (completeArr.length /
            (completeArr.length + inProgressArr.length + toDoArr.length)) *
          100
        }
        max="100"
      />
      <div className="progressDiv">
        <div className="scrumDiv">
          <h3> To Do</h3>
          {toDoArr.map((task, index) => {
            return (
              <Task
                task={task.name}
                // taskID={task.taskID}
                startdate={task.startdate}
                enddate={task.enddate}
                key={index}
                index={index}
                status={task.status}
                genre={task.genre}
                setTaskData={setTaskData}
                openEditPopup={openEditPopup}
                deleteTask={deleteTask}
                users={task.users}
              />
            );
          })}
          <EditTask
            editPopup={editPopup}
            closeEditPopup={closeEditPopup}
            taskIndex={taskIndex}
            taskData={taskData}
            setTaskIndex={setTaskIndex}
            setAreTasksChanged={setAreTasksChanged}
          />
        </div>

        <div className="scrumDiv">
          <h3> In Progress </h3>

          {inProgressArr.map((task, index) => {
            return (
              <Task
                task={task.task}
                // taskID={task.taskID}
                startdate={task.startdate}
                enddate={task.enddate}
                key={index}
                index={index}
                status={task.status}
                genre={task.genre}
                setTaskData={setTaskData}
                openEditPopup={openEditPopup}
                deleteTask={deleteTask}
              />
            );
          })}
          <EditTask
            editPopup={editPopup}
            closeEditPopup={closeEditPopup}
            taskIndex={taskIndex}
            taskData={taskData}
            setTaskIndex={setTaskIndex}
            setAreTasksChanged={setAreTasksChanged}
          />
        </div>

        <div className="scrumDiv">
          <h3> Complete </h3>

          {completeArr.map((task, index) => {
            return (
              <Task
                task={task.task}
                // taskID={task.taskID}
                startdate={task.startdate}
                enddate={task.enddate}
                key={index}
                index={index}
                status={task.status}
                genre={task.genre}
                setTaskData={setTaskData}
                openEditPopup={openEditPopup}
                deleteTask={deleteTask}
              />
            );
          })}
          <EditTask
            editPopup={editPopup}
            closeEditPopup={closeEditPopup}
            taskIndex={taskIndex}
            taskData={taskData}
            setTaskIndex={setTaskIndex}
            setAreTasksChanged={setAreTasksChanged}
          />
        </div>
      </div>
    </div>
  );
}
