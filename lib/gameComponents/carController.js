/*
Example usuage:
var myBdy2 = new Body(physics, {type: "kinematic", x: 12, y: 10, 
            image: "imgs/Car.png", width: 1.5});
var carController = new CarController(myBdy2, {});
carController.controller.enableKeyboardControl();
*/
define(['controller', 'box2dCore'], function(Controller, Box2d){
var CarController = function(obj, details){
	var physics = obj.physics;
    var details = details || {};

    var _speed = details.speed || 4;
    var _turnSpeedFactor = details.turnSpeedFactor || 0.4;
    var standingTurn = details.standingTurn || false;
    
    var self = this;
    var angleRad = 0;
    var exite = 0.008;
    var vx = exite;
    var vy = exite;    

    this.controller = new Controller(details);

    obj.body.SetLinearVelocity(new Box2d.b2Vec2(vx, vy));

    var speed = function(value){
        if(value !== undefined)
            _speed = value;
        else
            return _speed;
    }

    var turnSpeedFactor = function(value){
        if(value !== undefined)
            _turnSpeedFactor = value;
        else
            return _turnSpeedFactor;
    }

    var turnLeft = function(){  
        if(!standingTurn && (!self.controller.isDownKey() && 
        	      !self.controller.isUpKey()))
            return;
        if(self.controller.isDownKey())
            angleRad += _turnSpeedFactor*_speed*Math.PI/180;
        else
            angleRad -= _turnSpeedFactor*_speed*Math.PI/180;             
    }

    var turnRight = function(){
    	if(!standingTurn && (!self.controller.isDownKey() && 
        	            !self.controller.isUpKey()))
            return;
        if(self.controller.isDownKey())
            angleRad -= _turnSpeedFactor*_speed*Math.PI/180;
        else
            angleRad += _turnSpeedFactor*_speed*Math.PI/180;                      
    }

    var moveForward = function(){
        vx = _speed * Math.sin(angleRad);
        vy = -_speed * Math.cos(angleRad);        
        if(vx == 0 ) vx = exite;
        if(vy == 0) vy = exite;  

        return {x:vx, y:vy};      
    }

    var moveReverse = function(){
        vx = _speed * Math.sin(-1*angleRad);
        vy = _speed * Math.cos(angleRad);        
        if(vx == 0) vx = exite;
        if(vy == 0) vy = exite;  

        return {x:vx, y:vy};       
    }

    var newPos = function(){
        if(self.controller.isLeftKey())
            turnLeft();
        if(self.controller.isRightKey())
            turnRight();
        if(self.controller.isUpKey())
            moveForward();
        if(self.controller.isDownKey())
            moveReverse();
        if(!self.controller.isUpKey() && !self.controller.isDownKey()){
            vx = exite;
            vy = exite;
        }
        return {x:vx, y:vy}; 
    }

    $(window).on("step", function(){
    	var v = newPos();
        obj.body.SetAngle(angleRad)
        if(!_.isUndefined(v)){
            obj.body.SetLinearVelocity(new Box2d.b2Vec2(v.x, v.y));
            $(window).trigger("newPos");
        }
    });
}

return CarController;
});
