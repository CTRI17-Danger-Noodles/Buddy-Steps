import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/Contexts';
import Select from 'react-select';

export default function CurrentTeams(props) {
 
  const {isTeamChanged, setIsTeamChanged, teamsPopUp, setTeamsPopUp} = props;
  const loggedUser = localStorage.getItem('username');
//   const loggedTeam = localStorage.getItem('teamName');
//   console.log( 'user: ', loggedUser);
//   console.log( 'team: ', loggedTeam);

// TODO uncomment lines 15 - 47
  // store an array of each team
//   const teams = [];

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

//   getTeams();


  /*
  const displayTeams = (arr) => {
    const members = '';
    arr.forEach((obj) => {
        obj[users].
    })
    return (
        <div>
            <div>{obj[teamName]}</div>
            <div>members: {users}</div>
        </div>
    )
  }
  */ 

//? test
const loggedTeam = {
    teamName: 'fettucine'
}
const loggedTeamName = Object.keys(loggedTeam)
const teams = [
    {
        teamName: 'gouda'
    },
    {
        teamName: 'spookith'
    }
]
const names = [];
teams.forEach((obj) => {
    names.push(obj[0]);
})

//! user can update which team they are on via this pop up
// and maybe in the create team pop up

{/* if current teams button is clicked, the teamsPopUp state will be set to true which will cause the below operator to render the pop up */}
  if (teamsPopUp) {
    return (
        <div className='current-teams-popup-inner'>
          <p>Current Team: {loggedTeamName}</p>
            <button className='team-button'>{names}</button>
        </div>

    );
  }
  else { return;}
    
}