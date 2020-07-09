
define(['jquery', 'backbone'], function($, Backbone){
var register_view = null;
var login_view = null;
var profile_view = null;
var game_view = null;


var registerStr =
'<div class="container"><div class="row"><div class="col-md-6 col-md-offset-3"><h2 class="text-center">Please Sign Up</h2><div class="well">'+
'<div class="form-group has-feedback"><label class="control-label" for="username">Real Name</label>'+
'<input type="text" class="form-control" name="name" placeholder="Enter a name">'+
'<span class="glyphicon glyphicon-remove form-control-feedback hide"></span>'+
'</div><div class="form-group has-feedback"><label class="control-label" for="username">Username</label>'+
'<input type="text" class="form-control" name="username" placeholder="Enter a username">'+
'<span class="glyphicon glyphicon-remove form-control-feedback hide"></span>'+
'</div><div class="form-group has-feedback"><label class="control-label" for="password">Password</label>'+
'<input type="password" class="form-control" name="password" placeholder="Enter a password">'+
'<span class="glyphicon glyphicon-remove form-control-feedback hide"></span>'+
'</div><button id="registerbutton" class="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button></div></div></div></div>';


var loginStr =
'<div class="row"><div class="col-md-6 col-md-offset-3"><h2 class="text-center">Please login</h2><div class="well">'+
'<form action="" method="post"><div class="form-group has-feedback"><label class="control-label" for="username">Username</label>'+
'<input type="text" class="form-control" name="username" placeholder="Enter a username">'+
'<span class="glyphicon glyphicon-remove form-control-feedback hide"></span></div><div class="form-group has-feedback">'+
'<label class="control-label" for="password">Password</label>'+
'<input type="password" class="form-control" name="password" placeholder="Enter a password">'+
'<span class="glyphicon glyphicon-remove form-control-feedback hide"></span>'+
'</div><input type="submit"value="Login" class="btn btn-lg btn-primary btn-block"><form></div></div> </div></div>';

/*
var gameStr = 
'<div id="maincontainer" class="container-fluid"><div class="row">'+
'<div id="col1" class="col-md-3 col-xs-12" style="text-align:center"><a href="/login">Login Here</a><a href="/register">Register Here</a>'+
'<br></div><div id="gameDiv" class="col-md-6 col-xs-12"><button id="services">Service API Test</button>'+
'<div id="scoreboardDiv" class="scoreboard"><a href="#" id="soundlink"><span id="soundlinkicon" class="glyphicon glyphicon-volume-up">'+     
'</span></a></div><div id="gameEndDiv">End</div><canvas id="gameCanvas" style="background-color:black;"></canvas>'+        
'</div><div class="col-md-3 col-xs-12" style="text-align:center"><div id="leaderboard"><span id="level"></span>'+ 
'<span>leader:</span><a id="name_href" href=""></a><span id="name"></span><span id="score">0</span></div><br>'+
'<button id="restartButton" type="button" class="btn btn-primary btn-sm">Restart</button>'+
'<button id="pauseButton" type="button" class="btn btn-primary btn-sm">Pause</button>'+       
'<button id="levelButton" type="button" class="btn btn-primary btn-sm">Level</button><br><br></div></div><div id="controls" class="row">'+
'<div class="col-xs-3" style="text-align:center"><div id="arrowsDiv" style="position: relative">'+
'<button id="upArrowButton" type="button" class="btn btn-default btn-md" style="background-color:yellow">'+
'<span class="glyphicon glyphicon-arrow-up"></span></button><br><br>'+
'<button id="downArrowButton" type="button" class="btn btn-default btn-md" style="background-color:yellow">'+
'<span class="glyphicon glyphicon-arrow-down"></span></button></div></div><div class="col-xs-6" style="text-align:center"></div>'+
'<div class="col-xs-3"><div id="fireButtonDiv" style="position: relative">'+
'<button id="fireButton" type="button" class="btn btn-default btn-md" style="color:white; background-color:red">Fire</button></div>'+ 
'</div></div></div>';
*/

var gameStr = 
'<div id="maincontainer" class="container-fluid"><div class="row"><div id="col1" class="col-md-3 col-xs-12" style="text-align:center">'+
'<span id="notAuthenticatedSpan"><a href="#" id="login">Login Here</a> <a href="/register">Register Here</a><br></span>'+
'<span id="authenticatedSpan">Hello, <span id="username"></span><a href="/profile"> Profile</a></span></div>'+
'<div id="gameDiv" class="col-md-6 col-xs-12"><div id="scoreboardDiv" class="scoreboard"><a href="#" id="soundlink">'+
'<span id="soundlinkicon" class="glyphicon glyphicon-volume-up"></span></a></div><div id="gameEndDiv">End</div>'+
'<canvas id="gameCanvas" style="background-color:black;"></canvas></div><div class="col-md-3 col-xs-12" style="text-align:center">'+
'<div id="leaderboard"><span id="level"></span><span>leader:</span><a id="name_href" href=""></a>'+
'<span id="name"></span> (score: <span id="score">0</span>)</div><br>'+
'<button id="restartButton" type="button" class="btn btn-primary btn-sm">Restart</button>'+
'<button id="pauseButton" type="button" class="btn btn-primary btn-sm">Pause</button>'+       
'<button id="levelButton" type="button" class="btn btn-primary btn-sm">Level</button><br><br></div></div><div id="controls" class="row">'+
'<div class="col-xs-3" style="text-align:center"><div id="arrowsDiv" style="position: relative">'+
'<button id="upArrowButton" type="button" class="btn btn-default btn-md" style="background-color:yellow">'+
'<span class="glyphicon glyphicon-arrow-up"></span></button><br><br>'+
'<button id="downArrowButton" type="button" class="btn btn-default btn-md" style="background-color:yellow">'+
'<span class="glyphicon glyphicon-arrow-down"></span></button></div></div><div class="col-xs-6" style="text-align:center"></div>'+
'<div class="col-xs-3"><div id="fireButtonDiv" style="position: relative">'+
'<button id="fireButton" type="button" class="btn btn-default btn-md" style="color:white; background-olor:red">Fire</button>'+ '</div></div></div></div>';

var profileStr =
'<div class="container"><div class="page-header text-center"><h1><span class="fa fa-anchor"></span> User Profile</h1>'+
'<a href="/logout" class="btn btn-default btn-sm">Logout</a><a href="/editProfile" class="btn btn-default btn-sm">Edit profile</a>'+
'<a href="/changePassword" class="btn btn-default btn-sm">Change password</a><a href="/" class="btn btn-default btn-sm">Back to game</a>'+	'</div><div class="row"><div class="col-xs-12"><div class="well"><h3><span class="fa fa-user"></span> Local</h3><p>'+
'<strong>Real name</strong>: Sam Bam<br><strong>username</strong>: Sam<br>'+
'<strong>email</strong>: <a href="mailto:"+"myemail@yahoo.com>myemail@yahoo.com</a><br><strong>Occupation</strong>:Carpenter<br>'+
'<strong>Hobby</strong>: Tenis<br><strong>Country</strong>: Guyana<br>'+
'<strong>Date created</strong>: 03/24/16<br><strong>Last update</strong>: 03/23/16<br><br>'+
'<strong>Last visitor</strong>: Tom<a href="mailto:"+lastvisitoremail@yahoo.com>(visitoremail@yahoo.com)</a><br>';
'<strong>Time of visit</strong>: 03/24/2016<br></p></div></div></div></div>';

function makeView(str){
   var View = Backbone.View.extend({
      		el: $('#container'),
      		// template which has the placeholder 'who' to be substitute later
      		template: _.template("<%= view %>"),
      		initialize: function(){
        	//this.render();
      	},
      	render: function(){
        	// render the function using substituting the varible 'who' for 'world!'.
        	this.$el.html(this.template({view: str}));
        	//***Try putting your name instead of world.
      		}
   	});
        return new View();
}

  var registerView = function(){
      if(!register_view){         
        register_view = makeView(registerStr);
      }
      return register_view;
    
  }

  var loginView = function(){
      if(!login_view){         
        login_view = makeView(loginStr);
      }
      return login_view;
    
  }  

  var profileView = function(){
      if(!profile_view){         
        profile_view = makeView(profileStr);
      }
      return profile_view;
    
  }

  var gameView = function(){
      if(!game_view){         
        game_view = makeView(gameStr);
      }
      return game_view;
    
  }

  
  return {
      registerView: registerView,
      loginView: loginView,
      profileView: profileView,
      gameView: gameView
   }

})





