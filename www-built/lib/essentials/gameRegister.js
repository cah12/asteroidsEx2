define(["jquery","services"],function(e,t){function r(t){t?(e("#gameViewDiv").hide(),n.show(),e("input[type=text], textarea").val(""),e("input[type=password], textarea").val(""),e(window).trigger("gameView",!1)):(e("#gameViewDiv").show(),n.hide(),e(window).trigger("gameView",!0))}var n=e('<div class="row"><div class="col-md-6 col-md-offset-3"><h2 class="text-center">Please Sign Up</h2><div class="well"><form><div class="form-group has-feedback"><label class="control-label" for="username">Real Name</label><input type="text" class="form-control" name="name" placeholder="Enter a name"><span class="glyphicon glyphicon-remove form-control-feedback hide"></span></div><div class="form-group has-feedback"><label class="control-label" for="username">Username</label><input id="registerUsernameField" type="text" class="form-control" name="username" placeholder="Enter a username"><span class="glyphicon glyphicon-remove form-control-feedback hide"></span></div><div class="form-group has-feedback"><label class="control-label" for="password">Password</label><input id="registerPasswordField" type="password" class="form-control" name="password" placeholder="Enter a password"><span class="glyphicon glyphicon-remove form-control-feedback hide"></span></div><input id="registerViewButton" type="button" value="Sign up" class="btn btn-lg btn-primary"><input id="registerCancel" type="reset" value="Cancel" class="btn btn-lg btn-primary"></form></div></div></div>');e("#maincontainer").append(n),n.hide(),e("#register").click(function(){r(!0)}),e("#registerViewButton").click(function(){t.register(e("#registerUsernameField").val(),e("#registerPasswordField").val(),function(e,t){console.log("data: ",e),e.success?r(!1):alert("Username already taken")})}),e("#registerCancel").click(function(){r(!1)})});