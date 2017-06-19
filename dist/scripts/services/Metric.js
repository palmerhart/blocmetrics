(function() {
    function Metric($rootScope) {
        var Metric = {};
        
        $rootScope.songPlays = [];
        $rootScope.songs = [];
        
        Metric.songTest = "eureka!";

        //function that records a metric object by pushing it to the $rootScope array
        Metric.registerSongPlay = function(songObj) {
            //add time to event register
            songObj['playedAt'] = moment(new Date());
            $rootScope.songPlays.push(songObj);
        };
        
        //function to push just names of songs played into "songs" array
        Metric.listSongsPlayed = function() {
            var songs = [];
            angular.forEach($rootScope.songPlays, function(song) {
                $rootScope.songs.push(song.title);
            });
            return songs;
        };
        
    
        //function to count total song plays
        Metric.playCount = $rootScope.songPlays.length;
        
        
        
        return Metric;    
    }
    
    angular
        .module('blocJams')
        .service('Metric', ['$rootScope', Metric]);
})();


