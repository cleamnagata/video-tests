/**
 * @description
 *   video.js を使用した、HLS での動画再生サンプル
 *   canvas での inline 再生を行う
 *   iOS 10 以上、android は対応可能
 *   webview であれば webkit-playsinline で10未満も割と簡単に対応可能
 *     正確には allowsInlineMediaPlaybackプロパティがYESに設定されている (UIWebViewでのみ有効になっている)
 *     モバイルSafariではこれがiPadでYES、iPhoneおよびiPod TouchでNOである
 *   iOS 10 以下の場合、audio と video 二つ用意し、audio の再生に合わせて、video の currentTime 変更
 *   する事で、擬似的に再生出来る。 (m3u8 の形式又は、ts の形式によって再生できないものもあるっぽいが、、)
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
    //const isIPod = (/iPod/i).test(ua);
    //const isIOs = isIPad || isIPhone || isIPod;

    // canvas
    this._createCanvas();

    if (isIPhone) {
      const version = (function() {
        const match = ua.match(/OS (\d+)_/i);
        if (match && match[1]) {
          return match[1];
        }
        return null;
      }());
      if (version >= 10) {
        this._iOS10Play();
      }
      else {
        this._iOSPlay();
      }
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
   * ios 10以下での HLS再生
   * @private
   */
  _iOSPlay() {
    let lastTime = Date.now();

    const canvas = this.canvas;
    const context = this.ctx;
    const audio = document.createElement('audio');
    const video = document.createElement('video');
    const source = document.createElement('source');
    source.src = '/assets/video/mp4/dolphin/stream/playlist.m3u8';
    source.type = 'application/x-mpegURL';
    const aSource = document.createElement('source');
    aSource.src = '/assets/video/mp4/dolphin/stream/playlist.m3u8';
    aSource.type = 'application/x-mpegURL';
    document.body.appendChild(video);
    video.style.visibility = 'hidden';
    video.muted = true;
    video.appendChild(source);
    audio.appendChild(aSource);

    audio.addEventListener('play', function() {
      lastTime = Date.now();
      loop();
    });
    audio.addEventListener('ended', function() {
      audio.currentTime = 0;
      audio.pause();
    });

    //
    video.addEventListener('canplaythrough', function() {
      draw();
    });
    video.addEventListener('timeupdate', function() {
      draw();
    });

    video.load();

    // requestAnimationFrame で video の currentTimeを更新する
    function loop() {
      var time = Date.now();
      var elapsed = (time - lastTime) / 1000;
      if (elapsed >= (1 / 24)) {
        lastTime = time;
        video.currentTime = video.currentTime + elapsed;
      }
      if (video.currentTime >= video.duration) {
        video.currentTime = 0;
      }
      if (!audio.paused) requestAnimationFrame(loop);
    }

    // canvas 描画
    function draw() {
      context.drawImage(video, 0, 0);
    }

    canvas.onclick = function() {
      video.currentTime = 0;
      audio.currentTime = 0;
      audio.play();
    };

    this.video = video;
    this.audio = audio;
  }

  /**
   * ios play with hls
   * @private
   */
  _iOS10Play() {
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
    if (this.player) {
      this.player.dispose();
    }
    if (this._timerId) {
      clearTimeout(this._timerId);
    }
  }
}