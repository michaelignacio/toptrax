import React from 'react';
import { ScaleLoader } from 'react-spinners';
import { CSSTransitionGroup } from 'react-transition-group';
import ChartItem from './ChartItem';

const scaleLoaderStyle = {
  width: "40px",
  height: "40px",
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  margin: "auto"
}

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
        <h1>Your Top 20 Tracks</h1>
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
