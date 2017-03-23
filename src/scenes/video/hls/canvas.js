//import videojs from 'video.js';
//require('videojs-contrib-hls');

/**
 * @description
 *   video.js を使用した、HLS での動画再生サンプル
 *   canvas での inline 再生を行う
 *
 * @class VideoHlsCanvasScene
 */
export default
class VideoHlsCanvasScene {
  constructor(params) {
    console.log('VideoHlsCanvasScene');
    this._init();
    window.curent = this;
  }

  /**
   * @private
   */
  _init() {
    this._createCanvas();
    this._createVideoElements();
    this._createPlayer();
  }

  /**
   * @private
   */
  _createCanvas() {
    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  /**
   * Create video player
   * @private
   */
  _createPlayer() {
    //this.player = videojs(this.video);
    this.player = videojs('example-video');
    console.log(this.player);
    // TODO: FIX
    //this.player.ready(function() {
    //  console.log('ready');
    //});
    //this.player.play();
    //this.video.currentTime += 1000/app.fps/1000;
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
    source.src = '/assets/video/mp4/discover/stream/playlist.m3u8';
    video.appendChild(source);
    this.video = video;
    document.body.appendChild(video);
  }

  /**
   * dispose Player
   */
  close() {
    this.player.dispose();
  }
}