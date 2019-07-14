import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import githubMark from './GitHub-Mark-32px.png';
import spotifyIcon from './Spotify_Icon_RGB_Black.png';
import './App.scss';

class ChartItem extends Component {
  render() {
    return (
      <div className="chart-item">
        <ChartPosition number={this.props.index+1} />
        <ArtistPhoto photo={this.props.song.album}/>
        <SongDetails details={this.props.song}/>
      </div>
    );
  }
}

class SongDetails extends Component {
  render() {
    let titleStyle = { fontWeight: "700", marginBottom: "5px", marginTop: "0" }
    return (
        <div className="songDetails" style={{ paddingLeft: "20px", marginTop: "20px" }}>
          <p style={titleStyle}>{this.props.details.name}</p>
          <p style={{ fontSize: ".9rem", marginTop: "5px" }}>
            {this.props.details.artists
              .map((value) => value.name)
              .reduce((prev, curr) => [prev, ' ft. ', curr])}
          </p>
        </div>
    );
  }
}

class ChartPosition extends Component {
  render() {
    return (
        <div className="position">{this.props.number}</div>
    ); 
  }
}

class ArtistPhoto extends Component {
  render() {
    return (
        <div style={{ padding: "5px" }}>
          <img src={this.props.photo.images[2].url} alt=""/>
        </div>
    );
  }
}

class Chart extends Component {
  render() {
    return (
      <div>
        <h1>Your Top 20 Tracks</h1>
        <div className="chartList">
          {(this.props.songs).map((value, index) => {
            return <ChartItem song={value} index={index} key={index} />
          })}
        </div>
      </div>
    )
  }
}

function LoginScreen() {
  return(
    <div className="LoginScreen">
    <h1>TopTrax</h1>
      <h2 style={{textAlign: "center", marginTop: 0, marginBottom: "3rem"}}>Discover your most-played Spotify tracks</h2>
      <a className="btn" href="http://toptrax-backend.herokuapp.com/login">Log in with Spotify <img src={spotifyIcon} alt="Spotify Icon" width="28" height="28" /></a>
      <a className="btn github" target="_blank" href="https://github.com/michaelignacio/toptrax">View Source Code <img src={githubMark} alt="Github Mark" width="28" height="28" /></a>
    </div>
  );
}

class App extends Component {
  constructor() {
    super()
    this.state = {serverData: {} }
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

    axios.get(`https://api.spotify.com/v1/me/top/tracks`, config)
      .then(response => {
        console.log(response.data.items)
        this.setState({ 
          serverData: response.data.items,
          authorized: true
        })
      }).catch((error) => {
        console.log(error)
      })
  }

  render () {
    return (
      <div className={this.state.authorized ? 'App logged-in' : 'App' }>
        {this.state.authorized ?
          <Chart songs={this.state.serverData} />
          : <LoginScreen/>
        }
      </div>
    );
  }
}

export default App;
