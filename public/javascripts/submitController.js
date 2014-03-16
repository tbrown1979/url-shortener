var shortenApp = angular.module("shortenApp", []);

shortenApp.directive('toggleSubmit', function() {
  return {
    restrict: 'A',

    controller: function($scope) {
      console.log("test")
    }
  };

});