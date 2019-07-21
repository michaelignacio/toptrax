import React from 'react';
import styles from '../styles/ChartItem.module.css';

const SongDetails = (props) => {
  return (
      <div className={styles.songDetails}>
        <p style={{ fontWeight: "700", marginBottom: "5px", marginTop: "0" }}>{props.details.name}</p>
        <p style={{ fontSize: ".9rem", marginTop: "5px" }}>
          {props.details.artists
            .map((value) => value.name)
            .reduce((prev, curr) => [prev, ', ', curr])}
        </p>
      </div>
  );
}

export default SongDetails
