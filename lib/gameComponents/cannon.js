
define(['jquery', 'misc', 'howler'], function($, Misc){
var Cannon = function(game, details) {
    
    var self = this;

    var physics = game.gamePhysics();
        
    this.cannon_baseWidth = details.width = details.width || 4.3;
    this.cannon_baseHeight = details.height = details.height || 2.2;    
    
    this.x = details.x || 150/physics.scale;
    this.y = details.y || 240/physics.scale;
    this.direction = details.direction || "right";
    this.enableKeyboard = details.enableKeyboard || true;
    this.SPM = details.SPM || 300;  // 300 shots per minute 
    this.rotationSpeed = details.rotationSpeed || 1;
        
    var cannonBase = details.cannonBase;
    var cannon = details.cannon;    

    if(this.direction === "left"){
        cannonBase = details.cannonBaseLeft;
        cannon = details.cannonLeft;
    }

    var imageCannonBase = null;

    if(typeof(cannonBase)==="string"){
      imageCannonBase = new Image();
      imageCannonBase.src = cannonBase;
    }
    else{      
      imageCannonBase = cannonBase;
      if(imageCannonBase===undefined)
        throw "Cannon: unable to resolve image"
    }

    var imageCannon = null;

    if(typeof(cannon)==="string"){
      imageCannon = new Image();
      imageCannon.src = cannon;
    }
    else{      
      imageCannon = cannon;
      if(imageCannon===undefined)
        throw "Cannon: unable to resolve image"
    }
        
    this.body_cannon_base = new Body(physics, {type: "static", x: this.x, 
        y: this.y, image: imageCannonBase, width: this.cannon_baseWidth, 
        height: this.cannon_baseHeight, draggable: false});
    
    //this.cannonSound = new Misc.AudioSource("../sounds/cannon.wav", 25);

    var cannonSound = new Howl({
      urls: ['./sounds/cannon.wav']
    });

        
    var gearSound = new Howl({
      urls: ['./sounds/gear.wav'],
      volume: 0.5,
      loop: true,      
      onplay: function(){        
                this.isPlaying = true;                
            },
            
     onpause: function(){
                this.isPlaying = false;                
            } 

    });

    gearSound.isPlaying = false;
    
    
    var power = 35;
    
    var shootingEnable = true;
    var shoot = false;
    var raise_cannon = false;
    var lower_cannon = false;

    
    var jointX = this.x+0.1*this.cannon_baseWidth;
    if(this.direction === "left"){
        jointX = this.x-0.1*this.cannon_baseWidth;
    }
    var jointY = this.y-0.3*this.cannon_baseHeight

    
    this.body_cannon = new Body(physics, {x: jointX, 
        y: jointY, image: imageCannon, 
        width: 0.754*this.cannon_baseWidth, 
           height: 0.55*this.cannon_baseHeight/*, draggable: false*/}); 

    var lower_angle = 0; 
    var upper_angle = 130; 
    if(this.direction === "left"){
        lower_angle = -130; 
        upper_angle = 0; 
    }  

    this.joint = physics.revoluteJoint(this.body_cannon, this.body_cannon_base, 
        {x: jointX, 
        y: jointY}, {enableLimit: true, 
            lowerAngle: lower_angle, 
            upperAngle: upper_angle, 
            motorSpeed: 0,
        enableMotor: false,
        maxMotorTorque: 100  })
    this.joint.EnableMotor( true);



    this.raiseCannon = function(){        
        if(this.direction === "left")
            this.joint.SetMotorSpeed(-this.rotationSpeed);
        else
            this.joint.SetMotorSpeed(this.rotationSpeed);
        if(!gearSound.isPlaying && game.soundEnabled)
            gearSound.play();
    }

    this.dropCannon = function(){
        if(this.direction === "left")
            this.joint.SetMotorSpeed(this.rotationSpeed);
        else
            this.joint.SetMotorSpeed(-this.rotationSpeed);
        if(!gearSound.isPlaying && game.soundEnabled)
            gearSound.play();

    }

    this.stopCannon = function(){        
        this.joint.SetMotorSpeed(0);
        gearSound.pause();  
        //gearSound.isRotating = false;      
    }

    function enableTouch(){
        $("#upArrowButton")[0].addEventListener("touchstart",function(evt){
            //console.log(evt)
            evt.preventDefault();
            raise_cannon = true;            
        }, false);

        $("#upArrowButton")[0].addEventListener("touchend",function(evt){
            evt.preventDefault();
            raise_cannon = false; 
        }, false);

        $("#downArrowButton")[0].addEventListener("touchstart",function(evt){
            evt.preventDefault();
            //console.log("downArrowButton touchstart")
            lower_cannon = true;
            
        }, false);

        $("#downArrowButton")[0].addEventListener("touchend",function(evt){
            evt.preventDefault();
            lower_cannon = false;            
        }, false);

        $("#fireButton")[0].addEventListener("touchstart",function(evt){
            evt.preventDefault();
            //console.log("fireButton touchstart")
            shoot = true; 
            self.shoot();
            //return false;
        }, false);

        $("#fireButton")[0].addEventListener("touchend",function(evt){
            evt.preventDefault();
            //console.log("fireButton touchend")
            shoot = false;
            //return false; 
        }, false);
    }

    enableTouch();

    var doKeyDown = function(e) {
            e.preventDefault();
            if( e.keyCode == 38 || e.keyCode == 119){
              raise_cannon = true;              
            }
            else if( e.keyCode == 40 || e.keyCode == 115)
              lower_cannon = true;
            else if(e.keyCode == 17){//ctrl
                if(power > 5)
             power -= 2;
                
            }
            else if( e.keyCode == 16){//shift
                if(power < 60)
             power += 2;
            }
            else if( e.keyCode == 32){//space
                shoot = true;                
            }
        }  
    var doKeyPress = function(e) {
            e.preventDefault();

        if(/* e.keyCode == 38 || */e.keyCode == 119)
                raise_cannon = true;
            else if(/* e.keyCode == 40 || */e.keyCode == 115)
                lower_cannon = true;
            else if(e.keyCode == 17){//ctrl
                if(power > 5)
             power -= 2;
            }
            else if( e.keyCode == 16){//shift
                if(power < 60)
             power += 2;                  
            }
            
        }      
        var doKeyUp = function(e) {
             e.preventDefault();             
            if( e.keyCode == 32){//space
                shoot = false;                
            } 
            if( e.keyCode == 38 || e.keyCode == 119)
        raise_cannon = false;
            else if( e.keyCode == 40 || e.keyCode == 115)
        lower_cannon = false;               
        }
    

    this.enableKeyboardControl = function(set){
        if(set){
            window.addEventListener( "keypress", doKeyPress, false);
            window.addEventListener( "keydown", doKeyDown, false);
            window.addEventListener( "keyup", doKeyUp, false);
        }
        else{
            window.removeEventListener( "keypress", doKeyPress, false);
            window.removeEventListener( "keydown", doKeyDown, false);
            window.removeEventListener( "keyup", doKeyUp, false);
        }           
    }

    this.isShoot = function(){
        return shoot;
    }
   
    
   this.shoot = function(){
        if(!shootingEnable || !physics.running)
            return;
        shootingEnable = false;
        var angle = Math.abs(this.joint.GetJointAngle());

        var ballRadius = 0.55*this.cannon_baseHeight*0.18;
        var cannonWidth = 0.754*this.cannon_baseWidth;
        var offsetX = (2*ballRadius + cannonWidth*0.5) * Math.cos(angle);
        if(this.direction === "left")
            offsetX *= -1;
        var offsetY = (2*ballRadius + cannonWidth*0.5) * Math.sin(angle);

        var newBall = new Body(physics, {shape: "circle", 
            radius: ballRadius, x: jointX + offsetX, 
            y: jointY - offsetY, color: "white", id: "ball"});      
        
        
        newBall.contact = function (contact, impulse, otherBody){
            if(otherBody.id == "boundary")
                physics.destroyBody(this);                              
            }
        var impulse = power;
        var impulseX = impulse * Math.cos(angle);
        var impulseY = impulse * Math.sin(angle );
        if(this.direction === "left")
            newBall.body.ApplyImpulse({ x: -impulseX, y: -impulseY }, 
                newBall.body.GetWorldCenter());
        else
            newBall.body.ApplyImpulse({ x: impulseX, y: -impulseY }, 
                newBall.body.GetWorldCenter());

        if(game.soundEnabled)
            cannonSound.play();
        //playshootSound();
        
        setTimeout(function(){
                shootingEnable = true;            
            }, (60/this.SPM)*1000);
            
        $(window).trigger("shotFired");
        
   }  

   this.destroyCannon = function(){
       self.enableKeyboardControl(false);  
       physics.destroyBody(this.body_cannon);
       physics.destroyBody(this.body_cannon_base);      
   }
   
   
   $(window).on("step", function(){
      if(shoot)
         self.shoot();
      if(raise_cannon){        
         self.raiseCannon();
      }    
      else if(lower_cannon)
         self.dropCannon();
      else {
        self.joint.SetMotorSpeed(0);
        self.stopCannon();
     }
   }); 

   $(window).on("gameEnd", function(){
        gearSound.pause();
   })

   if(this.enableKeyboard)
        this.enableKeyboardControl(true);     

};
return Cannon;
})