import VideoDashScene from 'scenes/video/dash';
import init from 'init';

export default {
  '/video/dash': function() {
    init(VideoDashScene, {}, []);
  }
};