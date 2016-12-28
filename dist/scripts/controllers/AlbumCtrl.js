(function () {
    function AlbumCtrl() {
        this.albumData = [];
        // album.length correct?
        for (var i=0; i < 5; i++) {
            this.albumData.push(angular.copy(albumPicasso));            
        }               
    }
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);

})();