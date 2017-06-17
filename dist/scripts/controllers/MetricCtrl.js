(function() {
    function MetricCtrl($rootScope, SongPlayer, Fixtures, Metric) {
        this.albumData = Fixtures.getAlbum();
        this.songPlayer = SongPlayer;
        this.metric = Metric;
    }
    
    angular
        .module('blocJams')
        .controller('MetricCtrl', ['$rootScope','SongPlayer', 'Fixtures', 'Metric', MetricCtrl]);
})();