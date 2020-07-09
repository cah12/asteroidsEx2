define(['jquery', 'services'], function($, Services){
var registerViewDiv =
$('<div class="row"><div class="col-md-6 col-md-offset-3">'+
'<h2 class="text-center">Please Sign Up</h2><div class="well"><form>'+
'<div class="form-group has-feedback"><label class="control-label" for="username">Real Name</label>'+
'<input type="text" class="form-control" name="name" placeholder="Enter a name">'+
'<span class="glyphicon glyphicon-remove form-control-feedback hide"></span>'+
'</div><div class="form-group has-feedback"><label class="control-label" for="username">Username</label>'+
'<input id="registerUsernameField" type="text" class="form-control" name="username" placeholder="Enter a username">'+
'<span class="glyphicon glyphicon-remove form-control-feedback hide"></span>'+
'</div><div class="form-group has-feedback"><label class="control-label" for="password">Password</label>'+
'<input id="registerPasswordField" type="password" class="form-control" name="password" placeholder="Enter a password">'+
'<span class="glyphicon glyphicon-remove form-control-feedback hide"></span>'+
'</div><input id="registerViewButton" type="button" value="Sign up" class="btn btn-lg btn-primary">'+
'<input id="registerCancel" type="reset" value="Cancel" class="btn btn-lg btn-primary">'+
'</form></div></div></div>');

$("#maincontainer").append(registerViewDiv);
registerViewDiv.hide();

        function registerView(show){
           if(show){
               $("#gameViewDiv").hide();
               registerViewDiv.show();
               $("input[type=text], textarea").val("");
               $("input[type=password], textarea").val("");
               $(window).trigger("gameView", false);
           }else{
               $("#gameViewDiv").show();
           registerViewDiv.hide();
               $(window).trigger("gameView", true);
           }

      }           

          $("#register").click(function(){
              registerView(true)
          }); 
          
          $("#registerViewButton").click(function(){
                Services.register($("#registerUsernameField").val(), $("#registerPasswordField").val(),function(data, status){
                    //console.log("data: ", data);
                    if(data.success){
                        registerView(false);
                    }else{
                        alert("Username already taken");
                    }
                    
                });
          });

		$("#registerCancel").click(function(){
		    registerView(false)
         });

    // return {
    //   registerView: registerView
    // }
});