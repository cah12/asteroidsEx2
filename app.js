//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'lib',
    paths: {        
        app: 			   '../app',
        //faye:              'essentials/faye-browser',
        //jquery:            'essentials/jquery',
	    game: 			   'essentials/game',
        gameProfile:       'essentials/gameProfile',
        gameLogin:         'essentials/gameLogin',
        gameRegister:      'essentials/gameRegister',
        services:          'essentials/services',
        gameRouter:        'essentials/gameRouter',
        Box2d: 			   'essentials/Box2d.min',
        howler:            'essentials/howler',
	    wixMaps: 		   "essentials/wixMaps",
    	misc: 			   "essentials/misc",
        inherit:           "essentials/inherit",
        qtcloud:           "essentials/qtcloud",
        box2dCore: 		   "essentials/box2dCore",
        leader:            'gameComponents/leader',
    	asteroids: 		   'gameComponents/astroids',
    	cannon: 		   "gameComponents/cannon",
    	startup: 		   "gameComponents/startup",
    	runNjumpController:"gameComponents/runNjumpController",
    	controller: 	   "gameComponents/controller",
        carController:     "gameComponents/carController",
        camera:            "gameComponents/camera",
        camera2:           "gameComponents/camera2",
    	background: 	   "gameComponents/background",
        parallax:          "gameComponents/parallax",
        hud: 			   "gameComponents/hud",
        animateSprite: 	   "gameComponents/animateSprite",
        pathMovement: 	   "gameComponents/pathMovement",
        //jquery: 		   'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min',
	    jquery:            'essentials/jquery',
        //jquerymobile:      'http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min',
        //underscore: 	   'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min',
        underscore:        'essentials/underscore-1.8.3/underscore-min',
        
        //crypto:            "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/aes-min", 
        //backbone:          'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.0/backbone-min',
        faye:              'essentials/Faye 1.1.1/browser/faye-browser-min',
        //bootstrap:         "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min" 
        bootstrap:         "essentials/bootstrap-3.3.6-dist/js/bootstrap.min"   
    },
    //waitSeconds: 15,
    //Remember: only use shim config for non-AMD scripts,
    //scripts that do not already call define(). The shim
    //config will not work correctly if used on AMD scripts,
    //in particular, the exports and init config will not
    //be triggered, and the deps config will be confusing
    //for those cases.
    shim: {        
        //'Box2d': {
        	//deps :['jquery', 'underscore']
        //},
        //'underscore': {
           // exports: '_'
        //} 
         // 'socketio' : {
         //     exports: 'io'
         // },
        'bootstrap' : { 
            deps :['jquery'] 
        }/*,
        'jquerymobile' : { 
            deps :['jquery'] 
        }*/
    }
});

//Start loading the main app file. Put all of
//your application logic in there.

require(["app/main", "Box2d", "bootstrap"], function(MyGame) {
        MyGame.init(/*1200, 700*/)                     
	}
);







