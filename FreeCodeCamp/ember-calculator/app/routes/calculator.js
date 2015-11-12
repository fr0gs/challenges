/*Import the model calculator into the Route.
  This way the route will call the Calculator model and
  will make use of properties and computed properties that
  the model exposes.
*/
import Calculator from 'ember-calculator/models/calculator';

//The Calculator Route is created
var CalculatorRoute = Ember.Route.extend({
  /*
    This is the exposed model. By assigning the calculator model object to the calculator route
    model we can access all it's properties from the view. Convention over Configuration.
  */
  model: function() {
    return Calculator.create({
      title: 'My Simple Ember Calculator',
      status: 'initial',
      result: ''
    })
  },

  /*
    This is the series of actions that can (will) be triggered from the template,
    by clicking buttons, etc..
  */
  actions: {
    operation: function (oper) {
      //check if there is any number in the result, otherwise do nothing.
      if (this.get('controller').get('model.result') !== '') {
        if (this.get('controller').get('model.status') === 'initial') {
          this.get('controller').setProperties({
            'operandOne': this.get('controller').get('model.result'),
            'currentOp': oper,
            
          });
        }
      }
    },

    clickedNum: function(clicked) {
      var num = this.get('controller').get('model.result');
      this.get('controller').set('model.result', num += clicked);
    },
    clear: function() {
        //I can only access model properties by setting them in the controller.
        this.get('controller').setProperties({
          'model.result': '',
          'model.status': 'initial'
        });
    }
  }
});

export default CalculatorRoute;
