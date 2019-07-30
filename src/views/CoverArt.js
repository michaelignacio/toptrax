import React from 'react';
import styles from '../styles/ChartItem.module.css';

const CoverArt = (props) => {
  return (
      <div className={styles.CoverArt}>
        <img src={props.photo.images[1].url} width="128" height="128" alt={props.photo.name} />
      </div>
  );
}

export default CoverArt
