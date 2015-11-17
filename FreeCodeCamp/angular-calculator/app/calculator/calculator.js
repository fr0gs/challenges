'use strict';

angular.module('myApp.CalculatorModule', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/calculator', {
    templateUrl: 'calculator/calculator.html',
    controller: 'CalculatorController'
  });
}])

.factory('CalculatorService', function () {
  class Calculator {
    constructor() {
      this.title = 'AngularJS Simple Javascript Calculator';
      this.status = 'initial';
      this.result = '';
      this.currentOp = null;
      this.operandOne = null;
      this.operandTwo = null;
      this.operation = {
        '+': function(op1, op2) {
          return (op1 + op2);
        },
        '-': function (op1, op2) {
          return (op1 - op2);
        },
        'X': function (op1, op2) {
          return (op1 * op2);
        },
        '%': function (op1, op2) {
          return (op1 / op2);
        }
      };
    }
    executeOp(operator, op1, op2) {
      var func = this.operation[operator]; //If this fails I need to bind the this to the upper context
      return func(op1, op2);
    }
  }

  return Calculator;
})

.controller('CalculatorController', ['$scope', 'CalculatorService', function($scope, CalculatorService) {

  var calc = new CalculatorService();

  $scope.title = calc.title;
  $scope.result = '';


  $scope.operation = function(oper) {
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
  };

  $scope.clickedNum = function(clicked) {
    calc.result += clicked;
    $scope.result = calc.result;
  };

  $scope.clear = function () {
    $scope.result = '';
    calc.result = '';
    calc.status = 'initial';
  };
}]);
