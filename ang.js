var app = angular.module('gitstats', ['firebase', 'ui.router']);

// app.config(function($stateProvider) {
//   $stateProvider.state('index', {
//     url: '/',
//     templateUrl: 'graph.html',
//     controller: 'MainCtrl',
//     resolve: {
//       leaderboad: function($firebaseArray) {
//         return $firebaseArray(new Firebase('https://kimonocrawlsapi123.firebaseio.com/'))
//       }
//     }
//   })
// })


app.controller('MainCtrl', function ($firebaseObject, $scope) {
  // $scope.leaderboard = leaderboad;
  // console.log($scope.leaderboard)

  $firebaseObject(new Firebase('https://kimonocrawlsapi123.firebaseio.com/')).$loaded().then(res => {
    var list = res.kimono.api['9echjkze'].latest.results['collection1'];
    $scope.loadedLeaderboard = list;
    console.log(list);
  })
  .then(() => {
    data = {};
    data.x = $scope.loadedLeaderboard.map(std => {
      return std.fullName
    })
    data.y = $scope.loadedLeaderboard.map(std => {
      return std['Contributions'].slice(0,3)
    })
    var layout = {
      title: '1601 Commits'
    };
    data.type = 'bar'
    Plotly.newPlot('myDiv', [data], layout);
  })
  .then(() => {
    longestStreak = {};
    longestStreak.x = $scope.loadedLeaderboard.map(std => {
      if(std.fullName) return std.fullName
      else return std.gitName
    })
    longestStreak.y = $scope.loadedLeaderboard.map(std => {
      if (std['LongestStreak']) {
        return std['LongestStreak'].slice(0,2);
      } else {
        return 0;
      }
    })
    var layout = {
      title: '1601 Longest Commit Streak'
    };
    longestStreak.type = 'bar'
    Plotly.newPlot('streakChart', [longestStreak], layout);
  })
  .then(() => {
    currentStreak = {};
    currentStreak.x = $scope.loadedLeaderboard.map(std => {
      if(std.fullName) return std.fullName
      else return std.gitName
    })
    currentStreak.y = $scope.loadedLeaderboard.map(std => {
      if (std['CurrentStreak']) {
        return std['CurrentStreak'].slice(0,2);
      } else {
        return 0;
      }
    })
    var layout = {
      title: '1601 Current Commit Streak'
    };
    currentStreak.type = 'bar'
    Plotly.newPlot('currentStreakChart', [currentStreak], layout);
  })
})