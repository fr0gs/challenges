import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

//A new route to the calculator router when /calculator is accessed.
Router.map(function() {
  this.route('calculator', { path: '/calculator' });
});

export default Router;
