/*///////////////////////////////////////////////////////
Example usage:
var animSprite = new AnimateSprite(physics, 
            {
                id: "dude", 
                run: true,
                //angle: 90, 
                //scale: 1.5,
                ticksPerFrame: 6,
                imageSrc: "imgs/dude.png",
                x: 600, 
                y:350,
                numberOfFrames: 8,
                numberOfRows: 2,
                rowNumber: 0,
                width: 395,
                height: 128});

        var myBdy2 = new Body(physics, {type: "kinematic", x: 21, y: 12.7, 
            animation: animSprite,
            restitution: 0, 
            density: 1,
            width: 44/physics.scale, height: 54/physics.scale});        
        
        var cntrl = new RunNjumpController(myBdy2, {
            speed: 2,
            actionCallback: function(info){
                if(info == "left"){
                    animSprite.run = true;
                    animSprite.rowNumber = 1;
                }
                else if(info == "right"){
                    animSprite.run = true;
                    animSprite.rowNumber = 0;
                }
                else if(info == "jumping"){
                    animSprite.run = true;
                } 
                else
                    ;//animSprite.run = false;

            },
            jumpCallback: function(state){
                if(state === "end"){
                    ...                    
                    return true;//jump ended
                    or
                    return false;//jump not ended
                }
            },
            runCallback: function(direction){
                if(direction === "left"){
                    ...                    
                    return true;//run left
                    or
                    return false;//do not run left
                }
                if(direction === "right"){
                    ...                    
                    return true;//run right
                    or
                    return false;//do not run right
                }
            }            
        });
        cntrl.controller.enableKeyboardControl();
/////////////////////////////////////////////////////*/

define(['controller', 'box2dCore'], function(Controller, Box2d){
var RunNjumpController = function(obj, details){
    var physics = obj.physics;
    var details = details || {};

    var _speed = details.speed || 4;
    var jumpSpeed = details.jumpSpeed || 4;
    var jumpHeight = details.jumpSpeed || 1.5;

    var jumpStart = 0; //y-position jump commence at

    //only one jump permited with each press of the jump key
    var jumpKeyPressed = false; //true when jump key pressed and false when release
    
    var self = this;

    //We control kinematic bodies only.
    if(obj.details.type !== "kinematic")
        throw new Error("RunNjumpController: The body type must be kinematic.");
    
    var jumping = false;
    var jumpDrop = false;

    var exite = 0.01;
    var vx = exite;
    var vy = exite;
    
    //Exite the body. Kinematic bodies require this    
    obj.body.SetLinearVelocity(new Box2d.b2Vec2(vx, vy));        

    this.controller = new Controller(details);
    
    var speed = function(value){
        if(value !== undefined)
            _speed = value;
        else
            return _speed;
    }

    var runLeft = function(){
        vx = -_speed; 
        if(!_.isUndefined(details.actionCallback))
            details.actionCallback("left");
    }

    var runRight = function(){
        vx = _speed;
        if(!_.isUndefined(details.actionCallback))
            details.actionCallback("right");                            
    }

    var isJumpHeightReached = function(){
        if(obj.body.GetPosition().y <= (jumpStart - jumpHeight))
            return true;
        return false;
    } 


    var jump = function(){      
        if(!jumping){
            jumpStart = obj.body.GetPosition().y;   
            vy = -jumpSpeed;
            jumping = true;
        }             
    }

    var defaultJumpCallback = function(state){
        if(state === "end"){      
            if(obj.body.GetPosition().y >= jumpStart)
                return true;
            else
                return false;
        }
        if(state === "start")  
            return true;           
    }

    var doEndJump = function(){
        vy = exite;
        jumpDrop = false;
        jumping = false;
        var pos = obj.body.GetPosition();
        obj.body.SetPosition(new Box2d.b2Vec2(pos.x, jumpStart));        
    }

    var newPos = function(){
        if(self.controller.isLeftKey()){
            if(!_.isUndefined(details.runCallback)){
                if(details.runCallback("left"))
                    runLeft(); 
            }
            else    
                runLeft(); 
        }        
        if(self.controller.isRightKey()){
            if(!_.isUndefined(details.runCallback)){
                if(details.runCallback("right"))
                    runRight(); 
            }
            else    
                runRight(); 
        }
        if(!self.controller.isLeftKey() && !self.controller.isRightKey()){
            vx = exite;
            if(!jumping && !jumpDrop)            
                details.actionCallback("idle");
            else
                details.actionCallback("jumping");
        }
        if(self.controller.isUpKey()){            
            if(!jumpKeyPressed && !jumping){
                if(!_.isUndefined(details.jumpCallback) && details.jumpCallback("start"))
                    jump(); 
                else if(defaultJumpCallback("start"))
                    jump(); 
            }               
            jumpKeyPressed = true;
        }
        else{
            jumpKeyPressed = false;
        }                   
    }

    $(window).on("step", function(){
        if(!jumpDrop && jumping && isJumpHeightReached()){
            vy *= -1;
            jumpDrop = true; //body falling           
        }
        if(jumpDrop){
            if(!_.isUndefined(details.jumpCallback)){
                if(details.jumpCallback("end")){
                    doEndJump();
                }
            }
            else {
                if(defaultJumpCallback("end")){
                    doEndJump();
                }
            }
        }
        newPos();  
        obj.body.SetLinearVelocity(new Box2d.b2Vec2(vx, vy));            
    });
}
return RunNjumpController;
})