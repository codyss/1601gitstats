var app = angular.module('gitstats', ['firebase', 'ui-router']);

app.config(function($urlRouterProvider) {
  $urlRouterProvider.when('/', '/index')
})

app.config(function($locationProvider) {
  $locationProvider.html5Mode({enabled:true, requireBase:false})
})


app.config(function($stateProvider) {
  $stateProvider.state('index', {
    url: '/index',
    templateUrl: '/indexdetail.html',
    controller: 'main',
    resolve: {
      leaderboad: function($firebaseArray) {
        return $firebaseArray(new Firebase('https://kimonocrawlsapi123.firebaseio.com/'))
      }
    }
  })
})


app.controller('MainCtrl', function ($firebaseArray, $scope, leaderboad) {
  $scope.leaderboard = leaderboad;
  console.log($scope.leaderboard)
})