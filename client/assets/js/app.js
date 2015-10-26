(function() {
	'use strict';

	angular.module('application', [
		'ui.router',
		'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
    ])

	.controller('HomeCtrl', HomeCtrl)
	.filter('capitalize', function() {
		return function (input) {
			return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1)}) : '';
		}
	})
	.filter('lastdir', function () {
		return function (input) {
			return (!!input) ? input.split('/').slice(-2, -1)[0] : '';
		}
	})
	
	.config(config)
	.run(run)
	;
	HomeCtrl.$inject = ['$scope', '$stateParams', '$state', '$controller', '$http'];
	config.$inject = ['$urlRouterProvider', '$locationProvider'];

	function config($urlProvider, $locationProvider) {
		$urlProvider.otherwise('/');

		$locationProvider.html5Mode({
			enabled:false,
			requireBase: false
		});

		$locationProvider.hashPrefix('!');
	}

	function run() {
		FastClick.attach(document.body);
	}
	function HomeCtrl($scope, $stateParams, $state, $controller, $http) {
		angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));
   // Your code...
   //console.log($http);

   $scope.id = ($state.params.id || '');
   $scope.page = ($state.params.p || 1);
  // If we're on the first page or page is set to default
  if ($scope.page == 1) {
  	if ($scope.id != '') {
      // We've got a URL parameter, so let's get the single entity's
      // data from our data source
      $http.get("http://swapi.co/api/"+'films'+"/"+$scope.id,
      	{cache: true })
      .success(function(data) {
          // If the request succeeds, assign our data to the 'film'
          // variable, passed to our page through $scope
          $scope['film'] = data;
      })

  } else {
      // There is no ID, so we'll show a list of all films.
      // We're on page 1, so the next page is 2.
      $http.get("http://swapi.co/api/"+'films'+"/", { cache: true })
      .success(function(data) {
      	$scope['films'] = data;
      	if (data['next']) $scope.nextPage = 2;
      });
  }
} else {
    // Once again, there is no ID, so we'll show a list of all films.
    // If there's a next page, let's add it. Otherwise just add the
    // previous page button.
    $http.get("http://swapi.co/api/"+'films'+"/?page="+$scope.page,
    	{ cache: true }).success(function(data) {
    		$scope['films'] = data;
    		if (data['next']) $scope.nextPage = 1*$scope.page + 1;
    	});
    	$scope.prevPage = 1*$scope.page - 1;
    }
    return $scope;

}

})();
