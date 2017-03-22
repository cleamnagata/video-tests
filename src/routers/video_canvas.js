import VideoCanvasScene from 'scenes/video_canvas';
import init from 'init';

export default {
  '/video_canvas': function() {
    init(VideoCanvasScene, {}, []);
  }
};