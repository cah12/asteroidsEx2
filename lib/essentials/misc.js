define(function(){
var Misc = {
    		AudioSource: function(src, numberOfInstances){
    			this.instances = [];

    			this.numberOfAudioInstance = numberOfInstances = numberOfInstances || 1;

    			for(i=0; i<this.numberOfAudioInstance; ++i)
       				this.instances.push(new Audio(src));
    
    			this.currentIndex = 0;      
		

    			this.play = function(){
    				this.currentIndex %= this.numberOfAudioInstance;
    				this.instances[this.currentIndex].play(); 
    				this.currentIndex++;          
			}
		},

		getRandomInt: function(min, max) {
  			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
}

return Misc;
});




