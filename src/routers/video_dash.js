import VideoDashScene from 'scenes/video_dash';
import init from 'init';

export default {
  '/video_dash': function() {
    init(VideoDashScene, {}, []);
  }
};