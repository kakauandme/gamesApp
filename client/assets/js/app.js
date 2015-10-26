(function() {
	'use strict';
	var global = {};


	global.apiUrl = "api/v1/";	
	global.objectName = "games";	
	angular.module('application', [
		'ui.router',
		'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
    ])

	.controller('HomeCtrl', HomeCtrl)

	
	.config(config)
	.run(run)
	;
	HomeCtrl.$inject = ['$scope', '$stateParams', '$state', '$controller', '$http', '$log', '$timeout', '$location', '$anchorScroll'];
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
	function HomeCtrl($scope, $stateParams, $state, $controller, $http, $log, $timeout, $location, $anchorScroll) {
		angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));
		$scope[global.objectName] = [];
		$scope.id = ($state.params.id!==''?$state.params.id:"");
		
		// There is no ID, so we'll show a list of all films.
		$http.get(global.apiUrl+ global.objectName +"/" +$scope.id, { cache: true })
			.then(function(response) {
				$log.log(response);
				$scope[global.objectName] = response.data;
			},function(response){
				
				$log.error(response.data);
				
			});


	$scope.submitLabel="Add";
      $scope.formData = {};

    
      $scope.submit = function() {
      	$scope.error = '';
      	$scope.success = '';
        if ($scope.formData.name) {
        	$scope.submitLabel="Adding...";
    
        	$http({
			    method: 'POST',
			    url: global.apiUrl+ global.objectName +"/",
			    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			    transformRequest: function(data) {
			    	
			        var str = [];

			        for(var p in data)
			        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));

			
			        return str.join("&");
			    },
			    data: $scope.formData
			})        	
        	.then(function(response) {

        		console.log(response);
        		$scope.formData.id = response.data;
        		$scope[global.objectName].push($scope.formData);
        		$scope.submitLabel="Add";
        		$scope.success = $scope.formData.name

        		$timeout(function() {
				    angular.element(document.getElementById("close-add")).triggerHandler('click');
				    $anchorScroll('game-' + $scope.formData.id);
				    $location.hash('game-' + $scope.formData.id);
				    $scope.formData = {};
				    $scope.success = '';

				  }, 1000);
				
			},function(response){
				console.error(response);
				$scope.submitLabel="Add";		
				$scope.error = response.data;
			});
         
         	// $scope.formData.newGameName = '';
         	// $scope.formData.newGameDescription = '';
        }
      };

		return $scope;

	}

})();
