//import videojs from 'video.js';
//require('videojs-contrib-hls');

/**
 * @class VideoHlsScene
 */
export default
class VideoHlsScene {
  constructor(params) {
    console.log('VideoHlsScene');
    this._init();
    window.curent = this;
  }

  /**
   * @private
   */
  _init() {
    this._createVideoElements();
    this._createPlayer();
  }

  /**
   * Create video player
   * @private
   */
  _createPlayer() {
    this.player = videojs('example-video');
    this.player.play();
  }

  /**
   * HTML AudioElement を生成
   * @private
   */
  _createVideoElements() {
    const video = document.createElement('video');
    video.id = 'example-video';
    video.className = 'video-js vjs-default-skin';
    video.width = 600;
    video.height = 300;
    const source = document.createElement('source');
    source.type = 'application/x-mpegURL';
    source.src = 'assets/video/mp4/discover/stream/playlist.m3u8';
    video.appendChild(source);
    this.videoElement = video;
    document.body.appendChild(video);
  }

  /**
   * dispose Player
   */
  close() {
    this.player.dispose();
  }
}