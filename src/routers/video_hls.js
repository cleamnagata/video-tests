import VideoHlsScene from 'scenes/video_hls';
import init from 'init';

export default {
  '/video_hls': function() {
    init(VideoHlsScene, {}, []);
  }
};