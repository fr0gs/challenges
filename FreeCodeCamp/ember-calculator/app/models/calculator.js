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
  operandTwo: null
});

export default Calculator;
