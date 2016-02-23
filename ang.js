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
    data.data = $scope.loadedLeaderboard
    data.data.sort(function(a,b) {
      return parseInt(a['Contributions'].slice(0,3).trim()) - parseInt(b['Contributions'].slice(0,3).trim())
    })
    data.data.reverse()
    data.x = data.data.map(std => {
      return std.fullName
    })
    data.y = data.data.map(std => {
      return std['Contributions'].slice(0,3)
    })
    var layout = {
      title: '1601 Commits'
    };
    data.type = 'bar'
    Plotly.newPlot('myDiv', [data], layout);
  })
  .then(() => {
    longestStreak = {data: $scope.loadedLeaderboard};
    longestStreak.data = longestStreak.data.map(item => {
      if(item['LongestStreak']) {
        return item
      } else {
        item['LongestStreak'] = "0 days";
        return item
      }
    })
    console.log(longestStreak.data)
    longestStreak.data.sort(function(a,b) {
      return parseInt(b['LongestStreak'].slice(0,2).trim()) - parseInt(a['LongestStreak'].slice(0,2).trim())
    })
    longestStreak.x = longestStreak.data.map(std => {
      if(std.fullName) return std.fullName
      else return std.gitName
    })
    longestStreak.y = longestStreak.data.map(std => {
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
    currentStreak = {data: $scope.loadedLeaderboard};
    currentStreak.data = currentStreak.data.map(item => {
      if(item['CurrentStreak']) {
        return item
      } else {
        item['CurrentStreak'] = "0 days";
        return item
      } 
    })
    currentStreak.data.sort(function(a,b) {
      return parseInt(b['CurrentStreak'].slice(0,2).trim()) - parseInt(a['CurrentStreak'].slice(0,2).trim())
    })
    currentStreak.x = currentStreak.data.map(std => {
      if(std.fullName) {
        return std.fullName;
      } else {
        return std.gitName;
      }
    })
    currentStreak.y = currentStreak.data.map(std => {
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