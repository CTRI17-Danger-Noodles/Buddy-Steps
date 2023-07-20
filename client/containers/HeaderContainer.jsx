import React, { useContext, useState, useEffect } from 'react';
import { UserContext, SideContext } from '../contexts/Contexts';
import { NewTask } from '../components/NewTask.jsx';
import Icon from '../Assets/Icon.png';

export function HeaderContainer(props) {
  // const { globalUsername } = useContext(UserContext);
  const { isSideBarShowing, setIsSideBarShowing } = useContext(SideContext);
  const {
    setTaskData,
    setAreTasksChanged,
    profilepicIndex,
    setProfilePicIndex,
  } = props;

  //& boolean state that controls 'taskPopup' pop up
  const [taskPopup, setTaskPopup] = useState(false);
  const [profile, setProfilePic] = useState('');
  const [name, setName] = useState('');
  const loggedUser = localStorage.getItem('username');
  const loggedTeam = localStorage.getItem('teamName');
  const loggedPic = localStorage.getItem('profilepic');

  // TODO: POPULATE HEADER CONTAINER
  useEffect(() => {
    // populates the header container
    const getData = async () => {
      try {
        console.log('entered getData');
        const res = await fetch(`/api/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: loggedUser,
          }),
        });
        const data = await res;
        console.log('header data: ', data);
        console.log('profile pic link: ', options[loggedPic].value);
        // setProfilePic(data.profilepic);
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
          src={options[loggedPic].value}
          height="150px"
          width="150x"
          object-fit="cover"
          onClick={showSideBar}
        />
        <h1>
          {loggedUser}'s Team Homepage
          <br />
          Here are your Current Habits:{' '}
          <br />
          Let's whack off those tasks!
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

const options = [
  {
    value:
      'https://www.boredpanda.com/blog/wp-content/uploads/2022/04/624c4778b2298_pnv97vw099a21__700.jpg',
    label: (
      <div>
        <img
          src="https://www.boredpanda.com/blog/wp-content/uploads/2022/04/624c4778b2298_pnv97vw099a21__700.jpg"
          height="100px"
          width="100px"
        />
      </div>
    ),
  },
  {
    value:
      'https://www.boredpanda.com/blog/wp-content/uploads/2022/04/624d89fda8df8_rmvnbkbh9fp51-png__700.jpg',
    label: (
      <div>
        <img
          src="https://www.boredpanda.com/blog/wp-content/uploads/2022/04/624d89fda8df8_rmvnbkbh9fp51-png__700.jpg"
          height="100px"
          width="100px"
        />
      </div>
    ),
  },
  {
    value:
      'https://scontent.fhnl3-1.fna.fbcdn.net/v/t1.6435-9/210479238_312818786928659_821363464048099187_n.jpg?_nc_cat=101&cb=99be929b-3346023f&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=yZlKisSO-fkAX9KP2up&_nc_ht=scontent.fhnl3-1.fna&oh=00_AfDhT45GQb3P31fG9R_5-1dG1pd_UE8GgJ6PuYwxvpZUnA&oe=64E108F6',
    label: (
      <div>
        <img
          src="https://scontent.fhnl3-1.fna.fbcdn.net/v/t1.6435-9/210479238_312818786928659_821363464048099187_n.jpg?_nc_cat=101&cb=99be929b-3346023f&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=yZlKisSO-fkAX9KP2up&_nc_ht=scontent.fhnl3-1.fna&oh=00_AfDhT45GQb3P31fG9R_5-1dG1pd_UE8GgJ6PuYwxvpZUnA&oe=64E108F6"
          height="100px"
          width="100px"
        />
      </div>
    ),
  },
  {
    value:
      'https://www.boredpanda.com/blog/wp-content/uploads/2022/04/624c54b0cd6c6_aycRkOt__700.jpg',
    label: (
      <div>
        <img
          src="https://www.boredpanda.com/blog/wp-content/uploads/2022/04/624c54b0cd6c6_aycRkOt__700.jpg"
          height="100px"
          width="100px"
        />
      </div>
    ),
  },
  {
    value:
      'https://www.boredpanda.com/blog/wp-content/uploads/2022/04/624d35b824fe7_ryqIomM__700.jpg',
    label: (
      <div>
        <img
          src="https://www.boredpanda.com/blog/wp-content/uploads/2022/04/624d35b824fe7_ryqIomM__700.jpg"
          height="100px"
          width="100px"
        />
      </div>
    ),
  },
  {
    value:
      'https://i.pinimg.com/736x/64/71/c2/6471c25554efbda77dc76896f97953d6.jpg',
    label: (
      <div>
        <img
          src="https://i.pinimg.com/736x/64/71/c2/6471c25554efbda77dc76896f97953d6.jpg"
          height="100px"
          width="100px"
        />
      </div>
    ),
  },
  {
    value:
      'https://images7.memedroid.com/images/UPLOADED640/62dbf648b5583.jpeg',
    label: (
      <div>
        <img
          src="https://images7.memedroid.com/images/UPLOADED640/62dbf648b5583.jpeg"
          height="100px"
          width="100px"
        />
      </div>
    ),
  },
  {
    value:
      'https://ih1.redbubble.net/image.448496702.9695/flat,750x1000,075,t.u8.jpg',
    label: (
      <div>
        <img
          src="https://ih1.redbubble.net/image.448496702.9695/flat,750x1000,075,t.u8.jpg"
          height="100px"
          width="100px"
        />
      </div>
    ),
  },
];
