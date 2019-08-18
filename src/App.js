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
      isLoggedIn: false,
      userId: '',
      playlistId: '',
      webUrl: '',
      spotifyUrl: '',
      displayName: ''
    }
  }

  mapSongs() {
    return this.state.serverData.map(song => song.uri)
  }

  getUserId() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    let config = {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }

    axios.get(`https://api.spotify.com/v1/me`, config)
      .then(response => {
        this.setState({
          userId: response.data.id,
          displayName: response.data.display_name
        }, () => this.getUsersPlaylists() )
      }).catch((error) => {
        console.log(error)
      })
  }

  getUsersPlaylists() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    let config = {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }

    let foundPlaylist = false
    let that = this

    axios.get(`https://api.spotify.com/v1/users/${this.state.userId}/playlists`, config)
      .then(response => {
        let playlists = response.data.items

        playlists.forEach (function (playlist, index) {
          // if TopTrax playlist exists
          if ( playlist.name === 'TopTrax' && !foundPlaylist ) {
            that.setState({ webUrl: playlist.external_urls.spotify })
            that.setState({ spotifyUrl: playlist.uri })
            that.addTrackstoPlaylist(playlist.id)
            foundPlaylist = true
          }
        })

        // if TopTrax playlist does not exist, create new one
        if (!foundPlaylist) {
          that.createPlaylist()
        }
      }).catch((error) => {
        console.log(error)
      })
  }

  createPlaylist() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    let config = {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }
    let that = this

    let bodyParameters = {
      name: 'TopTrax',
      description: `${this.state.displayName}'s top ten most-played tracks on Spotify.`,
      public: true
    }

    axios.post(`https://api.spotify.com/v1/users/${this.state.userId}/playlists`, bodyParameters, config)
      .then(response => {
        that.setState({ webUrl: response.data.external_urls.spotify })
        that.setState({ spotifyUrl: response.data.uri })
        that.addTrackstoPlaylist(response.data.id)
      })
  }

  addTrackstoPlaylist(id) {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    let config = {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }

    let mappedSongs = this.mapSongs()

    let bodyParameters = {
      uris: mappedSongs
    }

    axios.put(`https://api.spotify.com/v1/playlists/${id}/tracks`, bodyParameters, config)
      .then(response => {
        // console.log(response)
      }).catch((error) => {
        console.log(error)
      })
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
              }, () => this.mapSongs() )
            }).catch((error) => {
              console.log(error)
            })
          this.getUserId()
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
