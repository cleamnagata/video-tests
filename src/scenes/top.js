import page from 'page';
import routes from 'config/routes';

/**
 * @class VideoJsScene
 */
export default
class TopScene {
  constructor(params) {
    console.log('TopScene');
    window.curent = this;
    this._init();
  }

  /**
   * @private
   */
  _init() {
    this.wrapElement = document.createElement('div');
    let index = 0;
    const self = this;
    routes.forEach(function(route) {
      if (route === 'top') return;
      self._createButton(route, index);
      ++index;
    });
    document.body.appendChild(this.wrapElement);
  }

  _createButton(route, index) {
    let button = document.createElement('button');
    button.textContent = route;
    button.style.marginRight = '10px';
    this.wrapElement.appendChild(button);
    button.onclick = function() {
      page(route);
    };
  }

  /**
   * dispose Player
   */
  close() {
    console.log('call close');
    document.body.removeChild(this.wrapElement);
    this.wrapElement = null;
  }
}