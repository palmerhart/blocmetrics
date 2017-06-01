(function() {
    function Metric($rootScope) {
        $rootScope.songPlays = [];
        
        return {
            //function that records a metric object by pusing it to the $rootScope array
            
            
            registerSongPlay: function(songObj) {
                //add time to event register
                songObj['playedAt'] = new Date();
                $rootScope.songPlays.push(songObj);
            },
            listSongsPlayed: function() {
                var songs = [];
                angular.forEach($rootScope.songPlays, function(song) {
                    songs.push(song.title);
                });
                return songs;
            }
        };
    }
    
    angular
        .module('blocJams')
        .service('Metric', ['$rootScope', Metric]);
})();
