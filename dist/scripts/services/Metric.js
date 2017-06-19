(function() {
    function Metric($rootScope) {
        var Metric = {};
        
        $rootScope.songPlays = [];
        Metric.songTest = "eureka!";
        
        //inject Metric.js service into SongPlayer.js

        //function that records a metric object by pushing it to the $rootScope array
        Metric.registerSongPlay = function(songObj) {
            //add time to event register
            songObj['playedAt'] = moment(new Date());
            $rootScope.songPlays.push(songObj);
        };
        
        Metric.listSongsPlayed = function() {
            var songs = ["test5"];
            angular.forEach($rootScope.songPlays, function(song) {
                songs.push(song.title);
            });
            return songs;
        };
        
        Metric.topSong = function() {
            
        };
        
        
        return Metric;    
    }
    
    angular
        .module('blocJams')
        .service('Metric', ['$rootScope', Metric]);
})();

