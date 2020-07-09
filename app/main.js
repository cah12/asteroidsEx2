//This module defines a specific game.
define(['game', 'hud', 'background', 'startup', 'asteroids', 'cannon',/*add other module dependencies here*/],
             function(Game, HUD, Background, Startup, Asteroids, Cannon){
    var MyGame = {
        game: null,
        physics: null,
        //put other properties here
        gamePaused: false,
        asteroidCount: 0,
        asteroids: null,
        HUDcontext: null,
        startup: null,
        hud: null,
        score: 0,
        currentLevelData: null,

        pauseGame: function(set){
            MyGame.gamePaused = set;
            MyGame.asteroids.ready = !set;
        },
        pause: function(){
            MyGame.game.pause(MyGame.hud.isPaused(), MyGame.pauseGame);
        },

        init: function(canvasWidth, canvasHeight){
           
            var game = MyGame.game = new Game({canvasWidth:canvasWidth, 
                                         canvasHeight:canvasHeight});
            //console.log("smallScreen:", game.smallScreen)


        

            var physics = MyGame.physics = game.gamePhysics();
            
            //Preload needed image resources here. Some game component modules have 
            //their own built-in image loaders.
            game.preload([{id:"cannonBase", src:"imgs/cannon_base.png"},
                        {id:"cannon", src: "imgs/cannon.png"},
                        {id:"gameStart", src: "imgs/gameStart.png"},
                        {id:"gameScore", src: "imgs/gameScore.png"},
                        {id:"nightSkyBackground", src:"imgs/nightSkyBackground.png"},
                        {id:"earthBackground", src:"imgs/earthBackground.png"}])


            //put remaining initialization code here

            var left_cannon = false;
            var direction = "right";
            var canChangeDirection = true;
            var numOfShotsFired = 0;
            var numOfAsteroidsMade = 0;         
            var numOfvisibleAsteroids = [10, 8, 5];
            var numOfShots = [500, 400, 300];
            var pointsPerShot = [5, 10, 15];
            var numberOfHits = 0;

            var stageRect = game.stageRect();
            //console.log(stageRect)


            var cannon = new Cannon(game, { x: 3, 
                               y: 21,
                               cannonBase: game.image("cannonBase"),//use preloaded images
                               cannon: game.image("cannon")//use preloaded images                           
                           });
            $(window).on("gameView", function(ev, visible){
               //console.log("visible:", visible)
               cannon.enableKeyboardControl(visible);
           });

           
            function increaseScore(){
                MyGame.score += 20;                
                MyGame.hud.scoreSpan.text(MyGame.score);
            } 

            function decreaseScore(){
                if(MyGame.startup.currentLevelIndex === 0)
                  MyGame.score -= 5;
                if(MyGame.startup.currentLevelIndex == 1)
                  MyGame.score -= 10;
                if(MyGame.startup.currentLevelIndex == 2)
                  MyGame.score -= 15;
                MyGame.hud.scoreSpan.text(MyGame.score);
            }       

            MyGame.asteroids = new Asteroids(game.gamePhysics(), 
                {contactCallback: function(contact, impulse, otherBody){
                           if(this.id=="asteroid" && otherBody.id == "ball"){ 
                              MyGame.asteroids.explodeBody(this); 
                             // physics.destroyBody(otherBody);
                               game.destroyBody(otherBody)                               
                           }
                    }});

            MyGame.asteroids.makeAsteroids();
            
            new Background.Moving(game.gamePhysics(),  {imageSource: game.image("nightSkyBackground"), move: "vertical", speed: 0.2});        
            new Background.Static(game.gamePhysics(), {imageSource: game.image("earthBackground")});      
              
                   
            //game.debug();
        
        
            $(window).on("asteroidExploded", function(){
                --MyGame.asteroidCount;  
                increaseScore(); 
                numberOfHits++;
            });
        
            $(window).on("shotFired", function(){
                ++numOfShotsFired;
                decreaseScore();  
                //console.log( numOfShotsFired);
                if(numOfShotsFired > numOfShots[MyGame.startup.currentLevelIndex]){
                    game.end();
                    MyGame.asteroids.ready = false; 
                }
            });

            $(window).on("asteroidAboutToBeMade", function(){
                if(MyGame.asteroidCount > numOfvisibleAsteroids[MyGame.startup.currentLevelIndex] ){                    
                   // MyGame.asteroids.ready = false; 
                    MyGame.score = 0; 
                    MyGame.hud.scoreSpan.text(MyGame.score);
                    game.gameEndMessage = "Ooops... Game End";                 
                    game.end();                       
                    MyGame.asteroids.ready = false; 
                }     
                              
            });

            $(window).on("asteroidMade", function(){
                ++MyGame.asteroidCount; 
                ++numOfAsteroidsMade;
                if(numOfAsteroidsMade > 9){
                    game.gameEndMessage = "Game End"; 
                    game.end();
                    MyGame.asteroids.ready = false; 
                }
                                         
            });       

        
            
            MyGame.startup = new Startup(            
                {
                    game: game,
                    startGame: function(){                  
                        MyGame.hud.gameStarted();  
                        game.pause(false, MyGame.pauseGame); 
                        game.start();                                                     

                    },
                    imageSrc: game.image("gameStart"),
                    //imageSrc: WixImageMap.gameStart,
                    stageRect: stageRect,
                    levels: [
                        'Level 1',
                        'Level 2',
                        'Level 3'
                        ],
                    levelExplaination: [
                        "Number of shots: 500\nCost of 1 shot: 5 points\nNumber of asteroids: 40\nAsteroids visible: < 11",
                        "Number of shots: 400\nCost of 1 shot: 10 points\nNumber of asteroids: 40\nAsteroids visible: < 8",
                        "Number of shots: 300\nCost of 1 shot: 15 points\nNumber of asteroids: 40\nAsteroids visible: < 5"
                        ]
                }); 

                        
            
            MyGame.hud = new HUD({
                        restart: function(){ 
                            //Remove any lingering asteroids and reset counter
                            MyGame.asteroids.destroyAllAsteroids();
                            MyGame.asteroidCount = 0;
                            //MyGame.pauseGame(false);
                            MyGame.game.pause(false, MyGame.pauseGame)
                            MyGame.score = 2500;
                            MyGame.hud.scoreSpan.text(MyGame.score);
                            numOfShotsFired = 0;
                            numOfAsteroidsMade = 0;  
                            numberOfHits = 0;
                            $(window).trigger("gameStart");                      
                        },
                        levelChanged: function(){
                            //Remove any lingering asteroids and reset counter
                            MyGame.asteroids.destroyAllAsteroids();
                            MyGame.asteroidCount = 0;
                            MyGame.game.pause(true, MyGame.pauseGame)
                            MyGame.score = 2500;
                            MyGame.hud.scoreSpan.text(MyGame.score);
                            numOfShotsFired = 0;
                            numOfAsteroidsMade = 0;
                            numberOfHits = 0;                            
                            MyGame.startup.show();                           
                        },
                        pause: MyGame.pause
                    }); 

            MyGame.hud.scoreSpan.text(0);
        
            MyGame.pauseGame(true);
            
            
            function gameScoreCb(){
                
                return MyGame.score;
            }

                       
            game.initLeader(gameScoreCb);
            
            MyGame.score = 2500
            MyGame.hud.scoreSpan.text(MyGame.score);

            if(game.smallScreen){//Desktop                
                cannon.enableKeyboardControl(false);
                $("#arrowsDiv").css("top", -60)
                $("#fireButtonDiv").css("top", -40);
                $("*").addClass("nocursor"); 
            }
                        
        }

    }
    return MyGame;
})