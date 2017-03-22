import TopScene from 'scenes/top';
import init from 'init';

export default {
  '/': function() {
    init(TopScene, {}, []);
  }
};