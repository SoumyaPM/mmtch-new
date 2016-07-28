var app = angular.module("Dashboard", ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when("/AddNewToyCategory", {
        templateUrl : '/partials/createToyCategory.html',
		controller: 'toyDashboardCtrl'
    })
    .when("/AddNewToy", {
        templateUrl : '/partials/createToy.html',
		controller: 'toyDashboardCtrl'
    })
    .when("/tomato", {
        template : "<h1>Tomato</h1><p>Tomatoes contain around 95% water.</p>"
    });
}]);

app.controller("toyDashboardCtrl", ['$scope', '$http', function($scope, $http) {

	var rowVisible = false;
	var toyId = 100;

	$scope.savedToyCategories = localStorage.getItem('toyCategory');
	$scope.toyCategory = (localStorage.getItem('toyCategory')!==null) ? JSON.parse($scope.savedToyCategories) : 
		[ {CategoryName: 'Transforming toys'}, {CategoryName: 'Mechanical toys‎'} ];
	localStorage.setItem('toyCategory', JSON.stringify($scope.toyCategory));


	/**method to create Toy category*/
	$scope.AddNewToyCategory = function() {
		$scope.toyCategory.push({
			CategoryName: $scope.toyCategoryName
		});
		$scope.toyCategoryName = ''; //clear the input after adding
		localStorage.setItem('toyCategory', JSON.stringify($scope.toyCategory));
	};

	/**method to create Toy category*/
	$scope.AddNewToyRow = function() {
		$scope.rowVisible = true;
		$scope.toyId = toyId + 1;
	};

}]);