import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/ChartItem.module.css';

class CoverArt extends Component {
  handleClick = () => {
    if (this.props.songSnippets[this.props.index]) {
      this.props.play(this.props.index)
    }
  }

  render() {
    const showPlayIcon = this.props.songBeingPreviewed && this.props.isAnythingPlaying ? true : false

    const snippet = this.props.songSnippets[this.props.index]

    return (
      <div className={ showPlayIcon ? `${ styles.isPlaying } ${ styles.coverArt }` : `${ styles.coverArt }` } onClick={this.handleClick}>
        <img src={this.props.photo.images[1].url} width="128" height="128" alt={this.props.photo.name} />
        {snippet && <FontAwesomeIcon icon={ showPlayIcon ? faPause : faPlay } className={styles.icon} /> }
      </div>
    )
  }
}

export default CoverArt
