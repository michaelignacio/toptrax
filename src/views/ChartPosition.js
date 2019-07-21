import React from 'react';
import styles from '../styles/ChartItem.module.css'

const ChartPosition = (props) => {
  return (
      <div className={styles.position}>{props.number}</div>
  ); 
}

export default ChartPosition
