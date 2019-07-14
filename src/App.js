import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import { css } from '@emotion/core';
import { ScaleLoader } from 'react-spinners';
import { CSSTransitionGroup } from 'react-transition-group' // ES6
import githubMark from './GitHub-Mark-32px.png';
import spotifyIcon from './Spotify_Icon_RGB_Black.png';
import './App.scss';

const override = css`
  width: 40px;
  height: 40px;
  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  `;

const SongDetails = (props) => {
  return (
      <div className="songDetails" style={{ paddingLeft: "20px", marginTop: "20px" }}>
        <p style={{ fontWeight: "700", marginBottom: "5px", marginTop: "0" }}>{props.details.name}</p>
        <p style={{ fontSize: ".9rem", marginTop: "5px" }}>
          {props.details.artists
            .map((value) => value.name)
            .reduce((prev, curr) => [prev, ', ', curr])}
        </p>
      </div>
  );
}

const ChartPosition = (props) => {
  return (
      <div className="position">{props.number}</div>
  ); 
}

const ArtistPhoto = (props) => {
  return (
      <div style={{ padding: "5px" }}>
        <img src={props.photo.images[1].url} width="128" height="128" alt={props.photo.name} />
      </div>
  );
}

const LoginScreen = () => {
  return(
    <div className="LoginScreen">
    <h1>TopTrax</h1>
      <h2 style={{textAlign: "center", marginTop: 0, marginBottom: "3rem"}}>Discover your most played tracks on Spotify</h2>
      <a className="btn" href="http://toptrax-backend.herokuapp.com/login">Log in with Spotify <img src={spotifyIcon} alt="Spotify Icon" width="28" height="28" /></a>
      {/*<a className="btn" href="http://localhost:8888/login">Log in with Spotify <img src={spotifyIcon} alt="Spotify Icon" width="28" height="28" /></a>*/}
      <a className="btn github" target="_blank" rel="noopener noreferrer" href="https://github.com/michaelignacio/toptrax">View Source Code <img src={githubMark} alt="Github Mark" width="28" height="28" /></a>
    </div>
  );
}

const Chart = (props) => {
  console.log(props)
  if (props.data.isFetched) {
    return (
      <CSSTransitionGroup
      transitionName="example"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}>
        <div>
          <h1>Your Top 20 Tracks</h1>
          <div className="chartList">
            {(props.data.serverData).map((value, index) => {
              return <ChartItem song={value} index={index} key={index} />
            })}
          </div>
        </div>
        </CSSTransitionGroup>
    )
  }
  return (
    <div className='sweet-loading'>
      <ScaleLoader
        css={override}
        sizeUnit={"px"}
        size={150}
        color={'#fff'}
        loading={props.loading}
      />
    </div> 
  );
}

const ChartItem = (props) => {
  return (
    <div className="chart-item">
      <ChartPosition number={props.index+1} />
      <ArtistPhoto photo={props.song.album}/>
      <SongDetails details={props.song}/>
    </div>
  );
}

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

    axios.get(`https://api.spotify.com/v1/me/top/tracks`, config)
      .then(response => {
        console.log(response.data.items)
        this.setState({ 
          serverData: response.data.items,
          isFetched: true
        })
      }).catch((error) => {
        console.log(error)
      })
  }

  render () {
    return (
      <div className={this.state.isFetched ? 'App logged-in' : 'App' }>
        {this.state.isFetched ?
          <Chart data={this.state}/>
          : <LoginScreen/>
        }
      </div>
    );
  }
}

export default App;
