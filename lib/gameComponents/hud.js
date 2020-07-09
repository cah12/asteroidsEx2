define(function(){
var HUD = function(details){
    var self = this;
    this.details = details = details || {};
    
    this.restart = this.details.restart || null;
    this.levelChanged = this.details.restart || null;
    var scoreboardDiv = $("#scoreboardDiv");
    var hudDiv = scoreboardDiv;
    hudDiv[0].style.opacity="0.5" 
    
    hudDiv.append( $('<span>Score: </span>'));
    this.scoreSpan = $('<span>')
    hudDiv.append(this.scoreSpan);    
    
    this.restartButton = $("#restartButton");
        
    this.pauseButton = $("#pauseButton");
    
    this.levelButton = $("#levelButton");
     
    this.isPaused = function(){
    	return this.pauseButton.text()=="Pause";
    }

    this.gameStarted = function(){
    	this.levelButton.show();
        this.pauseButton.show();
        this.restartButton.show();
    }

    this.restartButton.on('click', function(){
        if(details.restart){
        	details.restart();
        }
        else{
        	location.reload();
        }
        return false;   
    })

    this.pauseButton.on('click', function(){
        if(details.pause){
        	details.pause();        	
        } 
        if(self.isPaused()){
    		self.pauseButton.text("Continue ");				     
			self.restartButton.hide();
            self.levelButton.hide();

    	} 
    	else{
    		self.pauseButton.text("Pause");				     
	        self.levelButton.show();
            self.restartButton.show();
    	} 
        return false;     
    })

    this.levelButton.on('click', function(){
        //console.log("details.levelChanged")
        self.pauseButton.hide();
        self.restartButton.hide();
        self.levelButton.hide();
        if(details.levelChanged){
        	details.levelChanged();
        }
        else{
        	location.reload();
        }
        return false;   
    })    
    self.pauseButton.hide();
    self.restartButton.hide();
    self.levelButton.hide();

}
 return HUD;
})
