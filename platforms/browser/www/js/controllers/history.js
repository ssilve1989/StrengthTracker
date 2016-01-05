/**
 * Created by ssilvestri on 12/23/15.
 */
(function(app){
    "use strict";

    app.controller('historyCtrl', ['$scope', '$log', '$timeout', '$q', 'Storage', function($scope, $log, $timeout, $q, Storage){
        $scope.db = Storage.getConnection();
        $scope.benchData = [], $scope.squatData = [], $scope.deadliftData = [];

        (function(){
            var db = $scope.db;

            //Bench Press Chart Creation
            db.transaction(function(tx){
                tx.executeSql('SELECT reps, weight, recorded from bench ORDER BY recorded ASC', [], function(tx, results){
                    var length = results.rows.length;
                    $log.debug('Retrieved ' + length + ' results for query.');

                    var maxes = [], dates = [];

                    for(var i = 0; i < length; i++){
                        maxes.push(brzycki(results.rows.item(i).weight, results.rows.item(i).reps));
                        dates.push(moment(results.rows.item(i).recorded).format("MM/DD/YY"));
                    }

                    if(!maxes.length || !dates.length){
                        $scope.benchMessage = 'No data found for Bench Press. Go enter some!'
                    }else{
                        $("#benchchart").highcharts(generateChartData('Bench Press Statistics', maxes, dates));
                    }
                });
            });

            //Squat Chart Creation
            db.transaction(function(tx){
                tx.executeSql('SELECT reps,weight,recorded from squat ORDER BY recorded ASC', [], function(tx, results){
                    var length = results.rows.length;
                    $log.debug('Retrieved ' + length + ' results for query.');

                    var maxes = [], dates = [];

                    for(var i = 0; i < length; i++){
                        maxes.push(brzycki(results.rows.item(i).weight, results.rows.item(i).reps));
                        dates.push(moment(results.rows.item(i).recorded).format("MM/DD/YY"));
                    }

                    if(!maxes.length || !dates.length){
                        $scope.squatMessage = 'No data found for Squat. Go enter some!'
                    }else{
                        $("#squatchart").highcharts(generateChartData('Squat Statistics', maxes, dates));
                    }
                });
            });

            db.transaction(function(tx){
                tx.executeSql('SELECT reps,weight, recorded from deadlift ORDER BY recorded ASC', [], function(tx, results){
                    var length = results.rows.length;
                    $log.debug('Retrieved ' + length + ' results for query.');

                    var maxes = [], dates = [];

                    for(var i = 0; i < length; i++){
                        maxes.push(brzycki(results.rows.item(i).weight, results.rows.item(i).reps));
                        dates.push(moment(results.rows.item(i).recorded).format("MM/DD/YY"));
                    }

                    if(!maxes.length || !dates.length){
                        $scope.deadliftMessage = 'No data found for Deadlift. Go enter some!'
                    }else{
                        $("#deadlifitchart").highcharts(generateChartData('Deadlift Statistics', maxes, dates));
                    }
                });
            });
        })();
    }]);
})(window.angularApp);

function generateChartData(title, weights, dates){
    "use strict";
    return {
        title: {
            text : '',
            x: -20 //center
        },
        xAxis: {
            categories : dates,
            title : {
                text : 'Date'
            }
        },
        yAxis : {
            title : {
                text : 'Weight'
            }
        },
        series : [{
            name : 'Weight',
            data : weights
        }]
    }
}