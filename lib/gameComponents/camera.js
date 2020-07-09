/*
Usage:
var myBdy2 = new Body(physics, {type: "kinematic", x: 21, y: 12.7, 
            color: "blue",
            restitution: 0, 
            density: 1,
            width: 44/physics.scale, height: 54/physics.scale});
var c = new Camera(physics, {background: "imgs/road.png"});
c.controller.enableKeyboardControl()
*/
define(['controller'], function(Controller){
	var Camera = function(physics, details){
		var details = details || {};
	    var _background = details.background;
	    var _speed = details.speed || 2;

		var width = physics.element.width;
		var height = physics.element.height;

	    var self = this;
		var left = 0;
	    var top = 0;

	    var move_left = false;
		var move_up = false;
		var move_right = false;
		var move_down = false;

		var controller = new Controller(details);

		var img;

	    if(_background){
	         	var img = new Image();
			img.src = _background;
		}
		else
			throw "Camera: invalid background"	

		var speed = function(value){
	        if(value !== undefined)
	            _speed = value;
	        else
	            return _speed;
	    }
	 
		var newPos = function(){
	        if(controller.isLeftKey())
				left -= _speed;
	        if(controller.isRightKey())
				left += _speed;
			if(controller.isUpKey())
				top -= _speed;
			if(controller.isDownKey())
				top += _speed;
		}		

		var draw = function(top, left){
	            newPos();
	            physics.context.save()
	   	        physics.context.drawImage(img, left, top, width, height, 0, 0, width, height);
	            physics.context.restore()         
	        }

	 
		$(window).on("step", function(){
		    draw(top, left);
		});

		return {
			controller: controller,
			speed: speed
		}
	}
	return Camera;
});