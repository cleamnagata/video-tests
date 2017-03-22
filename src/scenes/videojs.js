import videojs from 'video.js';

/**
 * @class VideoJsScene
 */
export default
class VideoJsScene {
  constructor(params) {
    console.log('VideoJsScene');
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
    this.player = videojs('example_video_1', {}, function onPlayerReady() {
      this.play();
    });
  }

  /**
   * HTML AudioElement を生成
   * 公式のソースを使用
   * @private
   */
  _createVideoElements() {
    const video = document.createElement('video');
    video.id = 'example_video_1';
    video.className = 'video-js vjs-default-skin';
    video.width = 640;
    video.height = 264;
    video.poster = 'http://vjs.zencdn.net/v/oceans.png';
    ['mp4', 'webm', 'ogg'].forEach(function(type) {
      const source = document.createElement('source');
      source.type = `video/${type}`;
      source.src = `http://vjs.zencdn.net/v/oceans.${type}`;
      video.appendChild(source);
    });
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