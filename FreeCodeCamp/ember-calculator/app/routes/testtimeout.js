import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    arrayMessages: ["Application is about to explode", "I just forgot my pants", "Yes.. whatever..." ];
    return arrayMessages;
  }
});
