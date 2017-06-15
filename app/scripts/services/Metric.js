(function() {
    function Metric($rootScope, SongPlayer) {
        $rootScope.songPlays = ["test"];
        $rootScope.test = "test txt";
        
        return {
            //function that records a metric object by pushing it to the $rootScope array
            registerSongPlay: function(songObj) {
                //add time to event register
                songObj['playedAt'] = moment(new Date());
                $rootScope.songPlays.push(songObj);
            },
            listSongsPlayed: function() {
                var songs = ["test5"];
                angular.forEach($rootScope.songPlays, function(song) {
                    songs.push(song.title);
                });
                return songs;
            }
        };
    }
    
    angular
        .module('blocJams')
        .service('Metric', ['$rootScope', 'SongPlayer', Metric]);
})();

