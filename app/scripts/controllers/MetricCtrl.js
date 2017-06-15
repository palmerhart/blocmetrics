(function() {
    function MetricCtrl($rootScope, SongPlayer, Fixtures) {
        this.albumData = Fixtures.getAlbum();
        this.songPlayer = SongPlayer;
    }
    
    angular
        .module('blocJams')
        .controller('MetricCtrl', ['$rootScope','SongPlayer', 'Fixtures', MetricCtrl]);
})();