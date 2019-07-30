import React, { Component } from 'react';
import { ScaleLoader } from 'react-spinners';
import { CSSTransitionGroup } from 'react-transition-group';
import ChartItem from './ChartItem';
import styles from '../styles/Type.module.css';
import scaleLoaderStyle from '../styles/ScaleLoader';

class Chart extends Component {
  constructor(props) {
    super(props)

    const songSnippets = []
    const dataArray = props.data.serverData
    dataArray.length === 20 && dataArray.map((value, index) => {
      return songSnippets.push(new Audio(value.preview_url))
    })

    this.state = {
      songBeingPreviewed: -1,
      isMapping: false,
      audio: null,
      isPlaying: false,
      songSnippets: songSnippets
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    console.log('test')
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
            return <ChartItem song={value} index={index} key={index} onClick={this.handleClick} />
          })}
        </div>
      </CSSTransitionGroup>
    )
  }
}

export default Chart
