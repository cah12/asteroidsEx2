define(function(){
var Startup = function(details){
    var self = this;
    this.details = details = details || {};
    this.imageSrc = this.details.imageSrc;
    //this.imageSrc = this.details.imageSrc || WixImageMap.gameStart
    this.stageRect = this.details.stageRect || 
                   {x:0,y:0,width:$(window).width(),height:$(window).height()};
    this.levelExplaination = this.details.levelExplaination || null;
    this.levels = this.details.levels || null;


    this.currentLevelIndex = 0;
    var w = this.stageRect.width;
    var h = this.stageRect.height;
    var startupDiv = $('<div>');
    startupDiv[0].style.opacity="0.5" 
    //$(document.body).append(startupDiv);
    $("#gameDiv").append(startupDiv);

    var image = null;

    if(typeof(this.imageSrc)==="string"){
      image = new Image();
      image.src = this.imageSrc;
    }
    else{      
      image = this.imageSrc;
      if(image===undefined)
        throw "Startup: unable to resolve image"
    }
    
    // var img = null;
    // if(this.imageSrc !== ""){
    //     img = new Image();
    //     img.width = w*0.6;
    //     img.height = h*0.6;            
    // 	img.src = this.imageSrc; 
    // 	startupDiv.append($(img));
    // }

    image.width = w*0.8;
    image.height = h*0.5;            
    startupDiv.append($(image));

	startupDiv.append($('<br>'));
	var levelExplainDiv = $('<div>');
	startupDiv.append(levelExplainDiv);
	levelExplainDiv.css({fontSize: 15, fontFamily: 'Arial'});
	levelExplainDiv.css("color", "black");

	levelExplainDiv.css("backgroundColor", "yellow");
    levelExplainDiv.addClass("newline");

	levelExplainDiv.text(this.levelExplaination[0]);

	startupDiv.append($('<br>'));
	var startButton = $('<button>');
	startupDiv.append(startButton);
	startButton.css({/*fontSize: 20, */fontFamily: 'Segoe Script'});
	startButton.css("color", "yellow")
	startButton.css("backgroundColor", "blue")

	startButton.text('Start');
	startupDiv.css({top: h*0.1 + this.stageRect.y, left: w*0.14 + this.stageRect.x, 
                        position:'absolute'});

	
    var levelSelector;
    if(this.levels.length)
    	levelSelector = $('<select>');
    for(var i=0; i<this.levels.length; ++i){
    	var opt = $('<option>');                	
    	opt.css({/*fontSize: 20,*/ fontFamily: 'Segoe Script'});
    	opt.text(this.levels[i]);
    	levelSelector.append(opt);
    }
    levelSelector.css('height', startButton.height());
    levelSelector.css({bottom: 0, right: 0, position:'absolute'});
    levelSelector.css({fontSize: 20, fontFamily: 'Segoe Script'});
    startupDiv.append(levelSelector);

    levelSelector.on('change', function() {
	  var index = self.levels.indexOf(this.value);
      levelExplainDiv.text(self.levelExplaination[index]);
      self.currentLevelIndex = index;
	  $(window).trigger("gameLevelChanged", index);
	});

    startButton.on('click', function(){
        startupDiv.hide();
        //$(window).trigger("gameStartButtonClicked");
        if(details.startGame){
            details.startGame();
        }
    })

    this.show = function(){
        startupDiv.show();
    }

    this.hide = function(){
        startupDiv.hide();
    }
    
}
return Startup;
})

