import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import Chart from './views/Chart';
import LoginScreen from './views/LoginScreen';
import styles from './styles/App.module.css';

class App extends Component {
  constructor() {
    super()

    this.state = {
      displayName: '',
      isFetched: false,
      isLoggedIn: false,
      playlistId: '',
      serverData: {},
      spotifyUrl: '',
      userId: '',
      webUrl: ''
    }
  }

  getToken() {
    let parsed = queryString.parse(window.location.search);

    return parsed.access_token;
  }

  getConfig() {
    return {
      headers: { 'Authorization': 'Bearer ' + this.getToken() }
    }
  }

  getUserId() {
    axios.get('https://api.spotify.com/v1/me', this.config)
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
    let foundPlaylist = false
    let that = this

    axios.get(`https://api.spotify.com/v1/users/${this.state.userId}/playlists`, this.config)
      .then(response => {
        let playlists = response.data.items

        playlists.forEach (function (playlist, index) {
          // if the playlist TopTrax exists
          if ( playlist.name === 'TopTrax' && !foundPlaylist ) {
            that.setState({ webUrl: playlist.external_urls.spotify })
            that.setState({ spotifyUrl: playlist.uri })
            that.addTrackstoPlaylist(playlist.id)
            foundPlaylist = true
          }
        })
        // if the playlist TopTrax does not exist, create it
        if (!foundPlaylist) {
          that.createPlaylist()
        }
      }).catch((error) => {
        console.log(error)
      })
  }

  createPlaylist() {
    let that = this

    let bodyParameters = {
      name: 'TopTrax',
      description: `${this.state.displayName}'s top ten most-played tracks on Spotify.`,
      public: true
    }

    axios.post(`https://api.spotify.com/v1/users/${this.state.userId}/playlists`, bodyParameters, this.config)
      .then(response => {
        that.setState({ webUrl: response.data.external_urls.spotify })
        that.setState({ spotifyUrl: response.data.uri })
        that.addTrackstoPlaylist(response.data.id)
      })
  }

  mapSongs() {
    return this.state.serverData.map(song => song.uri)
  }

  addTrackstoPlaylist(id) {
    let mappedSongs = this.mapSongs()

    let bodyParameters = {
      uris: mappedSongs
    }

    axios.put(`https://api.spotify.com/v1/playlists/${id}/tracks`, bodyParameters, this.config)
      .then(response => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
  }

  componentDidMount() {
    if ( this.getToken() ) {
      this.setState({ isLoggedIn: true }, () => {
        if ( this.state.isLoggedIn ) {
          axios.get( 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10', this.getConfig() )
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
          <Chart data={this.state} /> : <LoginScreen data={this.state} />
        }
      </div>
    );
  }
}

export default App;
