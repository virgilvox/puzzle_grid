
angular.module('MyApp')
.controller('AppCtrl', function($scope, $http) {

  // ALL THE IMPORTANT VARIABLES

  var popular_color = '#03A9F4';
  var less_popular = '#212121';
  //var post_count = puzzles.response.total_posts;
  var post_count = 20;
  var square_size = 1;


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



  function loadPosts () {
    console.log('this thing');
  var key = "api_key=HLIFUzqaly1F7T5plo6pv8FnZCINJMIYdGBYjtpZNwpzmfeaGM";
  var api = "https://api.tumblr.com/v2/blog/ivoirians.tumblr.com/";
  var retrieve_more = function (offset) {
    $http.get(api + "posts/text?callback=?&filter=text&limit=20&offset=" + offset + "&" + key).
      then(function(response) {
        if (response.posts.length == 20) {
            retrieve_more(offset + 20);
        }
        console.log(response);
      }, function(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

  };

  retrieve_more(0);
}

loadPosts();


  $scope.clicked = function($index){




    var win = window.open(puzzles.response.posts[$index].post_url, '_blank');
    win.focus();

  }


  function pickColor(i) {
    var count = puzzles.response.posts[i].note_count;
    var color;

    if(count >= 2){
      color = popular_color;
    }else if(count <= 2 || count === 0){
      color = less_popular;
    }

    return color;
  }


});
