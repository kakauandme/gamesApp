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
	//main controller
	.controller('HomeCtrl', HomeCtrl)	
	.config(config)
	.run(run);


	HomeCtrl.$inject = ['$scope', '$stateParams', '$state', '$controller', '$http', '$window', '$timeout', '$location', '$anchorScroll'];
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

	//{object} to '&key=value' string
	function serialiseObject(data){

		var str = [];
		for(var p in data){
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
		}
		return str.join("&");
	}
	//main controller
	function HomeCtrl($scope, $stateParams, $state, $controller, $http, $window, $timeout, $location, $anchorScroll) {
		angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));
		


		$scope[global.objectName] = [];
		$scope.id = ($state.params.id!==''?$state.params.id:"");
		
		// get games
		$http.get(global.apiUrl+ global.objectName +"/" +$scope.id, { cache: true })
		.then(function(response) {
			console.log(response);
			$scope[global.objectName] = response.data;
			global.data = response.data;
			if(!response.data.length){
				$scope.notFound = "No "+global.objectName+" yet. Add a new one.";
			}
		},function(response){
			console.error(response.data);
		});

		//add game
		$scope.addLabel="Add";
		$scope.formData = {};
		$scope.submit = function() {
			$scope.error = '';
			$scope.success = '';
			if ($scope.formData.name) {
				$scope.addLabel="Adding...";

				$http({
					method: 'POST',
					url: global.apiUrl+ global.objectName +"/",
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					transformRequest: serialiseObject,
					data: $scope.formData
				})        	
				.then(function(response) {

					console.log(response);
					$scope.formData.id = response.data;
					$scope[global.objectName].push($scope.formData);
					$scope.addLabel="Add";
					$scope.success = $scope.formData.name

					$timeout(function() {
						angular.element(document.getElementById("close-add")).triggerHandler('click');
						$anchorScroll(global.objectName +'-' + $scope.formData.id);
						$location.hash(global.objectName +'-' + $scope.formData.id);
						$scope.formData = {};
						$scope.success = '';

					}, 1000);

				},function(response){
					console.error(response);
					$scope.addLabel="Add";		
					$scope.error = response.data;
				});
	        }        

	    };

	     //search
	     $scope.searchLabel="Search";
	     $scope.searchData = {};
	     $scope.search = function() {     	
	     	$scope.notFound = '';
	     	if($scope.searchData.name){
	     		
	     		$http.get(global.apiUrl+ global.objectName +"/search?" + serialiseObject($scope.searchData), { cache: true })
	     		.then(function(response) {
	     			console.log(response);
	     			$scope[global.objectName] = response.data;
	     			if(!response.data.length){
	     				$scope.notFound = "Nothing is matching your query, try different keyword.";
	     			}
	     		},function(response){

	     			console.error(response.data);

	     		});
	     	// empty field -> show all
	     	}else{
	     		$scope[global.objectName] = global.data;
	     	}
	     };
	     return $scope;
	 }

})();
