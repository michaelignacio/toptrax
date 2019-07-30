import React from 'react';
import ChartPosition from './ChartPosition';
import CoverArt from './CoverArt';
import SongDetails from './SongDetails';
import styles from '../styles/ChartItem.module.css'

const ChartItem = (props) => {
  return (
    <div className={styles.chartItem}>
      <ChartPosition number={props.index+1} />
      <CoverArt photo={props.song.album} />
      <SongDetails details={props.song} />
    </div>
  );
}

export default ChartItem
