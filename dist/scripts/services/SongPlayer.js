(function() {
    function SongPlayer(Fixtures) {
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
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioURL, {
                formats: ['mp3'],
                preload: true
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
        * @function playSong
        * @desc when users hits play the song they clicked will play and set value of song.playing to true
        * @param {Object} song
        */
        
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;            
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
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        return SongPlayer;        
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();