(function() {
    function Metric($rootScope, SongPlayer) {
        var Metric = {};
        
        $rootScope.songPlays = [];
        
        var currentSong = SongPlayer.currentSong;
        var songTest = "eureka!";
        
        
        //establish current song as SongObj
        //setSongObj: function() {
        //    if (SongPlayer.currentSong === "") {
        //       songObj = {title: "no title", artist: "no artist"};
        //    } else {
        //        songObj = {title: currentSong.title, artist: currentSong.artist};
        //}

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
        
        
        return Metric;    
    }
    
    angular
        .module('blocJams')
        .service('Metric', ['$rootScope', 'SongPlayer', Metric]);
})();

