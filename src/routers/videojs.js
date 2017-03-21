import VideoJsScene from 'scenes/videojs';
import init from 'init';

export default {
  '/videojs': function() {
    init(VideoJsScene, {}, []);
  }
};