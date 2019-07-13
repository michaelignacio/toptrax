import React from 'react';
import './App.scss';

function ChartItem() {
  return (
    <div className="chart-item">
      <ChartPosition/>
      <ArtistPhoto/>
      <SongDetails/>
    </div>
  );
}

function SongDetails() {
  let titleStyle = { fontWeight: "700", marginBottom: "5px", marginTop: "0" }
  return (
      <div style={{ paddingLeft: "20px", marginTop: "20px" }}>
        <p style={titleStyle}>Old Town Road</p>
        <p style={{ fontSize: ".9rem", marginTop: "5px" }}>Lil Nas X ft. Billy Ray Cyrus</p>
      </div>
  );
}

function ChartPosition() {
  return (
      <div className="position"> 1 </div>
  );
}

function ArtistPhoto() {
  return (
      <div style={{ padding: "5px" }}>
        <img src="https://charts-static.billboard.com/img/2019/03/lil-nas-x-8wa-87x87.jpg" alt=""/>
      </div>
  );
}

function App() {
  return (
    <div className="App">
      <ChartItem />
    </div>
  );
}

export default App;
