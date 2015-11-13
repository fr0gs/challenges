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
    operation: function (oper) {
      let res = this.get('controller').get('model.result');
      let stat = this.get('controller').get('model.status');

      this.get('controller').set('model.result', '');

      //check if there is any number in the result, otherwise do nothing.
      if (stat === 'initial') {
        this.get('controller').setProperties({
          'model.operandOne': res,
          'model.currentOp': oper,
          'model.status': 'middleop'
        });
      }

      if (stat === 'middleop') {
        //Calculate result and assign to first operand (always).
        let operation = this.get('controller').get('model.currentOp');

        this.get('controller').set('model.operandTwo', res); //set result as the second operand.
        let firstOp = parseFloat(this.get('controller').get('model.operandOne'));
        let secondOp = parseFloat(this.get('controller').get('model.operandTwo'));
        let resAux = this.get('controller').get('model').executeOp(operation, firstOp, secondOp);

        this.get('controller').setProperties({
          'model.currentOp': oper, //current operation is now the passed one
          'model.operandOne': resAux
        });

        //If the operand clicked is the equals it shows the result.
        if (oper === '=') {
          this.get('controller').setProperties({
            'model.result': resAux,
            'model.status': 'initial',
            'model.operandOne': '',
            'model.operandTwo': ''
          });
        }
      }
    },

    clickedNum: function(clicked) {
      //If calc is in the middle of an op: "2+", "3*"..
      //The status is changed to both operands received, and
      //the actual number is cleared.
      let resAux = this.get('controller').get('model.result');
      this.get('controller').set('model.result', resAux += clicked);

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
