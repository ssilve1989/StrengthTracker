(function(angularApp){
    "use strict";

    angularApp.controller('mainCtrl', ['$scope', 'Storage', function($scope, Storage){
        $scope.exercise = null;
        $scope.animationClass = 'lightSpeedIn';

        Storage.setupDatabase('strengthTracker');

        $scope.setExercise = function(exercise){
            $scope.exercise = exercise;
        };

        $scope.saveExercise = function(){
            var exercise = $scope.exercise.toLowerCase();
            var table = exercise === 'bench press' ? 'bench' : exercise === 'squat' ? 'squat' : 'deadlift';

            try {
                Storage.addExercise(table, {reps: $scope.reps, weight: $scope.weight, date : new Date()});
                $scope.message = 'Nice! Your data has been saved!';
                $scope.exercise = null;
                $scope.reps = null;
                $scope.weight = null;
                //TODO change animation for after data is saved
                //$scope.animationClass = 'bounceIn';
            }catch(e){
                console.error(e.message);
                $scope.message = 'There was an error saving your data. Please try again later.'
            }

        };

        $scope.reset = function(){
            $scope.exercise = null;
            $scope.message = null;
        };

    }]);

})(window.angularApp);


console.debug("Main Controller loaded.");