import React from 'react';
import { useContext, useState } from 'react';
import { SideContext } from '../contexts/Contexts';
import friends from '../Assets/friends.png';
import addIcon from '../Assets/addIcon.png';
import signout from '../Assets/signout.png';
import camera from '../Assets/newIcon.jpg';
import complete from '../Assets/complete.png';
import CurrentTeams from './CurrentTeams'


export function SideComponent(props) {
  // states pertaining to current Teams button
  const {isTeamChanged, setIsTeamChanged} = props;
  const [teamsPopUp, setTeamsPopUp] = useState(false);

  // popup opening and closing functions
  function openTeamsPopup() {
    setTeamsPopUp(true);
  }

  function closeTeamsPopup() {
    setTeamsPopUp(false);
  }
  function signOut() {
    window.location.href = '/';
  }
  return (
    <>
      {/* {teamsPopUp ? (<div className='current-teams-popup'>
        <h1>CurrentTeams</h1>
      </div>): ('')} */}
      <span title="Create team button">
        <img
          src={addIcon}
          type="button"
          className="side-buttons"
          id="create-team-button"
        />
      </span>
      Create a Team
      <span title="Add Friends">
        <img
          src={friends}
          type="button"
          className="side-buttons"
          id="friends-button"
          onClick={openTeamsPopup}
        />
      </span>
      Current Teams
      <span title="Progress Picture">
        <img
          src={camera}
          type="button"
          className="side-buttons"
          id="camera-button"
        />
      </span>
      Add Teammate
      {/* <span title="Completed Habits" className="complete-span">
        <img
          src={complete}
          type="button"
          className="side-buttons complete"
          id="complete-button"
        />
      </span>
      Habits Finished */}
      <span title="Sign Out">
        <img
          src={signout}
          type="button"
          className="side-buttons"
          id="sign-out-button"
          onClick={signOut}
          alt="sign-out image"
        />
      </span>
      Sign Out
      <CurrentTeams 
        isTeamChanged={isTeamChanged}
        setIsTeamChanged={setIsTeamChanged}
        teamsPopUp={teamsPopUp}
        setTeamsPopUp={setTeamsPopUp}
      />
    </>
  );
}
