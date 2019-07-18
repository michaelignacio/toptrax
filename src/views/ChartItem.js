import React from 'react';
import ChartPosition from './ChartPosition';
import ArtistPhoto from './ArtistPhoto';
import SongDetails from './SongDetails';

const ChartItem = (props) => {
  return (
    <div className="chart-item">
      <ChartPosition number={props.index+1} />
      <ArtistPhoto photo={props.song.album} />
      <SongDetails details={props.song} />
    </div>
  );
}

export default ChartItem
