(function(app){
	app.controller('GoalCtrl', ['$scope', function($scope) {
		$scope.localStorage = window.localStorage;

		$scope.lifts = {
			bench : {
				name : 'Bench',
				goal : 315,
				current : 225
			},
			squat : {
				name : 'Squat',
				goal : 405,
				current : 315
			},
			deadlift : {
				name : 'Deadlift',
				goal : 545,
				current : 405
			}
		};

		/*
		$scope.lifts.bench.goal = $scope.localStorage.getItem('benchGoal');
		$scope.lifts.squat.goal = $scope.localStorage.getItem('squatGoal');
		$scope.lifts.deadlift.goal = $scope.localStorage.getItem('deadliftGoal');
		*/


	}]);
})(window.angularApp);
