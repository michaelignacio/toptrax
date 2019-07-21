import React from 'react';
import ChartPosition from './ChartPosition';
import ArtistPhoto from './ArtistPhoto';
import SongDetails from './SongDetails';
import styles from '../styles/ChartItem.module.css'

const ChartItem = (props) => {
  return (
    <div className={styles.chartItem}>
      <ChartPosition number={props.index+1} />
      <ArtistPhoto photo={props.song.album} />
      <SongDetails details={props.song} />
    </div>
  );
}

export default ChartItem
