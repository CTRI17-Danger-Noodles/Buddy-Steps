import React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.scss';
import { UserContext } from '../contexts/Contexts';



export function Login() {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  // const { setGlobalUsername, globalUsername } = useContext(UserContext);

  const navigate = useNavigate();

  const login = async () => {

    try {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
      });
      const data = await res.json();
      console.log('login fetch response: ', data);
      console.log(data)
      if (typeof data !== "object") {
        // 'error' will be sent back in the backend
        alert('Username or Password does not exist');
      }
      else {
        //TODO: set username here
        console.log('username: ', username);
        localStorage.setItem('username', username); // must log in to set
        localStorage.setItem('teamName', username); // must log in to set
        localStorage.setItem('profilepic', 0);
        navigate('/home')
        console.log('hey im in');
      }
    } catch (error) {
      // console.log(error);
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
  return (
    <div id="login-container">
      <div id="login-contents">
        <h1>Welcome to WHAKR</h1>
        <hr />
        <h2>Sign in Below</h2>
        <div className="input-container">
          <label>
            <h3 className="name-h3">Username</h3>
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
        <button id="allbuttons" onClick={login}>
          Login
        </button>
      </div>
      <div id="userdirect">
        <h3>New to WHAKR?</h3>
        <a id="gobackbutton" href="./createuser">
          <h3>Sign Up Here</h3>
        </a>
      </div>
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