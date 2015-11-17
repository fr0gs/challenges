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
    //Get current result and status from the calculator
    let res = calc.result;
    let stat = calc.status;

    $scope.result = ''; //So it clears in view's input textbox
    calc.result = '';

    //check if there is any number in the result, otherwise do nothing.
    if (stat === 'initial') {
      calc.operandOne = res;
      calc.currentOp = oper;
      calc.status = 'middleop';
    }

    if (stat === 'middleop') {
      //Calculate result and assign to first operand (always).
      let operation = calc.currentOp;
      calc.operandTwo = res;

      let firstOp = parseFloat(calc.operandOne);
      let secondOp = parseFloat(calc.operandTwo);
      let resAux = calc.executeOp(operation, firstOp, secondOp);

      calc.currentOp = oper;
      calc.operandOne = resAux;

      //If the operand clicked is the equals it shows the result.
      if (oper === '=') {
        $scope.result = resAux;
        calc.result = '';
        calc.status = 'initial';
        calc.operandOne = '';
        calc.operandTwo = '';
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
