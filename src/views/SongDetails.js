import React from 'react';
import styles from '../styles/ChartItem.module.css';

const SongDetails = (props) => {
  return (
      <div className={styles.songDetails}>
        <p className={styles.title}>{props.details.name}</p>
        <p className={styles.artists}>
          {props.details.artists
            .map((value) => value.name)
            .reduce((prev, curr) => [prev, ', ', curr])}
        </p>
      </div>
  );
}

export default SongDetails
