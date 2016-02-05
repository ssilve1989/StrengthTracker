/**
 * Created by ssilvestri on 12/24/15.
 */
(function(app){
    "use strict";

    app.controller('settingsCtrl', ['$scope', '$timeout', 'Storage', function($scope, $timeout, Storage){

        $scope.clearDatabase = function(){
            Storage.dropTables();
            window.localStorage.clear();
            $scope.message = 'Database has been cleared!';

            $timeout(function(){
                $scope.message = null;
            }, 2000);
        };
    }]);

})(window.angularApp);