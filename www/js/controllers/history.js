/**
 * Created by ssilvestri on 12/23/15.
 */
(function(app){
    "use strict";

    app.controller('historyCtrl', ['$scope', '$log', '$timeout', '$q', 'Storage', function($scope, $log, $timeout, $q, Storage){
        $scope.db = Storage.getConnection();
        $scope.benchData = [], $scope.squatData = [], $scope.deadliftData = [];

        $scope.generateChartData = function(weights, dates){
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
        };

        $scope.populateCharts = function(table, message, chartElement){
            var db = $scope.db;
            db.transaction(function(tx){
                var statement = 'SELECT reps, weight, recorded from ' + table + ' ORDER BY recorded ASC';
                tx.executeSql(statement, [], function(tx, results){
                    var length = results.rows.length;
                    $log.debug('Retrieved ' + length + ' results for query');

                    var maxes = [], dates = [];

                    for(var i = 0; i < length; i++){
                        var weight = results.rows.item(i).weight;
                        var reps = results.rows.item(i).reps;
                        var date = results.rows.item(i).recorded;

                        maxes.push(brzycki(weight, reps));
                        dates.push(moment(date).format('MM/DD/YY'));
                    }

                    if(!maxes || !dates){
                        message = 'No data found for lift. Go enter some!'
                    }else{
                        if(!chartElement instanceof jQuery){
                            chartElement = angular.element(chartElement);
                        }
                        chartElement.highcharts($scope.generateChartData(maxes, dates));
                    }
                });
            });
        };

        $scope.$on('$routeChangeSuccess', function(){
            $scope.populateCharts('bench', $scope.benchMessage, angular.element('#benchchart'));
            $scope.populateCharts('squat', $scope.squatMessage, angular.element('#squatchart'));
            $scope.populateCharts('deadlift', $scope.deadliftMessage, angular.element('#deadliftchart'));
        });
    }]);
})(window.angularApp);

function generateChartData(weights, dates){
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