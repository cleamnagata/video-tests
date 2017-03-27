import VideoCanvasScene from 'scenes/video/canvas';
import init from 'init';

export default {
  '/video/canvas': function() {
    init(VideoCanvasScene, {}, []);
  }
};