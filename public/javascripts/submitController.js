var shortenApp = angular.module("shortenApp", []);

shortenApp.controller('toggleSubmit', ["$scope", "$http",
  function($scope, $http) {
    $scope.url_to_shorten = "";
    $scope.short_url = "";
    console.log($scope.url_to_shorten);

    $scope.shorten_url = 
      function(url_to_shorten) {
        $http({
          method: 'POST',
          url: '/shorten',
          data: {"url" : url_to_shorten}
        })
        .success(
          function(data) {
            $scope.form.url_to_shorten = data.short_url;
        });
    };
  }
]);
 