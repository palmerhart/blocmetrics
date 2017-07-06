(function() {
    function Metric($rootScope) {
        var Metric = {};
        
        Metric.songPlays = [];
        Metric.songPlayCounts = {};
        Metric.runningCount = 0;
        Metric.pieArray2 = [];
        $rootScope.pieData2 = [];
        $rootScope.scatterData = [];

        //function that records a metric object by pushing it to the $rootScope array
        Metric.registerSongPlay = function(songObj) {
            //add time to event register
            songObj['playedAt'] = moment(new Date()).format();
            this.songPlays.push(songObj);
            this.sortedPlays();
            this.runningCount++;
            this.pieGenerateArray(Metric.songPlayCounts);
            $rootScope.data2();
            $rootScope.scatterGenerateArray(Metric.songPlays);
            
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
            });
            this.songPlayCounts = songsByPlayCount;
        };
        
        $rootScope.options = {
            chart: {
                type: 'pieChart',
                height: 450,
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
        
        //leverage songPlaysCounts to create an array of objects for pieChart nvd3
        
        Metric.pieGenerateArray = function(obj) {
            var holdArray = [];
            for (var i = 0; i < Object.entries(obj).length; i++) {
                holdArray.push({key: Object.keys(obj)[i], y: Object.values(obj)[i]});
            }
            Metric.pieArray2 = holdArray;
        };


        $rootScope.data2 = function() {
            $rootScope.pieData2 = Metric.pieArray2;
        };
        
        //Scatter Bubble Chart
        $rootScope.scatterOptions = {
            chart: {
                type: "scatterChart",
                height: 450,
                forceX: [0,60],
                forceY: [0,60],
                showLabels: true
            }
        };
        
        $rootScope.scatterGenerateArray = function(arr) {
            var holdArray = [];
          
            for (var i = 0; i < Object.entries(arr).length; i++) {
                var time = Object.values(arr[i])[5].toString();
                secondsCalc = time.slice(17,19);
                minuteCalc = time.slice(14,16);
                holdArray.push({key: Object.values(arr[i])[0], values:[{x: secondsCalc, y: minuteCalc, size: 5, shape: 'circle'}]});
            }
            Metric.testSeconds = secondsCalc;
            Metric.testMinutes = minuteCalc;
            $rootScope.scatterData = holdArray;  
        };
        
        Metric.testSeconds = "";
        Metric.testMinutes = "";
        
        
        
        //data for scatter plot
        // $rootScope.scatterData = [
        //     {key: "group1", values:[{x: 2, y: 1, size: 5, shape: 'circle'}]}
        // ];
        
        return Metric;    
    }
    
    angular
        .module('blocJams')
        .service('Metric', ['$rootScope', Metric]);
})();

