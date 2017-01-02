(function() {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};
                
        /**
        * @desc Current album info
        * @type {object}
        */
        var currentAlbum = Fixtures.getAlbum();
                
        /**
        * @desc Buzz object audio file
        * @type {object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(SongPlayer.currentSong);
            }
            
            currentBuzzObject = new buzz.sound(song.audioURL, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
            
            SongPlayer.currentSong = song;
        };
        
        /**
        * @function getSongIndex
        * @desc return the index value of a song in an album
        * @param {Object} song
        * @returns {number}
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        /**
        * @desc song currently playing
        * @type {object}
        */    
        SongPlayer.currentSong = null;
        
        /**
        * @desc Current playback time (in seconds) of currently playing SongPlayer
        * @type {number}
        */
        SongPlayer.currentTime = null;
        
        SongPlayer.volume = 50;
        
        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
            currentBuzzObject.setVolume(volume);
            }
            SongPlayer.volume = volume;
        };
        
        /**
        * @function playSong
        * @desc when users hits play the song they clicked will play and set value of song.playing to true
        * @param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;            
        };
        
        /**
        * @function stopSong
        * @desc when users pause the music will stop
        * @param {Object} song
        */
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        };
        
        /**
        * @function play
        * @desc Play new song or current
        * @param {Object} song
        */        
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);                
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
                
        /**
        * @function pause
        * @desc pause new song or current
        * @param {Object} song
        */  
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        
        /**
        * @function previous
        * @desc go to previous song        
        */  
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong(SongPlayer.currentSong)
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /**
        * @function next
        * @desc go to next song        
        */  
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            var lastSongIndex = currentAlbum.songs.length -1;
            
            if(currentSongIndex >lastSongIndex) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
            
        };
        
        /**
        * @function setCurrentTime
        * @desc Set current time (inseconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
        return SongPlayer;        
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();