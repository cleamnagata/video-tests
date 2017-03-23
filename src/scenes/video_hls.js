//import videojs from 'video.js';
//require('videojs-contrib-hls');

/**
 * @description
 *   video.js を使用した、HLS での動画再生サンプル
 *
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
    // ios 10 以上であれば、これで inline 再生可能
    video.setAttribute('playsinline', '');
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