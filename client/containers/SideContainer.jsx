import React from 'react';
import { SideComponent } from '../components/SideComponent';
import '../styles/styles.scss';

export function SideContainer(props) {
  const {isTeamChanged, setIsTeamChanged} = props;
  return (
    <div className="main-side-container">
      <SideComponent 
        isTeamChanged={isTeamChanged}
        setIsTeamChanged={setIsTeamChanged}
      />
    </div>
  );
}
