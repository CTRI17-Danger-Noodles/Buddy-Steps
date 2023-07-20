import React, { useContext, useState, useEffect } from 'react';
import { UserContext, SideContext } from '../contexts/Contexts';
import { NewTask } from '../components/NewTask.jsx';
import Icon from '../Assets/Icon.png';

export function HeaderContainer(props) {
  // const { globalUsername } = useContext(UserContext);
  const { isSideBarShowing, setIsSideBarShowing } = useContext(SideContext);
  const { setTaskData, setAreTasksChanged } = props;

  //& boolean state that controls 'taskPopup' pop up
  const [taskPopup, setTaskPopup] = useState(false);
  const [profile, setProfilePic] = useState('');
  const [name, setName] = useState('');
  const loggedUser = localStorage.getItem('username')

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`/api/user/?username=${loggedUser}`);
        const data = await res.json();
        console.log('data headercontainer line 22: ', data);
        setProfilePic(data.profilepic);
        setName(data.name);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  //& When 'Add Task' button is clicked, trigger 'openTaskPopup' which changes the state of 'taskPopup' and causes the 'NewTask' component to appear
  function openTaskPopup() {
    setTaskPopup(true);
  }

  function closeTaskPopup() {
    setTaskPopup(false);
  }

  function showSideBar() {
    if (isSideBarShowing) {
      setIsSideBarShowing(false);
    } else {
      setIsSideBarShowing(true);
    }
  }

  return (
    <div className="header-container">
      <div className="header-contents">
        <img
          type="button"
          className="profile-pic "
          src={profile}
          height="150px"
          width="150x"
          object-fit="cover"
          onClick={showSideBar}
        />
        <h1>
          {loggedUser}'s Team Homepage
          <br />
          Here are your Current Habits:{' '}
        </h1>
        <img
          src={Icon}
          type="button"
          className="add-task-button"
          onClick={openTaskPopup}
        />
      </div>
      <NewTask
        setTaskData={setTaskData}
        taskPopup={taskPopup}
        closeTaskPopup={closeTaskPopup}
        setAreTasksChanged={setAreTasksChanged}
      />
    </div>
  );
}
