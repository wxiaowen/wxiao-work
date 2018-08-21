
var app = angular.module('myApp',
    [
        'ui.router',
    ]);
 
app.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('music', {
            url: '/music',
            templateUrl: '/views/music.html',
            controller: '/js/weatherCtrl'
        })
          .state('/index', {
            url: '/index',
            templateUrl: '/views/show.html',
            controller: '/js/weatherCtrl'
        })
 
})