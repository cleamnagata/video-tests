import VideoHlsScene from 'scenes/video/hls';
import init from 'init';

export default {
  '/video/hls': function() {
    init(VideoHlsScene, {}, []);
  }
};