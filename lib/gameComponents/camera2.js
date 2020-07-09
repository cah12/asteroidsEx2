/*
Example usage:
var myBdy2 = new Body(physics, {type: "kinematic", x: 21, y: 12.7, 
            color: "blue",
            restitution: 0, 
            density: 1,
            width: 44/physics.scale, height: 54/physics.scale});
            var c = new Camera2(physics, {background: "imgs/road.png",
                                            body: myBdy2                                            
                                        });
            c.controller.enableKeyboardControl()
 */
define(['controller'], function(Controller){
var Camera2 = function(physics, details){
	var details = details || {};
    this.background = details.background || "";
    this.speed = details.speed || 3;
    this.turnSpeed = details.turnSpeed || 1.5;
    this.body = details.body || 0;

	var width = physics.element.width;
	var height = physics.element.height;   

    var self = this;
	var left = 0;
    var top = 0;
    var angle = 0;
    var xOffset = width/2;
	var yOffset = height/2;

 	var controller = this.controller = new Controller(details);

	var img;
        if(this.background){
         	var img = new Image();
		img.src = this.background;
	}	

 	this.newPos = function(){
    	if(controller.isLeftKey())
		angle += this.turnSpeed;
            if(controller.isRightKey())
		angle -= this.turnSpeed;
		if(controller.isUpKey()){
            var dy = this.speed*Math.cos(angle*Math.PI/180);
            var dx = this.speed*Math.sin(angle*Math.PI/180);
			top += dy;
	        left += dx;
		}
		if(controller.isDownKey()){
            var dy = this.speed*Math.cos(angle*Math.PI/180);
            var dx = this.speed*Math.sin(-angle*Math.PI/180);
			top -= dy;
	        left += dx;
		}
			
	}

	this.newOffsets = function(){
	    if(!this.body)
			return;
        xOffset = this.body.x * physics.scale;
        yOffset = this.body.y * physics.scale;	
			
	}	

	this.draw = function(top, left){
            this.newPos();
            this.newOffsets();
            physics.context.save();
	    physics.context.translate(xOffset, yOffset);
            physics.context.rotate(angle*Math.PI/180)
            physics.context.translate(-xOffset, -yOffset);
   	    physics.context.drawImage(img, left, top)//, width, height, 0, 0, width, height);
            
            physics.context.restore()         
    }	

	$(window).on("step", function(){
	    	self.draw(top, left);
	});
}
return Camera2;
});