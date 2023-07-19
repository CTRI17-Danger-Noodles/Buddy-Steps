import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/Contexts';
import Select from 'react-select';

export function displayTeams(props) {
 
  const {isTeamChanged, setIsTeamChanged, teamsPopUp, setTeamsPopUp} = props;
  const loggedUser = localStorage.getItem('username')
// ! create localStorage item to store current team name in the login page
//! will be able to update which team they are on via this pop up
// and maybe in the create team pop up

{/* if current teams button is clicked, the teamsPopUp state will be set to true which will cause the below operator to render the pop up */}
  if (teamsPopUp) {
    return (
        <div className=''>
          
        </div>

    )
  }
    
}