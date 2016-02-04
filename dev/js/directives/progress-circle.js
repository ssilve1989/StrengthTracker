(function(app){

	const colors = {
		danger : '#d9534f',
		warning : '#f0ad4e',
		info : '#5bc0de',
		success : '#5cb85c'
	};

	app.directive('progressCircle', function() {
		return {
			restrict : 'E',
			templateUrl : '../../views/progress.html',
			link : link
		}
	});

	function link($scope, element, attrs) {
		const lift = $scope.lift;
		const bg = angular.element(element).find('canvas')[0];
		const ctx = bg.getContext('2d');
		const max = Math.round( (lift.current / lift.goal) * 100 );
		const text = lift.name + ' ' + max + '%';

		ctx.beginPath();
		ctx.strokeStyle = getColor(max);
		ctx.lineCap = 'square';
		ctx.closePath();
		ctx.fill();
		ctx.lineWidth = 10.0;

		for(var i = 0; i < max; i++) {
			animateCircle(ctx, i, text);
		}
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

	function animateCircle(ctx, step, text){
		setTimeout(function(){
			draw(ctx, step * .01, text);
		}.bind(this), step * 20);
	}
})(window.angularApp);