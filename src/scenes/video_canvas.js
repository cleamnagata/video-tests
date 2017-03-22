import videojs from 'video.js';
import VideoJsScene from 'scenes/videojs';

/**
 * @class VideoPixiScene
 * @extends VideoJsScene
 */
export default
class VideoCanvasScene extends VideoJsScene {
  constructor(params) {
    super(params);
    console.log('VideoCanvasScene');
    // TODO: videojs element to canvas
  }
}