/*
Example usage:
game.preload("coin", "imgs/coinSprite.png")

            var animSprite = new AnimateSprite(physics, 
            {
                id: "coin", 
                run: true,
                //scale: 2,
                //angle: 90, 
                imageSrc: game.image("coin"),//use the preloaded image
                x: 600, 
                y:350,
                numberOfFrames: 10,
                width: 1000,
                height: 100});
*/

define(function(){
var AnimateSprite = function(physics, details) {				
    var self = this;
    this.loop = true;

    var imageLoaded = false;
    var renderOnce = false;

    this.details = details = details || {}
    this.run = details.run = details.run || false;
    this.scale = details.scale = details.scale || 1;
    
    this.id = details.id = details.id || "";
    this.x = details.x = details.x || 0;
    this.y = details.y = details.y || 0;
    this.rowNumber = details.rowNumber = details.rowNumber || 0;
    this.angle = details.angle = details.angle || 0;
    var width = details.width = details.width || 100;
    var height = details.height = details.height || 100;
    var imageSrc = details.imageSrc = details.imageSrc || undefined;

    var frameIndex = 0; //The current frame to be displayed
    var tickCount = 0; //The number updates since the current frame was first displayed
    var ticksPerFrame = details.ticksPerFrame = details.ticksPerFrame || 4; //The number 
    //updates until the next frame should be displayed

    var numberOfFrames = details.numberOfFrames = details.numberOfFrames || 1;
    var numberOfRows = details.numberOfRows = details.numberOfRows || 1;


    var canvas = $('<canvas>');
    canvas[0].width = physics.element.width;
    canvas[0].height = physics.element.height;
    var parent = physics.element.parentNode; 
    parent.insertBefore(canvas[0], parent.childNodes[0]);
    canvas[0].style.position = "absolute";   
    var context = canvas[0].getContext("2d");

    
    var image = null;

    if(typeof(imageSrc)==="string"){
      image = new Image();
      image.src = imageSrc;
    }
    else{      
      image = imageSrc;
      if(image===undefined)
        throw "AnimateSprite: unable to resolve image"
    }
    

    this.render = function () {
      context.save()

      // Clear the canvas
       context.clearRect(0, 0, canvas.width(), canvas.height());
      // Translate and rotate
      context.translate(self.x, self.y);
      context.rotate(self.angle*Math.PI/180);
      context.scale(self.scale, self.scale);
      
      
        // Draw the animation
        context.drawImage(
           image,
           frameIndex * width / numberOfFrames,
           height/numberOfRows*self.rowNumber,
           width / numberOfFrames,
           height/numberOfRows,
           0,
           0,
           width / numberOfFrames,
           height/numberOfRows);
        context.restore()
    };

    

    this.update =  function () {      
        tickCount += 1;      
        if (tickCount > ticksPerFrame) {        
            tickCount = 0;
        
            // If the current frame index is in range
            if (frameIndex < numberOfFrames - 1) {  
                // Go to the next frame
                frameIndex += 1;
            } else if (self.loop) {
                frameIndex = 0;
            }
        }

        //$(window).trigger("updateEnd", self.id);
    };

    $(window).on("step", function(){
      //console.log(self.running)
        if(self.run){
          self.update(); 
          self.render();  
          renderOnce = true;             
        }
        else if(!renderOnce){
          self.render();
          renderOnce = true;          
        }
    })

    this.toString = function () {
            return '[AnimateSprite]';
        }
    
 
}
return AnimateSprite;
})