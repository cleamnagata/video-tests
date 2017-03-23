import VideoHlsCanvasScene from 'scenes/video/hls/canvas';
import init from 'init';

export default {
  '/video/hls/canvas': function() {
    init(VideoHlsCanvasScene, {}, []);
  }
};