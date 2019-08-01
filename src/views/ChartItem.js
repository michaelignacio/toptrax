import React, { Component } from 'react';
import ChartPosition from './ChartPosition';
import CoverArt from './CoverArt';
import SongDetails from './SongDetails';
import styles from '../styles/ChartItem.module.css';

class ChartItem extends Component {
  handleClick = () => {
    this.props.play(this.props.index)
  }

	render() {
		return (
			<div className={styles.chartItem}>
		      <ChartPosition number={this.props.index+1} />
		      <CoverArt photo={this.props.song.album} play={this.handleClick}/>
		      <SongDetails details={this.props.song} />
		    </div>
		)
	}
}

export default ChartItem
