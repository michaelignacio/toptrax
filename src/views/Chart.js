import React from 'react';
import { ScaleLoader } from 'react-spinners';
import { CSSTransitionGroup } from 'react-transition-group';
import ChartItem from './ChartItem';
import styles from '../styles/Type.module.css';
import scaleLoaderStyle from '../styles/ScaleLoader';

const Chart = (props) => {
    if (props.data.isLoggedIn && !props.data.isFetched) {
      return (
        <div className='sweet-loading'>
          <ScaleLoader
            css={scaleLoaderStyle}
            sizeUnit={"px"}
            size={150}
            color={'#fff'}
            loading={props.loading}
          />
        </div> 
      );
    }
    return (
      <div>
      <CSSTransitionGroup
        transitionName="example"
        transitionAppearTimeout={500}
        transitionAppear={true}
        transitionEnter={false}
        transitionLeave={false}
      >
        <h1 className={styles.h1Style}>Your Top 20 Tracks</h1>
        <div className="chartList">
          {(props.data.serverData).map((value, index) => {
            return <ChartItem song={value} index={index} key={index} />
          })}
        </div>
      </CSSTransitionGroup>
      </div>
    )
}

export default Chart
