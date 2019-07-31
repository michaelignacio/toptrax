import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/ChartItem.module.css';

const CoverArt = (props) => {
  return (
      <div className={styles.coverArt}>
        <img src={props.photo.images[1].url} width="128" height="128" alt={props.photo.name} />
        <FontAwesomeIcon icon={ faPlay } className={styles.icon} />
      </div>
  );
}

export default CoverArt
