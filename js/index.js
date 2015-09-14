var ivApp = angular.module("MyApp");
           ivApp.controller("AppCtrl", function ($scope, $http) {



 $scope.someBody = "";
 $scope.someTitle = "Ivoirian Puzzles";
 $scope.archiveUrl = "#archive";
 $scope.puzzleUrl = "#puzzle";

  // ALL THE IMPORTANT VARIABLES

  var popular_color = '#03A9F4';
  var less_popular = '#212121';
  //var post_count = puzzles.response.total_posts;
  var post_count;
  var square_size = 1;
  var posts = [];
  //$scope.loadGrid = false;


  loadPosts(function(posts) {

  $scope.allTiles = posts;
  console.log(posts);

});



  function loadPosts (callback) {

    posts = [];

    var retrieve_more = function (offset) {

    var key = "api_key=AtAx2nkLkrkUJUE6bLu2upJ1HkJBsQ7sYZEyr9Acc9voec6nQd";
    var api = "https://api.tumblr.com/v2/blog/ivoirians.tumblr.com/";
    var url = api + "posts/text?filter=html&limit=20&offset=" + offset + "&" + key;

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
            "colspan": square_size + 1,
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

    //var win = window.open(puzzles.response.posts[$index].post_url, '_blank');
    //win.focus();
    $scope.someTitle = posts[$index].title;
    $scope.someBody = posts[$index].body;

  }


  $scope.aboutP = function(){

    //var win = window.open(puzzles.response.posts[$index].post_url, '_blank');
    //win.focus();
    $scope.someTitle = "About";
    $scope.someBody = '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at velit maximus, semper elit eget, tempor metus. Suspendisse imperdiet suscipit suscipit. Maecenas vitae nunc eleifend, commodo quam et, convallis elit. Sed id leo sit amet nisl gravida congue. Maecenas lacinia eleifend neque, eu pretium sapien sagittis vel. Quisque commodo, risus eget auctor venenatis, neque ante blandit metus, non facilisis augue magna in dui. Nunc cursus fermentum urna, a iaculis enim maximus nec. In eu fringilla tellus. Vestibulum vitae arcu at velit congue faucibus sed id mi. Integer sit amet neque id ipsum ornare rutrum. Donec fermentum diam non feugiat tristique. Curabitur rutrum eros eu mi dignissim rhoncus. Cras eget elit quis lectus tincidunt hendrerit varius a libero. Aliquam tristique neque nec nibh convallis, eget imperdiet ipsum gravida. Aenean in odio egestas, fringilla elit vel, vehicula lectus.</p>';

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

ivApp.config(function($sceProvider) {
  // Completely disable SCE.  For demonstration purposes only!
  // Do not use in new projects.
  $sceProvider.enabled(false);
});
