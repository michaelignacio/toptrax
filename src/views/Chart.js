import React, { Component } from 'react';
import { ScaleLoader } from 'react-spinners';
import { CSSTransitionGroup } from 'react-transition-group';
import ChartItem from './ChartItem';
import styles from '../styles/Type.module.css';
import scaleLoaderStyle from '../styles/ScaleLoader';
const NUMBER_OF_SONGS = 10

class Chart extends Component {
  constructor(props) {
    super(props)

    const songSnippets = []
    const dataArray = props.data.serverData
    dataArray.length === NUMBER_OF_SONGS && dataArray.map((value, index) => {
      return songSnippets.push(new Audio(value.preview_url))
    })

    this.state = {
      songBeingPreviewed: false,
      isPlaying: false,
      songSnippets: songSnippets
    }
  }

  handleClick = (index) => {
    this.playSong(index)
  }

  endSong = () => {
    this.setState({
      isPlaying: false,
      songBeingPreviewed: -1
    }, () => {
      console.log('ended')
    })
  }

  playSong(index) {
    if (!this.state.isPlaying) {
    // No currently playing song - play user's song
      this.state.songSnippets[index].play()
      this.setState({ isPlaying: true })
    } else if ( this.state.songBeingPreviewed === index) {
      // User clicks on currently playing song (pause it)
      if ( this.state.isPlaying ) {
        this.state.songSnippets[index].pause()
        this.setState({
          isPlaying: false,
          songBeingPreviewed: -1
        })
      } else {
        this.state.songSnippets[index].play()
      }
    } else {
      // User plays another song (pause current song, then play new song)
      this.state.songSnippets[this.state.songBeingPreviewed].pause()
      this.state.songSnippets[index].play()
    }

    this.state.songSnippets[index].addEventListener('ended', () => this.endSong())

    this.setState({
      songBeingPreviewed: index
    }, () => {
      // console.log(this.state)
    })
  }

  render() {
    if (this.props.data.isLoggedIn && !this.props.data.isFetched) {
      return (
        <div className='sweet-loading'>
          <ScaleLoader
            css={scaleLoaderStyle}
            sizeUnit={"px"}
            size={150}
            color={'#fff'}
            loading={this.props.loading}
          />
        </div>
      );
    }

    return (
      <CSSTransitionGroup
        transitionName="example"
        transitionAppearTimeout={500}
        transitionAppear={true}
        transitionEnter={false}
        transitionLeave={false}
      >
        <h1 className={styles.h1Style}>Your Top {NUMBER_OF_SONGS} Tracks</h1>
        <div className="chartList">
          {(this.props.data.serverData).map((value, index) => {
            return <ChartItem song={value} index={index} key={index} play={this.handleClick} songBeingPreviewed={this.state.songBeingPreviewed} isAnythingPlaying={this.state.isPlaying} />
          })}
        </div>
      </CSSTransitionGroup>
    )
  }
}

export default Chart
