import React from 'react';
import Select from 'react-select';
import { useState } from 'react';
import '../styles/login.scss';
import kyle from '../Assets/kyle.png';

export function CreateUser() {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [profilepic, setProfile] = useState('');
  const [profilepicIndex, setProfilePicIndex] = useState(0);

  const createuser = async () => {
    try {
      const res = await fetch('/api/user/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          profilepic: profilepicIndex,
        }),
      });
      const data = await res;
      if (data.status === 200) {
        console.log('created');
        localStorage.setItem('username', username); // must log in to set
        localStorage.setItem('teamName', username); // must log in to set
        localStorage.setItem('profilepic', profilepicIndex);
        window.location.href = '/home';
      }
      if (data.status === 201) {
        alert('that username already exists');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showPassword = () => {
    let password = document.getElementById('password');
    if (password.type === 'password') {
      password.type = 'text';
    } else {
      password.type = 'password';
    }
  };

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

  const handleProfileChange = (selectedOption) => {
    // console.log(selectedOption.value);
    // console.log(selectedOption.value);
    // const newPic = selectedOption.label
    
    // console.log('selectedOption: ', selectedOption)
    setProfile(selectedOption.value);
    setProfilePicIndex(options.indexOf(selectedOption));
    console.log('profilepic', profilepic);
    console.log('profilepic', profilepicIndex);
    // console.log('profile pic label: ', newPic)
  };

  return (
    <div id="login-container">
      <div id="login-contents">
        <h1>Create a WHAKR Account!</h1>
        <hr />
        <div></div>
        <div className="input-container">
          <label>
            <h3>Select a profile picture</h3>
          </label>
          <Select
            className="allinputfields"
            options={options}
            onChange={handleProfileChange}
          />
        </div>

        <div className="input-container">
          <label>
            <h3>Username</h3>
          </label>
          <input
            className="allinputfields"
            name="username"
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Your User Name Here "
          ></input>
        </div>
        <div className="input-container">
          <label>
            <h3>Password</h3>
          </label>
          <input
            id="password"
            className="allinputfields"
            name="password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Your Password Here "
          ></input>
        </div>
        <button id="allbuttons" onClick={showPassword}>
          {' '}
          Show password
        </button>
        <hr />
        <button id="allbuttons" onClick={createuser}>
          Create User
        </button>
      </div>
      <br></br>
      <a id="gobackbutton" href="./">
        <h3>Go Back to Login</h3>
      </a>
    </div>
  );
}
