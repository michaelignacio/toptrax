import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';
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
        <div style={{ paddingLeft: "20px", marginTop: "20px" }}>
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
        <h1>Your Hot 100</h1>
        {(this.props.songs).map((value, index) => {
          return <ChartItem song={value} index={index} key={index} />
        })}
      </div>
    )
  }
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
      headers: {'Authorization': 'Bearer ' + accessToken}
    }

    axios.get(`https://api.spotify.com/v1/me/top/tracks`,
      config)
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
      <div className="App">
        {this.state.authorized ?
          <Chart songs={this.state.serverData} />
          : 'login'
        }
      </div>
    );
  }
}

export default App;
