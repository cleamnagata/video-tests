//import videojs from 'video.js';
//require('videojs-contrib-hls');

/**
 * @description
 *   video.js を使用した、HLS での動画再生サンプル
 *   canvas での inline 再生を行う
 *   iOS 10 以上、android は対応可能
 *   webview であれば webkit-playsinline で10未満も対応可能
 *     正確には allowsInlineMediaPlaybackプロパティがYESに設定されている (UIWebViewでのみ有効になっている)
 *     モバイルSafariではこれがiPadでYES、iPhoneおよびiPod TouchでNOである
 * @class VideoHlsCanvasScene
 */
export default
class VideoHlsCanvasScene {
  constructor(params) {
    console.log('VideoHlsCanvasScene');
    window.currentScene = this;
    this._canvasWidth = 320;
    this._canvasHeight = 240;
    this._timerId = null;
    this._init();
  }

  /**
   * @private
   */
  _init() {
    const ua = window.navigator.userAgent;
    const isIPad = (/iPad/i).test(ua);
    const isIPhone = (/iPhone/i).test(ua) && !isIPad;
    const isIPod = (/iPod/i).test(ua);
    const isIOs = isIPad || isIPhone || isIPod;

    this._createCanvas();

    if (isIPhone) {
      this._iOSTest();
    }
    else {
      this._createVideoElements();
      this._createPlayer();
    }
  }

  /**
   * @private
   */
  _createCanvas() {
    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    this.canvas = canvas;
    this.canvas.width = this._canvasWidth;
    this.canvas.height = this._canvasHeight;
    this.ctx = canvas.getContext('2d');
  }

  /**
   * @private
   */
  _iOSTest() {
    const video = document.createElement('video');
    // ios 10 以上であれば、これで inline 再生可能
    video.setAttribute('playsinline', '');
    video.style.visibility = 'hidden';
    document.body.appendChild(video);
    video.src = '/assets/video/mp4/dolphin/stream/playlist.m3u8';
    video.addEventListener('canplaythrough', function() {

    }, false);
    this.video = video;
    var self = this;
    this.canvas.onclick = function() {
      video.play();
      self._drawCanvas();
    };
  }

  /**
   * Create video player
   * @private
   */
  _createPlayer() {
    var self = this;
    this.player = videojs('example-video');
    this.player.src({
      src: '/assets/video/mp4/dolphin/stream/playlist.m3u8',
      type: 'application/x-mpegURL'
    });
    this.player.ready(function() {
      self._drawCanvas();
    });
    this.canvas.onclick = function() {
      self.player.play();
    };
  }

  /**
   * @private
   */
  _drawCanvas() {
    const ctx = this.ctx;
    const video = this.video;

    function drawVideo() {
      ctx.drawImage(video, 0, 0);
    }

    this._timerId = setInterval(function() {
      drawVideo();
    }, 1000 / 30);
  }

  /**
   * HTML AudioElement を生成
   * @private
   */
  _createVideoElements() {
    const video = document.createElement('video');
    video.id = 'example-video';
    video.className = 'video-js vjs-default-skin';
    video.style.visibility = 'hidden';
    video.style.width = this._canvasWidth + 'px';
    video.style.height = this._canvasHeight + 'px';
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