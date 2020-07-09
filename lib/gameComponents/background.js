define(function(){

var Background = {    
	getImage: function(src){
		var image = null;
		if(typeof(src)==="string"){
	      image = new Image();
	      image.src = src;
	    }
	    else{      
	      image = src;
	      if(image===undefined)
	        throw "Background: unable to resolve image"
	    }
        return image;
	},
	Static: function(physics, details){
            var details = details || {};
			var imageSource = details.imageSource;
            var width = physics.element.width;
			var height = physics.element.height;
			var image = null;
			if(typeof(imageSource) === 'string')
				image = Background.getImage(imageSource);
			else
				image = imageSource;
			var self = this;		    		        
		    $(window).on("step", function(){ 
                physics.context.save();
                physics.context.drawImage(image, 0, 0, width, height);
                physics.context.restore();  
			});
		},

	Moving: function(physics, details){
			var details = details || {};
			var imageSource = details.imageSource;
            this.image = Background.getImage(imageSource);

			this.x = details.x || 0;
			this.y = details.y || 0;
            this.speed = details.speed || -0.15;
			this.move = details.move || "horizontal";
			
			var self = this;!Background
			var width = physics.element.width;
			var height = physics.element.height;
            
            var opacity = 1;
            var _opacityLossPerFrame = 0;
            
            var fadeFactor = -1;
            
            this.fade = function(opacityLossPerFrame){
                _opacityLossPerFrame = opacityLossPerFrame;
                if(!_.isUndefined(_opacityLossPerFrame))
                    _opacityLossPerFrame = 0.005;
                fadeFactor = opacity == 1 ? -1 : 1;                
            }
            
            this.show = function(set){
                if(_.isUndefined(set))
                    set = true;
                if(set){
                    this.fade(0);
                    opacity = 1;
                }
                else{
                    this.fade(1);
                    opacity = 0;
                }
            }
        
					        
		    $(window).on("step", function(){
			    if(self.move === "horizontal"){
			        if(Math.abs(self.x) >= width)
						self.x = 0; 
					self.x += self.speed;
                    physics.context.save();
                    physics.context.globalAlpha = opacity;
					physics.context.drawImage(self.image, self.x, self.y, width, height);
					var newX = self.speed < 0 ? width+self.x : self.x-width;
					physics.context.drawImage(self.image, newX, self.y, width, height);
                    physics.context.restore();                    
                    opacity += _opacityLossPerFrame*fadeFactor;
                    if(opacity < 0)
                        opacity = 0;                    
                    else if(opacity > 1)
                        opacity = 1;   
                    
				}
				else if(self.move === "vertical"){
			        if(Math.abs(self.y) >= height)
						self.y = 0; 
					self.y += self.speed;                    
                    physics.context.save();
                    physics.context.globalAlpha = opacity;
                    physics.context.drawImage(self.image, self.x, self.y, width, height);
					var newY = self.speed < 0 ? height+self.y : self.y-height;
					physics.context.drawImage(self.image, self.x, newY, width, height);
                    physics.context.restore();
                    opacity += _opacityLossPerFrame*fadeFactor;
                    if(opacity < 0)
                        opacity = 0;
                    else if(opacity > 1)
                        opacity = 1;                
                   
				}	
			});           
            
		}
        
}
return Background;
})

