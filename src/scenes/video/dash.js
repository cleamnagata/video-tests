/**
 * @description
 *   video.js を使用した、MPEG-DASH 形式の動画再生サンプル
 *   http://qiita.com/gabby-gred/items/c1a3dbe026f83dd7e1ff
 *
 * @class VideoDashScene
 */
export default
class VideoDashScene {
  constructor(params) {
    console.log('VideoDashScene');
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
    var player = videojs('example-dash-video');
    player.ready(function() {
      player.src({
        src: '/assets/video/mp4/discover/dash/discoverypartIIjonathanmitchellmp4_dash.mpd',
        type: 'application/dash+xml'
      });
      player.play();
    });
    this.player = player;
  }

  /**
   * HTML AudioElement を生成
   * @private
   */
  _createVideoElements() {
    const video = document.createElement('video');
    video.id = 'example-dash-video';
    video.className = 'video-js vjs-default-skin';
    video.width = 600;
    video.height = 300;
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