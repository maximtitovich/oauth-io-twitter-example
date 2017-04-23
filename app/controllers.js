app.controller('TwitterController', function ($scope) {

    $scope.searchString = '';
    $scope.tweets = []; //array of tweets

    OAuth.initialize('oauth.io key');

    $scope.search = function () {
        OAuth.popup('twitter')
            .done(function (result) {
                result.get('/1.1/search/tweets.json?q=' + encodeURIComponent($scope.searchString))
                    .done(function (response) {
                        $scope.tweets = response.statuses;
                        $scope.$apply();
                    })
                    .fail(function (err) {
                        console.log(err);
                    });
            })
            .fail(function (err) {
                console.log(err);
            });
    };

    $scope.removeTweet = function (key) {
        $scope.tweets.splice(key, 1);
    };

});
