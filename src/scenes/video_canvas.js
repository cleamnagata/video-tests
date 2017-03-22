import videojs from 'video.js';
import VideoJsScene from 'scenes/videojs';

/**
 * @description
 *   video.js を使用した、動画再生と、canvas への転写サンプル
 *   TODO: 転写部分の実装
 *
 * @class VideoPixiScene
 * @extends VideoJsScene
 */
export default
class VideoCanvasScene extends VideoJsScene {
  constructor(params) {
    super(params);
    console.log('VideoCanvasScene');
    console.log('this route Unimplemented ....');
    // TODO: videojs element to canvas
  }
}