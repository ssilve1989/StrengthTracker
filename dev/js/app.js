/**
 * Created by ssilvestri on 12/23/15.
 */
var angularApp = (function(angular){
    "use strict";
    var angularApp = angular.module('StrengthTracker', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'StorageService']);

    angularApp.config(['$routeProvider', '$logProvider', function($routeProvider, $logProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller : 'mainCtrl'
            })
            .when('/history', {
                templateUrl : 'views/history.html',
                controller : 'historyCtrl'
            })
            .when('/settings', {
                templateUrl : 'views/settings.html',
                controller : 'settingsCtrl'
            })
            .when('/about', {
                templateUrl : 'views/about.html'
            })
            .when('/edit', {
                templateUrl : 'views/edit.html',
                controller : 'editCtrl'
            })
            .when('/test', {
	            templateUrl : 'views/_main.html',
	            controller : 'GoalCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        $logProvider.debugEnabled(false);
    }]);

    return angularApp;
})(window.angular);

//Navigation Events
(function($){
    "use strict";

    var $header = $("#header");
    var $navTrigger = $header.find('.navbar-toggle');
    var $navLinks = $("#main-nav").find(".nav > li > a");

    $navTrigger.add($navLinks).click(function(){
        $('body').toggleClass('mm-open');
    });

})(window.jQuery);

(function(){
    "use strict";
    try {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WebView.setWebContentsDebuggingEnabled(true);
        }
    }catch(e){
        console.debug("Android not detected. Not setting WebContentDebugging.")
    }

})();

function brzycki(weight, reps){
    "use strict";
    if(reps < 1){
        throw "Reps must be 1 or greater to calculate 1RM"
    }
    return Math.round(weight * (36 / (37-reps)))
}

function isNumber(n){
    var isNumber;
    try{
        isNumber = !isNaN(n);
    }catch(e){
        return false;
    }
    return isNumber;
}

console.debug('app.js loaded.');