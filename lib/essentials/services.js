define(['jquery'], function($){
	var loginData;
  
	function setHeader(xhr) {
	  xhr.setRequestHeader('Authorization', loginData.token);
	}
	
	
	$.ajaxPrefilter(function(options, originalOptions, jqXHR){
            //options.url = 'https://game-service.herokuapp.com' + originalOptions.url;
            options.url = 'http://localhost:3000' + originalOptions.url;           
        });

	function defaultCb(data, status){
        console.log(status, data);
    } 

	var level = function(levelIndex, cb){
		//console.log("levelIndex:" + levelIndex);
		$.ajax({
          method: "POST",          
          url: '/level',
          data: {levelIndex: levelIndex},
          success: cb || defaultCb
        });
	}

	var login = function(username, password, cb){
		//console.log("levelIndex:" + levelIndex);
		$.ajax({
          method: "POST",          
          url: '/login',
          data: {username: username, password: password},
          success: function(data, status, hh){
          	//console.log(hh)
          	cb = cb || defaultCb;
          	if( data.success){
          		loginData = data;
          		$(window).trigger("loggedIn", username);
          	}
	        cb(data, status)
	      }
	      
        });
	}

	
	var register = function(username, password, cb){
		//console.log("levelIndex:" + levelIndex);
		$.ajax({
          method: "POST",          
          url: '/register',
          data: {username: username, password: password},
          success: function(data, status, hh){
          	//console.log(hh)
          	cb = cb || defaultCb;
          	if(data.success){
          		loginData = data;
          		$(window).trigger("loggedIn", username);
          	}
	        cb(data, status)
	      }
        });
	}

	var leaderProfile = function(cb){
		//console.log("levelIndex:" + levelIndex);
		$.ajax({
          method: "GET", 
          beforeSend: setHeader,         
          url: '/leaderProfile',
          success: cb || defaultCb
        });
	}

	var profile = function(cb){
		//console.log("levelIndex:" + levelIndex);
		$.ajax({
          method: "POST",
          beforeSend: setHeader,          
          url: '/profile',
          //xhrFields: { withCredentials:true },
          success: cb || defaultCb
        });
	}

	var score = function(levelIndex, score, cb){
		//console.log("levelIndex:" + levelIndex);
		$.ajax({
          method: "POST",
          beforeSend: setHeader,          
          url: '/score',
          data: {levelIndex: levelIndex, score: score},
          //xhrFields: { withCredentials:true },
          success: cb || defaultCb
        });
	}
	
	var editProfile = function(data, cb){
		//console.log("levelIndex:" + levelIndex);
		$.ajax({
          method: "POST", 
          beforeSend: setHeader,          
          url: '/editProfile',
          data: data,
          success: cb || defaultCb
        });
	}

  var changePassword = function(data, cb){
    //console.log("levelIndex:" + levelIndex);
    $.ajax({
          method: "POST", 
          beforeSend: setHeader,          
          url: '/changePassword',
          data: data,
          success: cb || defaultCb
        });
  }
	
	var logout = function(cb){
		//console.log("levelIndex:" + levelIndex);
		$.ajax({
          method: "GET", 
          beforeSend: setHeader,         
          url: '/logout',
          success: function(data, status, hh){
            //console.log(hh)
            cb = cb || defaultCb;
            if(data.success){
              loginData = undefined;              
            }
          cb(data, status)
        }
	 });
  }

	return {
		level: level,
		login: login,
		register: register,
		leaderProfile: leaderProfile,
		profile: profile,
		editProfile: editProfile,
    changePassword: changePassword,
		logout: logout,
		score: score,
		getLoginData: function(){return loginData;}

	}
});