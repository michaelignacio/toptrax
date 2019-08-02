import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import LoginScreen from './views/LoginScreen';
import Chart from './views/Chart';
import styles from './styles/App.module.css';
import './App.scss';

class App extends Component {
  constructor() {
    super()
    this.state = {
      serverData: {},
      isFetched: false,
      isLoggedIn: false
    }
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    let config = {
      headers: {'Authorization': 'Bearer ' + accessToken},
      params: {
        time_range: 'long_term'
      }
    }

    if ( accessToken ) {
      this.setState({ isLoggedIn: true }, () => {
        if ( this.state.isLoggedIn ) {
          axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10`, config)
            .then(response => {
              this.setState({
                serverData: response.data.items,
                isFetched: true
              })
            }).catch((error) => {
              console.log(error)
            })
        }
      })
    }
  }

  render () {
    return (
      <div className={this.state.isFetched ? `${styles.App} ${styles.loggedIn}` : styles.App }>
        { this.state.isLoggedIn && this.state.isFetched ?
          <Chart data={this.state} />
          : <LoginScreen data={this.state} /> }
      </div>
    );
  }
}

export default App;
