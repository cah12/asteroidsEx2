define(['jquery', 'services'], function($, Services){

var loginViewDiv =
$('<div class="row"><div class="col-md-6 col-md-offset-3"><h2 class="text-center">'+
'Please login</h2><div class="well"><form><div class="form-group has-feedback">'+
'<label class="control-label" for="username">Username</label>'+
'<input id="loginUsernameField" type="text" class="form-control" name="username" placeholder="Enter a username">'+
'<span class="glyphicon glyphicon-remove form-control-feedback hide"></span></div><div class="form-group has-feedback">'+
'<label class="control-label" for="password">Password</label>'+
'<input id="loginPasswordField" type="password" class="form-control" name="password" placeholder="Enter a password">'+
'<span class="glyphicon glyphicon-remove form-control-feedback hide"></span></div>'+
'<input id="loginViewButton" type="button" value="Login" class="btn btn-lg btn-primary">'+
'<input id="loginCancel" type="button" value="Cancel" class="btn btn-lg btn-primary">'+
'<span id="loginMsg" style="color: red; font-size: 100%"> Ooops... invalid entry!</span>'+
'</form></div></div> </div>');

$("#maincontainer").append(loginViewDiv);
loginViewDiv.hide();
//$("#loginMsg").hide();

          function loginView(show){
               if(show){
                   $("#loginMsg").hide();
                   $("#gameViewDiv").hide();
                   //$("#loginViewDiv").show();
                   loginViewDiv.show();
                   $(window).trigger("gameView", false);
               }else{
                    $("#gameViewDiv").show();
                loginViewDiv.hide();
                   $(window).trigger("gameView", true);
               }

      }

        
            
            $("#login").click(function(){
               loginView(true);
            });   
          
            $("#loginViewButton").click(function(){
                Services.login($("#loginUsernameField").val(), $("#loginPasswordField").val(),function(data, status){
                    //console.log("data: ", data);
                    if(data.success){
                        loginView(false);
                    }else{
                        //alert("Incorrect username or password");
                        $("#loginMsg").show();
                    }
                    
                });
          });

      $("#loginCancel").click(function(){
                loginView(false)
          });
    // return {
    //   loginView: loginView
    // }   
} );
