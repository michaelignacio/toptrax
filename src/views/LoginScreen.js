import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import githubMark from '../images/github.png';
import spotifyIcon from '../images/spotify.png';
import styles from '../styles/Type.module.css';
import btnStyles from '../styles/Button.module.css';
import loginStyles from '../styles/LoginScreen.module.css';

const LoginScreen = (props) => {
  return(
    <CSSTransitionGroup
      transitionName="example"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}
    >
      <div className={loginStyles.LoginScreen}>
        <h1 className={styles.h1Style}>TopTrax</h1>
        <h2 className={styles.h2Style}>Discover your most played tracks on Spotify</h2>

        <a className={btnStyles.btn} href={process.env.NODE_ENV === 'production' ? process.env.REACT_APP_HEROKU_LOGIN : process.env.REACT_APP_LOCAL_LOGIN}>Log in with Spotify <img src={spotifyIcon} alt="Spotify Icon" width="28" height="28" /></a>

        <a className={`${btnStyles.btn} ${btnStyles.github}`} target="_blank" rel="noopener noreferrer" href="https://github.com/michaelignacio/toptrax">View Source Code <img src={githubMark} alt="Github Mark" width="28" height="28" /></a>
      </div>
    </CSSTransitionGroup>
  );
}

export default LoginScreen
