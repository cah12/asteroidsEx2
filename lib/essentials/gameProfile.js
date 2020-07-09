define(['jquery', 'services'], function($, Services) { 
var leaderProfileViewDiv = 
$('<div class="page-header text-center">'+
'<h1><span class="fa fa-anchor"></span> Leader Profile</h1>'+
'<a href="#" id="leaderProfileBackToGame" class="btn btn-default btn-sm">Back to game</a>'+
'</div><div class="row"><div class="col-xs-12"><div class="well"><h3>'+
'<span class="fa fa-user"></span> Local</h3><p>'+
'<strong>Real name</strong>: <span id="leaderProfileRealName"></span><br>'+
'<strong>username</strong>: <span id="leaderProfileUsername"></span><br>'+
'<strong>email</strong>: <a id="leaderProfileEmail"></a><br>'+
'<strong>Occupation</strong>: <span id="leaderProfileOccupation"></span><br>'+
'<strong>Hobby</strong>: <span id="leaderProfileHobby"></span><br>'+
'<strong>Country</strong>: <span id="leaderProfileCountry"></span><br>'+
'<strong>Created at</strong>: <span id="leaderProfileCreatedAt"></span><br>'+
'<strong>Last update</strong>: <span id="leaderProfileLastUpdate"></span>'+
'</p></div></div></div>');

$("#maincontainer").append(leaderProfileViewDiv);
leaderProfileViewDiv.hide();

var editProfileViewDiv =
$('<div class="row"><div class="col-md-6 col-md-offset-3"><h2 class="text-center">Edit your profile</h2>'+
'<div class="well"><form action="" method="post"><div class="form-group has-feedback">'+
'<label class="control-label" for="firstname">Firstname</label>'+
'<input id="editProfileFirstName" type="text" class="form-control" name="firstname">'+
'<span class="glyphicon glyphicon-remove form-control-feedback hide"></span>'+
'</div><div class="form-group has-feedback"><label class="control-label" for="lastname">Lastname</label>'+
'<input id="editProfileLastName" type="text" class="form-control" name="lastname">'+
'<span class="glyphicon glyphicon-remove form-control-feedback hide"></span>'+
'</div><div class="form-group has-feedback"><label class="control-label" for="email">email</label>'+
'<input id="editProfileEmail" type="email" class="form-control" name="email">'+
'<span class="glyphicon glyphicon-remove form-control-feedback hide"></span>'+
'</div><div class="form-group has-feedback"><label class="control-label" for="occupation">Occupation</label>'+
'<input id="editProfileOccupation" type="text" class="form-control" name="occupation">'+
'<span class="glyphicon glyphicon-remove form-control-feedback hide"></span>'+
'</div><div class="form-group has-feedback"><label class="control-label" for="hobby">Hobby</label>'+
'<input id="editProfileHobby" type="text" class="form-control" name="hobby">'+
'<span class="glyphicon glyphicon-remove form-control-feedback hide"></span>'+
'</div><div class="form-group has-feedback"><label class="control-label" for="country">Country</label>'+
'<input id="editProfileCountry" type="text" class="form-control" name="country">'+
'<span class="glyphicon glyphicon-remove form-control-feedback hide"></span>'+
'</div><input id="editProfileSave" type="button" value="Save" class="btn btn-lg btn-primary">'+
'<input id="editProfileCancel" type="reset" value="Cancel" class="btn btn-lg btn-primary">'+
'</form></div></div></div>');

$("#maincontainer").append(editProfileViewDiv);
editProfileViewDiv.hide();

var changePasswordViewDiv =
$('<div class="row"><div class="col-md-6 col-md-offset-3"><h2 class="text-center">Change password</h2>'+
'<div class="well"><form><div class="form-group has-feedback">'+
'<label class="control-label" for="oldPassword">Old password</label>'+
'<input id="oldPassword" type="password" class="form-control" name="oldPassword">'+
'<span class="glyphicon glyphicon-remove form-control-feedback hide"></span>'+
'</div><div class="form-group has-feedback"><label class="control-label" for="newPassword">New password</label>'+
'<input id="newPassword" type="password" class="form-control" name="newPassword">'+
'<span class="glyphicon glyphicon-remove form-control-feedback hide"></span>'+
'</div><div class="form-group has-feedback">'+
'<label class="control-label" for="confirmPassword">Confirm password</label>'+
'<input id="confirmPassword" type="password" class="form-control" name="confirmPassword">'+
'<span class="glyphicon glyphicon-remove form-control-feedback hide"></span>'+
'</div><input id="changePasswordChange" type="button" value="Change" class="btn btn-lg btn-primary">'+
'<input id="changePasswordCancel" type="reset" value="Cancel" class="btn btn-lg btn-primary">'+
'<span id="changePasswordMsg" style="color: red; font-size: 100%"> Ooops... invalid entry!</span>'+
'</form></div></div></div>');

$("#maincontainer").append(changePasswordViewDiv);
changePasswordViewDiv.hide();

var profileViewDiv =
$('<div class="page-header text-center"><h1><span class="fa fa-anchor">'+
'</span> User Profile</h1>'+
'<a href="#" id="logout" class="btn btn-default btn-sm">Logout</a>'+
'<a href="#" id="editProfile" class="btn btn-default btn-sm">Edit profile</a>'+
'<a href="#" id="changePassword" class="btn btn-default btn-sm">Change password</a>'+
'<a href="#" id="backToGame" class="btn btn-default btn-sm">Back to game</a>'+  
'</div><div class="row"><div class="col-xs-12"><div class="well"><h3><span class="fa fa-user"></span> Local</h3><p>'+
'<strong>Real name</strong>: <span id="profileRealName"></span><br>'+
'<strong>username</strong>: <span id="profileUsername"></span><br>'+
'<strong>Occupation</strong>: <span id="profileOccupation"></span><br>'+
'<strong>Hobby</strong>: <span id="profileHobby"></span><br>'+
'<strong>Country</strong>: <span id="profileCountry"></span><br>'+
'<strong>Created at</strong>: <span id="profileCreatedAt"></span><br>'+
'<strong>Last update</strong>: <span id="profileLastUpdate"></span><br><br>'+
'<strong>Last visitor</strong>: <span id="lastVisitorName"></span>'+
'<a id="lastVisitorEmail"></a><br>'+
'<strong>Time of visit</strong>: <span id="lastVisitorDate"></span><br></p></div></div></div>');

$("#maincontainer").append(profileViewDiv);
profileViewDiv.hide();

  //leaderProfile
    $("#name_href").click(function(){
             Services.leaderProfile(function(data, status){
                 //console.log("leaderProfile: ", data);
                 $("#leaderProfileRealName").text(data.meta.firstname + " " + data.meta.lastname);
                 $("#leaderProfileUsername").text(data.username);
                 $("#leaderProfileEmail").attr("href", "mailto:" + data.meta.email);
                 $("#leaderProfileEmail").text(data.meta.email);                
                 $("#leaderProfileHobby").text(data.meta.hobby);
                 $("#leaderProfileCountry").text(data.meta.country);
                 $("#leaderProfileOccupation").text(data.meta.occupation);
                 $("#leaderProfileLastUpdate").text(new Date(data.updated_at));
                 $("#leaderProfileCreatedAt").text(new Date(data.created_at));
                 leaderProfileView(true);
             });
          });

    $("#leaderProfileBackToGame").click(function(){
              leaderProfileView(false)
          });

    function leaderProfileView(show){
           if(show){
               $("#gameViewDiv").hide();
               leaderProfileViewDiv.show();
               $(window).trigger("gameView", false);
           }else{
               $("#gameViewDiv").show();
               leaderProfileViewDiv.hide();
               $(window).trigger("gameView", true);
           }
        }

        function initProfile(data){
            $("#profileRealName").text(data.meta.firstname + " " + data.meta.lastname);
                 $("#profileUsername").text(data.username);
                 $("#profileEmail").attr("href", "mailto:" + data.meta.email);

                 if(data.meta.last_visitor){
                   $("#lastVisitorName").text(data.meta.last_visitor.name);
                   $("#lastVisitorEmail").prop("href", "mailto:" +data.meta.last_visitor.email);
                   $("#lastVisitorEmail").text('('+ data.meta.last_visitor.email + ')');
                   $("#lastVisitorDate").text(new Date(data.meta.last_visitor.date));
                 }else{
                   $("#lastVisitorName").text("");
                   $("#lastVisitorEmail").text("");
                   $("#lastVisitorDate").text("");
                 }
                 
                 $("#profileHobby").text(data.meta.hobby);
                 $("#profileCountry").text(data.meta.country);
                 $("#profileOccupation").text(data.meta.occupation);
                 $("#profileLastUpdate").text(new Date(data.updated_at));
                 $("#profileCreatedAt").text(new Date(data.created_at));
        }

         $("#profile").click(function(){
             Services.profile(function(data, status){
                 initProfile(data);
                 profileView(true)
             });
          });

          $("#backToGame").click(function(){
              profileView(false)
          });

          function profileView(show){
           if(show){
               $("#gameViewDiv").hide();
               profileViewDiv.show();
               $(window).trigger("gameView", false);
           }else{
               $("#gameViewDiv").show();
               profileViewDiv.hide();
               $(window).trigger("gameView", true);
           }
        }

        function editProfileView(show){
           if(show){
               profileViewDiv.hide();
               editProfileViewDiv.show();
           }else{
               profileViewDiv.show();
               editProfileViewDiv.hide();
           }
        }

        function changePasswordView(show){
           if(show){
               $("#changePasswordMsg").hide();
               profileViewDiv.hide();
               changePasswordViewDiv.show();
           }else{
               profileViewDiv.show();
               changePasswordViewDiv.hide();
           }
        }



          $("#logout").click(function(){
            //console.log(44)
              Services.logout(function(data, status){
                //console.log(data);
                $("#authenticatedSpan").hide();
                $("#notAuthenticatedSpan").show();
                $("#name_href").hide();
                $("#name").show();
                profileView(false);
              });
          });
          
          $("#editProfile").click(function(){
            //console.log(44)
            Services.profile(function(data, status){
                //console.log("editProfile: ", data)
                $("#editProfileFirstName").val(data.meta.firstname);
                $("#editProfileLastName").val(data.meta.lastname);
                $("#editProfileHobby").val(data.meta.hobby);
                $("#editProfileOccupation").val(data.meta.occupation);
                $("#editProfileCountry").val(data.meta.country);
                $("#editProfileEmail").val(data.meta.email);
                editProfileView(true);
            })
              
          });
          
          $("#editProfileSave").click(function(){
            Services.editProfile({
               firstname: $("#editProfileFirstName").val(),
               lastname: $("#editProfileLastName").val(),
               hobby: $("#editProfileHobby").val(),
               occupation: $("#editProfileOccupation").val(),
               country: $("#editProfileCountry").val(),
               email: $("#editProfileEmail").val(),
               updated_at: new Date()
            }, function(data, status){
                //console.log("editProfile: ", data);
                
                Services.profile(function(data){
                    initProfile(data);
                    editProfileView(false);
                })
                
            })
              
          }); 
          
          $("#editProfileCancel").click(function(){
            //console.log(44)
              editProfileView(false);
          }); 


          $("#changePassword").click(function(){
            //console.log(44)
              changePasswordView(true);
          }); 

          $("#changePasswordChange").click(function(){
              Services.changePassword({oldPassword: $("#oldPassword").val(), 
                                      newPassword: $("#newPassword").val(),
                                      confirmPassword: $("#confirmPassword").val()},
                function(data, status){
                if(data.id !== undefined ){               
                    changePasswordView(false);
                }else{
                    //alert("One or more invalid entries");
                    $("#changePasswordMsg").show();
                }
                $("input[type=password], textarea").val("");
              });
              
          }); 

          $("#changePasswordCancel").click(function(){
            //console.log(44)
              changePasswordView(false);
          });

          editProfileView(false);//These
          changePasswordView(false);//two must be called
          profileView(false);//before this
          leaderProfileView(false); 
});  
