/**
 * Created by ssilvestri on 1/16/16.
 */

(function(app){
    "use strict";

    app.controller('editCtrl', ['$scope', '$uibModal', '$log', 'Storage', function($scope, $uibModal, $log, Storage){
        $scope.rows = [];
        $scope.itemsPerPage = 10;
        $scope.currentPage = 1;
        $scope.db = Storage.getConnection();

        $scope.edit = function(item){
            var modalInstance = $uibModal.open({
                animation : true,
                templateUrl : 'views/editModal.html',
                controller : 'ModalInstanceCtrl',
                resolve : {
                    item : function(){
                        item.table = $scope.exercise;
                        return item;
                    }
                }
            });
        };

        $scope.selectExercise = function(table){
            $scope.exercise = table;

            var db = $scope.db;

            db.transaction(function(tx){
                var statement = 'SELECT * FROM ' + table + ' ORDER BY recorded ASC';
                tx.executeSql(statement, [], function(tx, results){
                    var length = results.rows.length;
                    for(var i = 0; i < length; i++){
                        var item = results.rows.item(i);

                        $scope.rows.push({
                            weight : item.weight,
                            reps : item.reps,
                            date : moment(item.recorded).format("MM/DD/YY"),
                            id: item.id
                        });
                    }
                    $scope.$apply();
                }, function(tx, err){
                    $log.error(err);
                });
            })
        };

        $scope.delete = function(table, item, index){
            var id = item.id;
            var statement = 'DELETE from ' + table + ' WHERE id=?';

            var db = $scope.db;

            db.transaction(function(tx){
                tx.executeSql(statement, [id], function(tx, results){
                    if(results.rowsAffected === 1){
                        $scope.rows.splice(index, 1);
                        $scope.$apply();
                    }
                }, function(tx, error){
                    $log.error(error);
                });
            });
        }

    }]);

    app.controller('ModalInstanceCtrl', ['$scope', '$log', 'item', '$uibModalInstance', 'Storage', function($scope, $log, item, $uibModalInstance, Storage){
        $scope.db = Storage.getConnection();

        if(!$scope.db){
            $scope.error = 'The database could not be reached. Please try again later.'
        }

        $scope.selected = item;
        $scope.reps = item.reps;
        $scope.weight = item.weight;

        $scope.close = function(){
            $uibModalInstance.dismiss('cancel');
        };

        $scope.update = function(form, table){

            if(form.reps.$invalid || form.weight.$invalid > 0) return;

            var id = $scope.selected.id;
            var reps = $scope.selected.reps = form.reps.$modelValue;
            var weight = $scope.selected.weight = form.weight.$modelValue;
            var max = brzycki(weight, reps);
            //Update the Database
            var db = $scope.db;

            db.transaction(function(tx){
                var statement = 'UPDATE ' + table + ' SET reps=?, weight=?, max=? WHERE id=?';
                tx.executeSql(statement, [reps, weight, max, id], function(tx, results){
                    if(results.rowsAffected === 1){
                        $uibModalInstance.close();
                    }
                }, function(tx, error){
                    $log.error(error);
                });
            });
        };
    }]);

})(window.angularApp);