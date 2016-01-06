/**
 * Created by ssilvestri on 1/6/16.
 */
(function(app){
    "use strict";

    app.directive('mAppLoading', ['$animate', '$timeout', function($animate, $timeout){
        return({
            link : link,
            restrict : 'C'
        });

        function link(scope, element, attributes){
            $timeout(function(){
                element.addClass('fadeOut');
                $timeout(function(){
                    element.remove()
                    scope = element = attributes = null;
                }, 1000);
            }, 2000);
        }
    }]);

})(window.angularApp);