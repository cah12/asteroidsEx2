define(['jquery', 'services', 'gameRegister', 'gameLogin', 'gameProfile', 'box2dCore', 'howler', 'faye'], 
  function($, Services) {
    var Game = function(details) {
        var self = this;
        this.details = details = details || {};
        var fps = details.FPS = details.FPS || 60;
        var collision = details.collision = details.collision || true;
        var bounded = details.bounded = details.bounded || true;
        var physicsEnabled = details.physicsEnabled = details.physicsEnabled || true;
        var physics = null;

        //this.gameEndMessage = "";

        this.soundEnabled = true;

        this.smallScreen = screen.width < 900 || false;
        //console.log("smallScreen:", screen.width)

        var currentGameLevel = 0;

        // $("#gameDiv").css({top: 50, left: 0, position:'absolute'});  
        
        
        var canvas = $("#gameCanvas");

        //console.log("width:", $(window).width())

        //This is constant over different screen resolutions
        //Physics scale is computed based on "gameboardHeightMeters"
        //var scale = canvas[0].height/this.gameboardHeightMeters 
        this.gameboardHeightMeters =
            details.boardHeightMeters = details.boardHeightMeters || 25;

        //This is calculated from the physics scale.
        //this.gameboardWidthMeters = canvas[0].width/scale
        this.gameboardWidthMeters = 0;

        canvas[0].width = $("#gameDiv").width();
        canvas[0].height = $("#gameDiv").width();

        $(window).resize(function(){
            canvas[0].width = $("#gameDiv").width();
            canvas[0].height = $("#gameDiv").width();
            

        });
        

        $("#fireButtonDiv").css("top", 0.2 * canvas[0].height);
        $("#arrowsDiv").css("top", 0.5 * canvas[0].height);

        this.stageRect = function() {
            //console.log(canvas)
            return {
                x: 0,
                y: 0,
                width: canvas[0].width,
                height: canvas[0].height
            };
        }

        if (!this.smallScreen) {
            $("#controls").hide()
        }


        if (physicsEnabled) {
            var scale = canvas[0].height / this.gameboardHeightMeters;
            this.gameboardWidthMeters = canvas[0].width / scale;
            physics = new Physics(canvas[0], scale);
            physics.running = false;
            // console.log("physics.scale:", physics.scale);            
            // console.log("gameboardWidthMeters:", this.gameboardWidthMeters);
            // console.log("gameboardHeightMeters:", this.gameboardHeightMeters);
            if (collision)
                physics.collision();
            if (bounded)
                physics.screenBoundaries(details.boundary);
        }

        this.debug = function() {
            physics.debug();
        }


        this.pause = function(set, callBack) {
            if (!physics)
                return;
            physics.running = !set;
            if (!_.isUndefined(callBack))
                callBack(set);
            $(window).trigger("gamePause");
        }

        this.end = function(callBack) {
            if (!physics)
                return;
            physics.running = false;
            if (!_.isUndefined(callBack))
                callBack();
            $(window).trigger("gameEnd");
        }

        this.start = function(callBack) {
            if (!physics)
                return;
            physics.running = true;
            if (!_.isUndefined(callBack))
                callBack();
            $(window).trigger("gameStart");
        }

        this.trigger = function(event, data) {
            $(window).trigger(event, data);
        }

        this.
        catch = function(event, callBack) {
            $(window).on(event, callBack);
        }

        this.destroyBody = function(bdy) {
            physics.destroyBody(bdy);
        }

        this.gamePhysics = function() {
            return physics;
        }

        physics.animate();

	

        ///////////////////////
        //ImageLoader
        ///////////////////////
        var imgMap = {};
        var doPreload = function(item) {
            if (item.id === undefined || item.src === undefined)
                throw "ImageLoader: invalid arguments to preload function";
            var img = new Image();
            img.src = item.src;
            if (imgMap[item.id] === undefined) //id not taken
                imgMap[item.id] = img;
            else //id taken
                throw "ImageLoader: duplicte id";
        }
        this.preload = function(items) {
            if (_.isArray(items))
                _.each(items, doPreload);
            else
                doPreload(items);
        }

        this.image = function(id) {
            if (_.isUndefined(id))
                throw "Game: expected an argument fo image()."
            return imgMap[id];
        }

        this.hideCanvas = function(set) {
            if (_.isUndefined(set) || set)
                canvas.hide()
            else
                canvas.show()
        }

        $("#soundlink").on("click", function() {
            var $icon = $("#soundlinkicon");
            if (self.soundEnabled) {
                $icon.removeClass("glyphicon-volume-up");
                $icon.addClass("glyphicon-volume-off");
                self.soundEnabled = false;
            } else {
                $icon.removeClass("glyphicon-volume-off");
                $icon.addClass("glyphicon-volume-up");
                self.soundEnabled = true;
            }
            //console.log("soundEnabled:", self.soundEnabled);
        });

        $("#gameEndDiv").hide();
        $("#authenticatedSpan").hide();

        $(window).on("loggedIn", function(ev, username) {
                //console.log(username);
                $("#authenticatedSpan").show();
                $("#notAuthenticatedSpan").hide();
                $("#username").text(username);
                //var leaderName = $("#name").text().replace(',', '');
                if ($("#username").text() !== $("#name").text()) {
                    $("#name_href").show();
                    $("#name").hide();
                }
                
            });


        this.initLeader = function(gameScoreCb) { 

            var updated = false;         
            function writeLeaderInfo(data) {
                //console.log("writeLeaderInfo: ", data);
                $("#score").text(data.score);
                $("#level").text(data.level);
                $("#name").text(data.name);
                $("#name_href").text(data.name);
                //console.log("username text: ", $("#username").text())
                if ($("#username").text()==="" || $("#username").text() === data.name) {
                    $("#name_href").hide();
                    $("#name").show();
                } else {
                    $("#name_href").show();
                    //$("#name_href").prop("href", "/leaderProfile/" + data.level);
                    $("#name").hide();
                }
            }

            
            function updateLeaderBoard() {
                
                //console.log("updated: ", updated)
                if (!updated) {
                    Services.level(currentGameLevel, function(data, status){
                        //console.log("updateLeaderBoard: ", data);
                        writeLeaderInfo(data);
                        updated = true; 
                        poll();                   
                    });
                }
                
            }

            updated = false;
            updateLeaderBoard();


            $(window).on("gameLevelChanged", function(obj, level) {
                currentGameLevel = level;
                updated = false;
                updateLeaderBoard();
            });

            var postSuccess = false;
            $(window).on("gameStart", function() {
                postSuccess = false;
                $("#gameEndDiv").hide();
                //console.log("postSuccess:", postSuccess)
            })

            $(window).on("gameEnd", function() {
                if (self.gameEndMessage)
                    $("#gameEndDiv").text(self.gameEndMessage)
                $("#gameEndDiv").show();
                //console.log("score:", gameScoreCb())                
                if ($("#score").text() < gameScoreCb() && !postSuccess) {
                    postSuccess = true;
                    updated = false;
                    Services.score(currentGameLevel, gameScoreCb(), function(data, status){
                        //console.log("score status: ", status );
                        //console.log("score data: ", data );
                    });
                    
               }

            });

            function poll() {               
               setTimeout(function() {
                   //console.log(44)
                   updated = false;                   
                   updateLeaderBoard();
                }, 5000);
            }
            
            

        // setTimeout(function(){  
                      
        //     var client = new Faye.Client('https://game-service.herokuapp.com/faye', {
        //           timeout: 120
        //           });
        //     console.log("client: ", client)
        //     if(client){
        //         client.subscribe('/channel', function(leaderData) { 
        //             if($("#level").text() === leaderData.level){
        //                 //If we get here, we have a new leader.
        //                 console.log(leaderData);
        //                 writeLeaderInfo(leaderData);
        //                 //alert(scoreBreakDownCb());
        //             }
        //           });
        //     }
        // }, 2000)
           

            //console.log("client: ", client)       

        }//end initLeader
    }

    return Game;
})