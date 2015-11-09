/*Declare pomodoro module, and configure that when route /pomodoro
  is requested, it will be handled by PomodoroCtrl controller and rendered
  by pomodoro.html view.
*/
var app = angular.module('myApp.pomodoro', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pomodoro', { //when route is called
    templateUrl: 'pomodoro/pomodoro.html', //this tempalte is rendered
    controller: 'PomodoroController' //and this controller will handle the view
  });
}])

/*
  Filters are used to format output in the views, by transforming values the
  way we want. Filters can be used inside controllers too. It is strongly
  discouraged to use stateful filters, which mean that they depend in say
  some variables in the scope. Better feed each filter with all the information
  they need to successfully execute (stateless)
*/
.filter('visualTimerFilter', function () {
  return function (input) {
    input = input || "";
    var output = Number(input);
    var h = Math.floor(output / 3600);
    var m = Math.floor(output % 3600 / 60);
    var s = Math.floor(output % 3600 % 60);
    return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
  }
})

/*
  Controllers serve to augment the scope. Controllers will call
  services but should not do any business logic inside them.
  Services can be injected into the controller.
*/

.controller('PomodoroController', ["$rootScope", "$scope", "$interval", function($scope, $rootScope, $interval) {

  /*
    Set initial values for parameters in the scope. By setting this
    params I can avoid creating a ng-model in the view.
    Any objects defined in the scope are available in the view model, and
    vice-versa.
  */
  $scope.actual = "Session";
  $scope.sessionTime = 25;
  $scope.breakTime = 5;
  $scope.clockTimer = $scope.sessionTime * 60; //Done only to make it appear first time on screen.

  var isRunning = false;
  var timer = null;

  function resetDefaults() {
    $scope.sessionTime = 25;
    $scope.breakTime = 5;
    isRunning = false;
    timer = null;
    updateClock();
  }

  $scope.increaseBreak = function () {
    runBlocked(function () {
      if ($scope.breakTime < $scope.sessionTime && $scope.breakTime < (Math.ceil($scope.sessionTime/5))) {
        $scope.breakTime++;
      }
    });
  }

  //I just fix this in order to avoid breaks to be less than 1/5 of the
  //session time.
  $scope.decreaseBreak = function () {
    runBlocked(function () {
      if ($scope.breakTime > (Math.ceil($scope.sessionTime / 5))) {
        $scope.breakTime--;
      }
    });
  }

  //Sessions with a duration over 1 hour not permitted.
  $scope.increaseSession = function(num) {
    runBlocked(function () {
      if ($scope.sessionTime < 60) {
        $scope.sessionTime++;
        if ($scope.breakTime < (Math.floor($scope.sessionTime/5))) {
          //This line will grow the break time along with the session time increase.
          $scope.breakTime = Math.floor($scope.sessionTime/5);
        }
        updateClock();
      }
    });
  };

  $scope.decreaseSession = function(num) {
    runBlocked(function () {
      if ($scope.sessionTime > 1) {
        $scope.sessionTime--;
        if ($scope.breakTime > (Math.floor($scope.sessionTime/5))) {
          //This line will decrease the break time along with the session time decrease.
          $scope.breakTime = Math.floor($scope.sessionTime/5);
        }
        updateClock();
      }
    });
  };


  //This function's duty is only to create the timer.
  //Let the checks be in the timer function.
  $scope.startTimer = function() {

    //This is necessary to avoid that one can touch the
    //incrase & decrease buttons when timer is running.
    isRunning = true;

    //Returns the timer so I can access it from anywhere in the program.
    timer = $interval(function () {
      goTimer($scope.clockTimer, "Session");
    }, 1000);


    $scope.$on("finished", function () {
      //Cancel the interval
      $interval.cancel(timer)

      //If it comes from a finished session, changes to break
      if ($scope.actual === "Session") {
        $scope.actual = "Break";
        $scope.clockTimer = $scope.breakTime * 60; //Clock is changed to the session timer.
        timer = $interval(function () {
          goTimer();
        }, 1000);
      }

      //If it comes from a break, changes to a session
      else if ($scope.actual === "Break") {
        $scope.actual = "Session";
        $scope.clockTimer = $scope.sessionTime * 60; //Clock is changed to the break timer.
        timer = $interval(function () {
          goTimer();
        }, 1000);
      }
    });

  };


  //Simply changes pause to true so when createTime() checks it
  //will run it's internal timer but won't touch the clockTimer.
  $scope.pauseTimer = function() {
    isRunning = false;
  }

  //Resumes the timer
  $scope.resumeTimer = function() {
    isRunning = true;
  }

  //Stops timer by destroying it and resets values to defaults.
  $scope.stopTimer = function () {
    if (timer != null) {
        $interval.cancel(timer);
        resetDefaults();
    }
  }

  //Timer ticks.
  var goTimer = function () {
    if (isRunning) {
      $scope.clockTimer--;
      if ($scope.clockTimer === 0) {
        $rootScope.$emit("finished", true);
      }
    }
  };

  var updateClock = function () {
    $scope.clockTimer = $scope.sessionTime * 60;
  }

  //runBlocked will check that actions can only be taken
  //if there is no running timer.
  var runBlocked = function(fn) {
    if (!isRunning) {
      return fn();
    }
  }
}]);
