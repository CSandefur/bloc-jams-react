import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import './Album.css';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      currentVolume: 0.5,
      currentVolumeDisplay: 50 + "%",
      isPlaying: false,
      isPaused: false,
      isHovered: false,
      hoveredIndex: album.songs[0],
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e=> {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumecontrol: e => {
        this.setState({ currentVolume: this.audioElement.volume });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumecontrol', this.eventListeners.volumecontrol);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumecontrol', this.eventListeners.volumecontrol);
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
    this.setState({ isPaused: false });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
    this.setState({ isPaused: true });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex -1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(this.state.album.songs.length - 1, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleMouseEnter(song, index) {
    const indexAccessor = index;
    this.setState({ isHovered: true });
    this.setState({ hoveredIndex: index });
    console.log(indexAccessor);
  }

  handleMouseLeave(song, index) {
    this.setState({ isHovered: false });
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ currentVolume: newVolume });
    this.setState({ currentVolumeDisplay: parseInt(newVolume * 100) + "%" })
  }

  formatTime(x){
    if (typeof x === 'number') {
      let formatConversion = x / 60;
      let minutes = parseInt(formatConversion);
      let longSeconds = x % 60;
      var tester = parseInt(longSeconds);
      if (tester > 10) {
        let seconds = longSeconds.toFixed(0);
        let timeString = minutes + ':' + seconds;
        return timeString;
      } else {
        let seconds = '0' + tester;
        let timeString = minutes + ':' + seconds;
        return timeString;
      }
    } else {
      return "-:--";
    }
  }

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
            {
              this.state.album.songs.map( (song, index) =>
                <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.handleMouseEnter(song, index)} onMouseLeave={() => this.handleMouseLeave(song, index)}>
                  <td className="number-icon">{this.state.isPaused && this.state.currentSong  === song ? <span className="icon ion-md-play"></span> : this.state.isPlaying && this.state.currentSong === song ? <span className="icon ion-md-pause"></span> : this.state.isHovered && this.state.hoveredIndex === index ? <span className="icon ion-md-play"></span> : index + 1}</td>
                  <td>{song.title}</td>
                  <td>{this.formatTime(parseFloat(song.duration))}</td>
                </tr>
              )
            }
          </tbody>
        </table>
        <PlayerBar
          className="playerBar"
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          currentVolume={this.state.currentVolume}
          currentVolumeDisplay={this.state.currentVolumeDisplay}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
          formatTime={(x) => this.formatTime(x)}
        />
      </section>
    );
  }
}

export default Album;
