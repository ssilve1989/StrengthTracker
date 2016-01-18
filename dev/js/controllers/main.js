(function(angularApp){
    "use strict";

    angularApp.controller('mainCtrl', ['$scope', 'Storage', function($scope, Storage){
        $scope.exercise = null;
        $scope.animationClass = 'lightSpeedIn';

        Storage.setupDatabase();

        $scope.setExercise = function(exercise){
            $scope.exercise = exercise;
            $scope.message = null;

            $scope.resetForm();
        };

        $scope.saveExercise = function(){
            if(!$scope.isValid()){
                return;
            }

            var exercise = $scope.exercise.toLowerCase();
            var table = exercise === 'bench press' ? 'bench' : exercise === 'squat' ? 'squat' : 'deadlift';

            try {
                Storage.addExercise(table, {reps: $scope.reps, weight: $scope.weight, date : new Date()});
                $scope.message = 'Nice! Your data has been saved!';

                $scope.reset();
            }catch(e){
                console.error(e.message);
                $scope.message = 'There was an error saving your data. Please try again later.'
                $scope.resetForm();
                $scope.reset();
            }
        };

        $scope.isValid = function(){
            var reps = $scope.reps;
            var weight = $scope.weight;
            return (reps && reps >= 1 && (reps % 1 == 0)) && (weight && weight >= 1);
        };

        $scope.resetForm = function(){
            $scope.form.$setPristine();
            $scope.form.$setUntouched();
        };

        $scope.cancel = function(){
            $scope.resetForm();
            $scope.reset();
        };

        $scope.reset = function(){
            $scope.reps = null;
            $scope.weight = null;
            $scope.exercise = null;
        };

    }]);

})(window.angularApp);


console.debug("Main Controller loaded.");