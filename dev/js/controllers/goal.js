(function(app){
	app.controller('GoalCtrl', ['$scope', '$log', '$timeout', 'Storage', function($scope, $log, $timeout, Storage) {

		$scope.localStorage = window.localStorage;
		$scope.db = Storage.getConnection();

		$scope.lifts = {};

		$scope.init = function() {
			$scope.loadData('bench');
			$scope.loadData('squat');
			$scope.loadData('deadlift');
		};

		$scope.getGoal = function(lift) {
			return Number($scope.localStorage.getItem(lift));
		};

		$scope.loadData = function(type) {
			var db = $scope.db;

			db.transaction(function(tx) {
				var statement = 'SELECT max FROM ' + type + ' ORDER BY max DESC LIMIT 1';
				var lifts = $scope.lifts;
				tx.executeSql(statement, [],
					function(tx, results){
						var goal = $scope.getGoal(type);

						var obj = {};
						lifts[type] = {
							canvas : (type + '-canvas'),
							name : type
						};

						lifts[type].goal = goal;

						var length = results.rows.length;

						if(length) {
							lifts[type].current = results.rows.item(0).max;
						} else {
							lifts[type].current = 0;
						}

						$scope.$apply();
						setupCanvas(lifts[type]);
					},
					function(tx, err){
						$log.error(err);
					}
				);
			});
		};

		$scope.$on('$routeChangeSuccess', function(){
			$scope.init();
		});

	}]);

	var colors = {
		danger : '#d9534f',
		warning : '#f0ad4e',
		info : '#5bc0de',
		success : '#5cb85c'
	};

	// Drawing functions
	function setupCanvas(lift) {
		console.log('Setting up canvas with:', lift);
		var canvas = document.querySelector('#' + lift.canvas);
		var ctx = canvas.getContext('2d');
		var max = Math.round( (lift.current / lift.goal) * 100 );

		var liftName = lift.name.charAt(0).toUpperCase() + lift.name.substring(1);

		var text = liftName + ': ' + max + '%';

		ctx.beginPath();
		ctx.strokeStyle = getColor(max);
		ctx.lineCap = 'square';
		ctx.closePath();
		ctx.fill();
		ctx.lineWidth = 10.0;

		for(var i = 0; i <= max; i++) {
			animateCircle(ctx, i, text);
		}
	}

	function animateCircle(ctx, step, text) {
		setTimeout(function(){
			draw(ctx, step * .01, text);
		}.bind(this), step * 20);
	}

	function draw(ctx, current, text) {
		const circ = Math.PI * 2;
		const quart = Math.PI / 2;
		var width = ctx.canvas.width / 2;
		var height = ctx.canvas.height / 2;
		var radius = width / 2.5;
		var font = 'italic ' + (radius / 4) + "px 'Helvetica Neue'";

		ctx.beginPath();
		ctx.arc(width, height, radius, -(quart), ((circ) * current) - quart, false);
		ctx.font = font;

		var textWidth = ctx.measureText(text).width;
		var textHeight = ctx.measureText("w").width; // estimating the height

		ctx.fillText(text, width - (textWidth / 2), height + (textHeight / 2));
		ctx.stroke();
	}

	function getColor(value) {
		return (
			value <= 25 ? colors.danger :
				value <= 50 ? colors.warning :
					value <= 90 ? colors.info : colors.success
		);
	}

})(window.angularApp);
