var shortenApp = angular.module("shortenApp", []);

shortenApp.controller('toggleSubmit', ["$scope", "$http",
  function($scope, $http) {
    $scope.urlToShorten = "";
    $scope.shortUrl = "";
    console.log($scope.urlToShorten);

    $scope.shorten_url = 
      function(urlToShorten) {
        console.log(urlToShorten);
        $http.post('/shorten', {"url" : urlToShorten})
        .success(
          function(data) {
            $scope.urlToShorten = data.short_url;
        });
    };
  }
]);
 