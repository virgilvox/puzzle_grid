
angular.module('MyApp')
.controller('AppCtrl', function($scope) {
 
// ALL THE IMPORTANT VARIABLES

var popular_color = '#03A9F4';
var less_popular = '#212121';
//var post_count = puzzles.response.total_posts;
var post_count = 20;
var square_size = 2;


  this.colorTiles = (function() {
    var tiles = [];
    
    for (var i = 0; i < post_count; i++) {
      tiles.push({
        color: pickColor(i),
        colspan: square_size,
        rowspan: square_size
      });
    }
    return tiles;
  })();

  $scope.clicked = function($index){

    var win = window.open(puzzles.response.posts[$index].post_url, '_blank');
    win.focus();
    
  }


  function pickColor(i) {


    var count = puzzles.response.posts[i].note_count;
     
    //console.log(count);
    var color;
    if(count >= 2){

      color = popular_color;
    
    }else if(count <= 2 || count === 0){

      color = less_popular;
    }

    return color;
  }

  
});