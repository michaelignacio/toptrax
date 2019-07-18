import React from 'react';

const ArtistPhoto = (props) => {
  return (
      <div style={{ padding: "5px" }}>
        <img src={props.photo.images[1].url} width="128" height="128" alt={props.photo.name} />
      </div>
  );
}

export default ArtistPhoto
