/*Import the model calculator into the Route.
  This way the route will call the Calculator model and
  will make use of properties and computed properties that
  the model exposes.
*/
import Calculator from 'ember-calculator/models/calculator';
import Ember from 'ember';

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
    });
  },

  /*
    This is the series of actions that can (will) be triggered from the template,
    by clicking buttons, etc..
  */
  actions: {
    //It will only give the result when both numbers are introduced
    getResult: function () {
      if (this.get('controller').get('model.status') === 'ready') {
        this.get('controller').set('model.result', this.get('controller').get('model.operandOne'));
      }
    },

    operation: function (oper) {

      let res = this.get('controller').get('model.result');
      let stat = this.get('controller').get('model.status');

      //check if there is any number in the result, otherwise do nothing.
      if (res !== '') {
        if (stat === 'initial' || stat === 'ready') {
          this.get('controller').setProperties({
            'model.operandOne': res,
            'model.currentOp': oper,
            'model.status': 'middleop'
          });
        }
      }
    },

    clickedNum: function(clicked) {
      //If previous operation was done and a new number is clicked, clear temporary result.
      if ((this.get('controller').get('model.status') === 'middleop')
          || (this.get('controller').get('model.status') === 'ready')) {

        this.get('controller').set('model.result', '');
      }

      //If the calc is in the middle of an op: "2+", "3*"..
      //The status is changed to both operands received, and
      //the actual number is cleared.
      let resAux = this.get('controller').get('model.result');
      this.get('controller').set('model.result', resAux += clicked);

      //After inserting second number, we calculate a ready-to-show result,
      //change result to "ready" and wait.
      if (this.get('controller').get('model.status') === 'middleop') {
        let res = this.get('controller').get('model.result');
        let operation = this.get('controller').get('model.currentOp');

        this.get('controller').set('model.operandTwo', res);
        let firstOp = parseInt(this.get('controller').get('model.operandOne'));
        let secondOp = parseInt(this.get('controller').get('model.operandTwo'));
        let resAux = this.get('controller').get('model').executeOp(operation, firstOp, secondOp);

        this.get('controller').setProperties({
          'model.status': 'ready',
          'model.currentOp': '',
          'model.operandOne': resAux,
          'model.operandTwo': ''
        });
        //Set status to ready
      }
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
