import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import githubMark from '../images/github.png';
import spotifyIcon from '../images/spotify.png';

const h2Style = {
  textAlign: "center", 
  marginTop: 0, 
  marginBottom: "3rem"
}

const LoginScreen = (props) => {
  return(
    <CSSTransitionGroup
      transitionName="example"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}
    >
      <div className="LoginScreen">
        <h1>TopTrax</h1>
        <h2 style={h2Style}>Discover your most played tracks on Spotify</h2>

        <a className="btn" href={process.env.NODE_ENV === 'production' ? process.env.REACT_APP_HEROKU_LOGIN : process.env.REACT_APP_LOCAL_LOGIN}>Log in with Spotify <img src={spotifyIcon} alt="Spotify Icon" width="28" height="28" /></a>

        <a className="btn github" target="_blank" rel="noopener noreferrer" href="https://github.com/michaelignacio/toptrax">View Source Code <img src={githubMark} alt="Github Mark" width="28" height="28" /></a>
      </div>
    </CSSTransitionGroup>
  );
}

export default LoginScreen
