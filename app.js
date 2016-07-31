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
    .when("/tableView", {
        templateUrl : "/partials/tableView.html",
		controller: 'tableViewCtrl'
    });
}]);

app.controller("toyDashboardCtrl", ['$scope', '$http', function($scope, $http) {

	var rowVisible = false;
    var customAttributeRowVisible = false;
    $scope.success = false;
    $scope.customAttributes = [];
    $scope.customAttributeArray = [];
    $scope.counter = 1;
    //$scope.generateId = '';
	$scope.item = {
        "toyid": {
            "id": '',
            "flag": false
        },
        "toyname": {
            "name": "",
            "flag": false
        },
        "toycategory": {
            "category": "",
            "flag": false
        },
        "toyprice": {
            "price": "",
            "flag": false
        },
        "attributes": []
	};

    $scope.guid = function() {
      return $scope.s4() + $scope.s4() + '-' + $scope.s4() + '-' + $scope.s4() + '-' + $scope.s4() + '-' + $scope.s4();
    }

    $scope.s4 = function() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    $scope.removeAlert = function() {
        $scope.success = false;
    }

    $scope.generateId = $scope.guid()
    console.log($scope.generateId);
    $scope.customAttribute = {
        "label": '',
        "value": '',
        "flag": false
    }
	$scope.savedToyCategories = localStorage.getItem('toyCategory');
	$scope.toyCategory = (localStorage.getItem('toyCategory')!=='null') ? JSON.parse($scope.savedToyCategories) : 
		[ {CategoryName: 'Transforming toys',items: []}, {CategoryName: 'Mechanical toys', items: []} ];
	localStorage.setItem('toyCategory', JSON.stringify($scope.toyCategory));


	/**method to create Toy category*/
	$scope.AddNewToyCategory = function() {
		$scope.toyCategory.push({
			CategoryName: $scope.toyCategoryName,
			items: []
		});
		$scope.toyCategoryName = ''; //clear the input after adding
		localStorage.setItem('toyCategory', JSON.stringify($scope.toyCategory));
        $scope.success = true;
	};

	/**method to create Toy Row*/
	$scope.AddNewToyRow = function() {
		$scope.rowVisible = true;

	};
    
    /**method to create Toy*/
	$scope.AddNewToy = function() {
		var toyCategory = JSON.parse(localStorage.getItem('toyCategory'));
		angular.forEach(toyCategory, function(value) {
			if(value.CategoryName === $scope.item.toycategory.category) {
                $scope.item.attributes.push($scope.customAttributes);
                $scope.item.toyid.id = $scope.generateId;
				value.items.push($scope.item);
			}
		});
        $scope.item = ''; //clear the input after adding
		localStorage.setItem('toyCategory', JSON.stringify(toyCategory));
		$scope.showSuccessStatus = true;
	};
    
    /**Method to add new custom attribute*/
    $scope.addCustomAttribute = function() {
        $scope.customAttributeRowVisible = true;
        $scope.customAttributeArray.push('customAttribute' + $scope.counter);
        $scope.counter++;
    };
    
    $scope.deleteCustomAttribute = function (index) {
        $scope.customAttributes.splice(index, 1);
        $scope.item.customattribute.attribute = '';
        $scope.item.customattribute.value = '';
        $scope.item.customattribute.flag = '';
    };

    $scope.reset = function() {
        $scope.item = '';
        $scope.customAttributeRowVisible = '';
        $scope.customAttributes = [];
    };

    $scope.insertCustomAttribute = function() {
        $scope.customAttributes.push($scope.customAttribute); 
        $scope.customAttribute = {
        "label": '',
        "value": '',
        "flag": false
        }
        $scope.showSuccessStatus = true;
    }

}]);
app.controller("tableViewCtrl", ['$scope', '$http', function($scope, $http) {
	$scope.toyCategory = (localStorage.getItem('toyCategory')!==null) ? JSON.parse(localStorage.getItem('toyCategory')) : [];
    $scope.sortOrder =false;
    $scope.orderByField = 'toy.toyid.id';
    $scope.changeTableOrder = function(sortField){
        $scope.orderByField = sortField;
        $scope.sortOrder = !$scope.sortOrder;
    };
}]);