(function() {
    function MetricCtrl($scope, SongPlayer, Fixtures, Metric) {
        $scope.albumData = Fixtures.getAlbum();
        $scope.songPlayer = SongPlayer;
        $scope.metric = Metric;
       
    }
    
    angular
        .module('blocJams')
        .controller('MetricCtrl', ['$scope','SongPlayer', 'Fixtures', 'Metric', MetricCtrl]);
})();