import React from 'react';
import {
  Player,
  Video,
  Controls,
  ControlContainer,
  ProgressRange,
  ProgressBar,
  ControlGroup,
  FullScreen,
  PlayButton,
} from './styled';
import FeatherIcon from 'feather-icons-react';
// import { throwServerError } from '@apollo/client';
class PlayerComp extends React.Component {
  constructor(props) {
    super(props);
    this.video = React.createRef();
    this.progressRange = React.createRef();
    this.progressBar = React.createRef();
    this.player = React.createRef();
    this.state = {
      isVideoPlaying: false,
      fullScreen: false,
    };
  }
  componentDidMount() {
    const video = this.video.current;
    // video.addEventListener('click', this.tooglePlay);
    this.progressRange.current.addEventListener('click', this.setProgress);
    video.addEventListener('click', this.tooglePlay);
    video.addEventListener('canplay', this.updateProgress);
    video.addEventListener('timeupdate', this.updateProgress);
  }
  updateProgress = (e) => {
    const video = this.video.current;
    try {
      const progressBar = this.progressBar.current;
      progressBar.style.width = `${
        (video.currentTime / video.duration) * 100
      }%`;
    } catch (e) {
      // this.video.current.pause();
    }
  };
  setProgress = (e) => {
    try {
      const progressRange = this.progressRange.current;
      const progressBar = this.progressBar.current;
      const video = this.video.current;
      const newTime = e.offsetX / progressRange.offsetWidth;
      progressBar.style.width = `${newTime * 100}%`;
      video.currentTime = newTime * video.duration;
    } catch (e) {
      this.video.current.pause();
    }
  };
  tooglePlay = () => {
    const video = this.video.current;
    if (this.props.isInPreviewProduct) {
      return;
    }
    if (video.paused) {
      video.play();
      this.setState(() => ({ isVideoPlaying: true }));
    } else {
      video.pause();
      this.setState(() => ({ isVideoPlaying: false }));
    }
  };
  handleFullScreen = () => {
    if (this.props.isInPreviewProduct) {
      return;
    }
    try {
      const player = this.player.current;

      if (!this.state.fullScreen) {
        this.openFullscreen(player);
      } else {
        this.closeFullscreen(player);
      }
      this.setState((prevState) => ({ fullScreen: !prevState.fullScreen }));
    } catch (e) {
      //console.log(e);
      //console.log('we have a problem on full screen mode');
    }
  };

  /* View in fullscreen */
  openFullscreen = (elem) => {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
    this.video.current.classList.add('video__fullscreen');
  };

  /* Close fullscreen */
  closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
    this.video.current.classList.remove('video__fullscreen');
  };
  render() {
    // https://pixabay.com/videos/download/video-31377_tiny.mp4?attachment
    return (
      <Player ref={this.player} style={this.props.customStyle}>
        <Video
          ref={this.video}
          id="my__video"
          src={this.props.src}
          playsinline
        />
        {!this.props.isInPreviewProduct && (
          <PlayButton onClick={this.tooglePlay}>
            {this.state.isVideoPlaying ? (
              <FeatherIcon icon="pause-circle" size={32} />
            ) : (
              <FeatherIcon icon="play-circle" size={32} />
            )}
          </PlayButton>
        )}

        <Controls>
          <ControlContainer>
            <ProgressRange onClick={this.seeking} ref={this.progressRange}>
              <ProgressBar ref={this.progressBar} />
            </ProgressRange>
            <ControlGroup>
              <FullScreen onClick={this.handleFullScreen}>
                <FeatherIcon size={16} icon="maximize" />
              </FullScreen>
            </ControlGroup>
          </ControlContainer>
        </Controls>
      </Player>
    );
  }
}

export default PlayerComp;
