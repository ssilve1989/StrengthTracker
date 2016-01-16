/**
 * Created by ssilvestri on 12/23/15.
 */
(function(app){
    "use strict";

    app.controller('historyCtrl', ['$scope', '$log', '$timeout', '$q', 'Storage', function($scope, $log, $timeout, $q, Storage){
        var DATA_NOT_FOUND = "No data found for lift. Go enter some!";

        $scope.db = Storage.getConnection();

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

        $scope.populateCharts = function(table, chartElement){
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

                    if(!maxes.length || !dates.length){
                        switch(table){
                            case 'bench':
                                $scope.benchMessage = DATA_NOT_FOUND;
                                break;
                            case 'squat':
                                $scope.squatMessage = DATA_NOT_FOUND;
                                break;
                            case 'deadlift':
                                $scope.deadliftMessage = DATA_NOT_FOUND;
                                break;
                            default:
                                break;
                        }
                    }else{
                        if(!chartElement instanceof jQuery){
                            chartElement = angular.element(chartElement);
                        }
                        chartElement.highcharts($scope.generateChartData(maxes, dates));
                    }
                    $scope.$apply();
                });
            });
        };

        $scope.$on('$routeChangeSuccess', function(){
            $scope.populateCharts('bench', angular.element('#benchchart'));
            $scope.populateCharts('squat', angular.element('#squatchart'));
            $scope.populateCharts('deadlift', angular.element('#deadliftchart'));
        });
    }]);
})(window.angularApp);