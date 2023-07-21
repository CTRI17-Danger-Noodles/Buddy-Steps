import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/Contexts';
import Select from 'react-select';

export default function CurrentTeams(props) {
 
  const {isTeamChanged, setIsTeamChanged, teamsPopUp, setTeamsPopUp} = props;
  const loggedUser = localStorage.getItem('username');
  const loggedTeam = localStorage.getItem('teamName');
  console.log( 'user: ', loggedUser);
  console.log( 'team: ', loggedTeam);

  // store an array of each team
  const teams = [];

  // retrieve all teams a user is in from the db
  const getTeams = async () => {
    try {
        const response = await fetch('/api/team/current', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {
                username: loggedUser
            }
        })
        /*
        expected response:
        [ 
          { 
            teamName:
            users: [];
          },
        ] 
        */
        const data =  await response.json();
        teams.push(...data);
        console.log('teams array: ', teams);
        return;


    } catch (err) {
        console.log('error in fetching data for current teams: ', err);
    }
  }

  const handleClick = () => {
    setTeamsPopUp(false);
  }

  // user can update which team they are when they click their desired team name
  const handleTeamChange = (e) => {
    console.log(e.target.value)
    localStorage.setItem('teamName', e.target.value);
    // trigger homepage to rerender to display newly selected 'current team'
    // TODO - make useeffect on home page that will rerender page this state change
    setIsTeamChanged(true);
    setTeamsPopUp(false);
  }

  getTeams();


// //? test
// const loggedTeam = {
//     username: 'ry',
//     teamName: 'fettucine'
// }
// const loggedTeamName = Object.values(loggedTeam)[1];
// const teams = [
//     {
//         teamName: 'gouda',
//         users: ['kyle', 'halia']
//     },
//     {
//         teamName: 'spookith',
//         users: ['arianna', 'wade']
//     }
// ]

const teamList = [];
teams.forEach((obj) => {
    let userList = '';
    Object.values(obj)[1].forEach((el) => {
      userList += `${el}, `
    })
    userList = userList.slice(0, -2);
    // names.push(<button className='team-button' value={Object.values(obj)[0]} onClick={handleTeamChange}>{Object.values(obj)[0]}</button>);
    teamList.push(<button className='team-button' value={Object.values(obj)[0]} onClick={handleTeamChange}>
      {/* display team name */}
      <h3>{Object.values(obj)[0]}</h3>
      {/* display list of users */}
      <div className='current-teams-popup-members'>members: {userList}</div>
    </button>)
})

{/* if current teams button is clicked, the teamsPopUp state will be set to true which will cause the below operator to render the pop up */}
  if (teamsPopUp) {
    return (
        <div className='current-teams-popup'>
            <div className='current-teams-popup-inner'>
              <button className='current-teams-close-button' onClick={handleClick}>X</button>
              <p>Current Team: {loggedTeamName}</p>
              
              <div >{teamList}</div>

            </div>
        </div>

    );
  }
  else { return;}
    
}