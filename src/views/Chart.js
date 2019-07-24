import React, { Component } from 'react';
import { ScaleLoader } from 'react-spinners';
import { CSSTransitionGroup } from 'react-transition-group';
// import ChartItem from './ChartItem';
import styles from '../styles/Type.module.css';
import scaleLoaderStyle from '../styles/ScaleLoader';


import ChartPosition from './ChartPosition';
import ArtistPhoto from './ArtistPhoto';
import SongDetails from './SongDetails';
import itemStyles from '../styles/ChartItem.module.css'

class Chart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      songBeingPreviewed: -1,
      audio: null,
      isPlaying: false,
      songSnippets: []
    }
  }

  handleClick(props) {
    if (!this.state.isPlaying) {
      this.setState({ audio: new Audio(props) 
      }, () => {
        if (!this.state.isPlaying) {
          this.setState({ isPlaying: true }, () => {
            this.state.audio.play()
          })
        }
      });
    } else {
      this.setState({ isPlaying: false }, () => {
          this.state.audio.pause()
        })
    }
  }

  mapSongs(props) {
    // console.log(props)
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
        <h1 className={styles.h1Style}>Your Top 20 Tracks</h1>
        <div className="chartList">
          {(this.props.data.serverData).map((value, index) => {
            // return <ChartItem song={value} index={index} key={index} onClick={this.handleClick}/>
            // this.mapSongs(value.preview_url)

            return (
              <div className={itemStyles.chartItem} key={index} onClick={() => this.handleClick(value.preview_url)}>
                <ChartPosition number={index+1} />
                <ArtistPhoto photo={value.album} />
                <SongDetails details={value} />
              </div>
            )
          })}
        </div>
      </CSSTransitionGroup>
    )
  }
}

export default Chart
