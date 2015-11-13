/*
  This is the Calculator model. Although it is tempting to add some logic here,
  I(we) should only include (computed) properties and data. From here one could
  retrieve data from a DB or a REST api I guess without breaking the design pattern.
*/
var Calculator = Ember.Object.extend({
  operation: {
    '+': function(op1, op2) {
      return (op1 + op2)
    },
    '-': function (op1, op2) {
      return (op1 - op2)
    },
    'X': function (op1, op2) {
      return (op1 * op2)
    },
    '%': function (op1, op2) {
      return (op1 / op2)
    }
  },

  title: null,
  result: null,
  status: null,
  currentOp: null,
  operandOne: null,
  operandTwo: null,


  executeOp: function (operator, op1, op2) {
    var func = this.operation[operator];
    return func(op1, op2);
  },

  printCalc: function () {
    return 'mode.result: ' + this.get('result') + '\n'+ 'model.status: ' + this.get('status') + '\n' +
              'model.currentOp: ' + this.get('currentOp') + '\n' + 'model.operandOne: ' + this.get('operandOne') + '\n' +
              'model.operandTwo: ' + this.get('operandTwo') + '\n' + '++++++++++++++++++++++++++++++++++++++';
  }.property('result', 'status', 'currentOp', 'operandOne', 'operandTwo')
});

export default Calculator;
