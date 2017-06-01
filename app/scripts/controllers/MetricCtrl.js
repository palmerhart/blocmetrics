(function() {
    function MetricCtrl($rootScope, SongPlayer) {
        this.songPlayer = SongPlayer;
    }
    
    angular
        .module('blocJams')
        .controller('MetricCtrl', ['SongPlayer', MetricCtrl]);
})();