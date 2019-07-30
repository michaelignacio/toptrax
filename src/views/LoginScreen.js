import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify, faGithub } from '@fortawesome/free-brands-svg-icons';
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

        <a className={btnStyles.btn} href={process.env.NODE_ENV === 'production' ? process.env.REACT_APP_HEROKU_LOGIN : process.env.REACT_APP_LOCAL_LOGIN}>
          <span>Log in with Spotify</span> <FontAwesomeIcon icon={faSpotify} className={btnStyles.fa} />
        </a>

        <a className={`${btnStyles.btn} ${btnStyles.github}`} target="_blank" rel="noopener noreferrer" href="https://github.com/michaelignacio/toptrax">View Source Code <FontAwesomeIcon icon={faGithub} className={btnStyles.fa} /></a>
      </div>
    </CSSTransitionGroup>
  );
}

export default LoginScreen
