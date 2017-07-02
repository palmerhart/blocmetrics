(function() {
    function Metric($rootScope) {
        var Metric = {};
        
        Metric.songPlays = [];
        Metric.songPlayCounts = {};
        Metric.runningCount = 0;
        
        Metric.songTest = "eureka!";

        //function that records a metric object by pushing it to the $rootScope array
        Metric.registerSongPlay = function(songObj) {
            //add time to event register
            songObj['playedAt'] = moment(new Date());
            this.songPlays.push(songObj);
            this.sortedPlays();
            this.runningCount++;
        };
        
        //for each loop w/ logic to compute needed data
        //playcount for each song, map in array of objects w/ song title & playcount
        
        Metric.sortedPlays = function() {
            var songsByPlayCount = {};
            this.songPlays.forEach(function(singleSong){
                //if exists +1, if does not exist create and = 1
                var songTitle = singleSong.title;
                if (songsByPlayCount[songTitle]) {
                    songsByPlayCount[songTitle]++;
                }  else  {
                    songsByPlayCount[songTitle] = 1;
                }
                //songsByPlayCount.sort(sort_by('songTitle',true,parseInt));
            });
            this.songPlayCounts = songsByPlayCount;
        };
        
        $rootScope.options = {
            chart: {
                type: 'pieChart',
                height: 500,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        $rootScope.data = [
            {
                key: "Blue",
                y: 29
            },
            {
                key: "Green",
                y: 2
            },
            {
                key: "Red",
                y: 9
            },
            {
                key: "Pink",
                y: 7
            },
            {
                key: "Magenta",
                y: 4
            }
        ];
        
        
        return Metric;    
    }
    
    angular
        .module('blocJams')
        .service('Metric', ['$rootScope', Metric]);
})();


