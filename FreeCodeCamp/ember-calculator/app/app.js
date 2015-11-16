import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

var App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix, //'ember-calculator'
  podModulePrefix: config.podModulePrefix, //does not exist
  Resolver: Resolver //No idea what this is
});

loadInitializers(App, config.modulePrefix);

export default App;