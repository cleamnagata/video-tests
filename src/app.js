import page from 'page'; // SPA module
import routes from 'config/routes';
import _ from 'underscore';
window._ = _;

routes.forEach(function(route) {
  var routes = require(`routers/${route}`).default;
  _.each(routes, function(cb, path) {
    page(path, cb);
  });
});

page();