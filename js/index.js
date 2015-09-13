
angular.module('MyApp')
.controller('AppCtrl', function($scope, $http) {

  // ALL THE IMPORTANT VARIABLES

  var popular_color = '#03A9F4';
  var less_popular = '#212121';
  //var post_count = puzzles.response.total_posts;
  var post_count;
  var square_size = 1;
  //$scope.loadGrid = false;


  loadPosts(function(posts) {

  $scope.allTiles = posts;
  console.log(posts);

});



  function loadPosts (callback) {

    var posts = [];

    var retrieve_more = function (offset) {

    var key = "api_key=AtAx2nkLkrkUJUE6bLu2upJ1HkJBsQ7sYZEyr9Acc9voec6nQd";
    var api = "https://api.tumblr.com/v2/blog/ivoirians.tumblr.com/";
    var url = api + "posts/text?filter=text&limit=20&offset=" + offset + "&" + key;

    var req = {
   "method": 'GET',
   "url": url,
   "headers": {
     "Content-Type": "application/json"
   }
  };

    $http(req).
      then(function(response) {

        var resp = response.data.response;
        post_count = resp.total_posts;
        //console.log(resp);
        angular.forEach(resp.posts, function(data) {
          var value = {
            "color": pickColor(data.note_count),
            "colspan": square_size,
            "rowspan": square_size,
            "title": data.title,
            "body": data.body,
            "tags": data.tags,
            "post_url": data.post_url ,
            "slug": data.slug,
            "node_count": data.note_count
          };
          this.push(value);
        }, posts);

        if (resp.posts.length == 20) {
          if(offset < resp.total_posts){
            retrieve_more(offset + 20);
          }
        }else{
            console.log(posts);
            $scope.loadGrid = true;
            callback(posts);
        }

      }, function(response) {
      });

  };

  retrieve_more(0);
}



  $scope.clicked = function($index){

    var win = window.open(puzzles.response.posts[$index].post_url, '_blank');
    win.focus();

  }


  function pickColor(i) {
    var count = i;
    var color;

    if(count >= 2){
      color = popular_color;
    }else if(count <= 2 || count === 0){
      color = less_popular;
    }

    return color;
  }


});
