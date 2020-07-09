/*
sprites:          An array of paths to images. If sprites is undefined, use the 
                  default images. 
                  This module has its own built-in image pre-loader.
contactCallback:  This is called whenever an asteroid is hit by another body.
details:          A map that provides additional specialization values. 
                  e.g
                  {maxSpeed: myPreferedMaximumAsteroidSpeed, 
                  minSpeed: myPreferedMinimumAsteroidSpeed,
                  maxRadius: myPreferedMaximumAsteroidRadius, 
                  minRadius: myPreferedMinimumAsteroidRadius,
                  //determines the maximum and minimum radius of fragments 
                  //resulting from asteroid break-up
                  fragmentMaxFactor: myPreferedMaximumFragmentFactor,
                  fragmentMinFactor: myPreferedMinimumFragmentFactor,
                  //Number of fragments resulting from asteroid break-up.
                  numberOfFragments: myPreferedNumberOfFragments
                  }
*/
define(['underscore', 'box2dCore'], function(_, Box2d){
var Asteroids = function(physics, details){
  var self = this; 
  this.ready = true;//asteroids could be made.
  this.details = details = details || {};
  var sprites = details.sprites;
	var contactCallback = details.contactCallback = details.contactCallback || null;
  this.physics = physics;	
	this.MAX_SPEED = this.details.maxSpeed || 6;
	this.MIN_SPEED = this.details.minSpeed || 2;
  this.minRadius = this.details.minRadius || 0.5;
  this.maxRadius = this.details.maxRadius || 1.0;
  this.fragmentMaxFactor = this.details.fragmentMaxFactor || 0.3;
  this.fragmentMinFactor = this.details.fragmentMinFactor || 0.1;
  this.numberOfFragments = this.details.numberOfFragments || 20;
	
	var HTMLimageElements = [];
	var bodiesToExplode = [];
  var asteroidsCreated = [];
  //Use to ensure that asteroids are created fully within screen boundaries
  var clearance = 1.25*(this.maxRadius+ physics.screenboundaryThickness/physics.scale);    

	
  if(_.isUndefined(sprites)) //use default sprites
  sprites = ["imgs/asteroid_1.png",
                "imgs/asteroid_2.png",
                "imgs/asteroid_3.png",
                "imgs/asteroid_4.png"];
      

  function makeAndStoreHTMLimageElement(imgeSrc){
      var img = new Image();
      img.src = imgeSrc;            
      HTMLimageElements.push(img);
  }
  _.each(sprites, makeAndStoreHTMLimageElement); //preload images

	var Asteroid = function( position, velocity )
	{
		if ( !HTMLimageElements || HTMLimageElements.length === 0 )
		{
			console.log("Asteroid constructor: No asteroid sprites available")
			return;
		}				
		var i = _.random(HTMLimageElements.length-1);
        var radius = Math.random()*self.maxRadius;
        if(radius < self.minRadius)
			 radius = self.minRadius;
		this.body = new Body(physics, {id: "asteroid", shape: "circle", 
                                        x: position.x, y: position.y, 
					                image: HTMLimageElements[ i ], radius: radius, 
                                    width: 2*radius, height: 2*radius});
		this.body.body.ApplyImpulse({ x: velocity.x, y: velocity.y }, this.body.body.GetWorldCenter());
		if(!_.isUndefined(contactCallback))
	        this.body.contact = contactCallback;

	}

	this.doCcreateAsteroid = function (position, velocity){
    var obj = new Asteroid(position, velocity);
    asteroidsCreated.push(obj);
		return obj;
	}  

  this.destroyAllAsteroids = function(){
      _.each(asteroidsCreated, function(obj){physics.destroyBody(obj.body);});         
      asteroidsCreated = [];
  }	

  this.doMakeAsteroid = function(){ 
      $(window).trigger("asteroidAboutToBeMade");   
      if(self.ready){   
          self.createAsteroid(self.getRandomPosition(clearance), 
              self.generateRandomVelocity());                 
          $(window).trigger("asteroidMade");
      }     
  }

  this.explodeBody = function(bdy){
    	if(!_.contains(bodiesToExplode, bdy))//ensure a body is stored only once.
    	    bodiesToExplode.push(bdy);      	
  }

  var Fragments = function(bdy){
    var fragmentMaxRadius = bdy.details.radius*self.fragmentMaxFactor;
    var fragmentMinRadius = bdy.details.radius*self.fragmentMinFactor;
    var numberOfFragments = self.numberOfFragments;
    var bigFragments = [];
    var mediumFragments = [];
    var smallFragments = [];

    for(var i=0; i<numberOfFragments; ++i){
        var radius = Math.random()*fragmentMaxRadius;
        if(radius < fragmentMinRadius) radius = fragmentMinRadius;
        var pos = bdy.body.GetPosition(); 

        var offset = (fragmentMaxRadius - fragmentMinRadius)/3;   

        if(radius > (fragmentMinRadius + 2*offset)) 
            bigFragments.push(new Body(physics, 
                    {id: "asteroidFragment", 
                  shape: "circle", 
                      x: pos.x, 
                      y: pos.y, 
	          image: bdy.details.image, 
	         radius: radius, 
                  width: 2*radius, 
                 height: 2*radius}));
        else if(radius > (fragmentMinRadius + offset))
            mediumFragments.push(new Body(physics, 
                    {id: "asteroidFragment", 
                  shape: "circle", 
                      x: pos.x, 
                      y: pos.y, 
	          image: bdy.details.image, 
	         radius: radius, 
                  width: 2*radius, 
                 height: 2*radius}));
        else 
            smallFragments.push(new Body(physics, 
                    {id: "asteroidFragment", 
                  shape: "circle", 
                      x: pos.x, 
                      y: pos.y, 
	          image: bdy.details.image, 
	         radius: radius, 
                  width: 2*radius, 
                 height: 2*radius}));
        
     }

     setTimeout(function(){
         _.each(bigFragments, function(obj){
            physics.destroyBody(obj);
         });             
     }, 3000)

     setTimeout(function(){
         _.each(mediumFragments, function(obj){
            physics.destroyBody(obj);
         });             
     }, 2000)

     setTimeout(function(){
         _.each(smallFragments, function(obj){
            physics.destroyBody(obj);
         });             
     }, 1000)
  }  

  this.doExplodeBody = function(bdy){         
     new Fragments(bdy);
     physics.destroyBody(bdy);
     $(window).trigger("asteroidExploded");
  }     

  $(window).on("step", function(){ 
      _.each(bodiesToExplode, self.doExplodeBody);
      bodiesToExplode = [];                
  })	
	
}

Asteroids.prototype.makeAsteroids = function(interval){
    setInterval(this.doMakeAsteroid, interval || 3000);
}

Asteroids.prototype.getRandomPosition = function(boundaryClearance){
  var x = Math.random()*this.physics.element.width/this.physics.scale;
                 if(x<boundaryClearance) 
                   x=boundaryClearance;
                 if(x>(this.physics.element.width/this.physics.scale-boundaryClearance)) 
                     x=this.physics.element.width/this.physics.scale-boundaryClearance;  
  return {x: x, y: boundaryClearance};
}

Asteroids.prototype.generateRandomVelocity = function(){
	var direction = Math.random() * Math.PI * 2;
	var speed = Math.random() * ( this.MAX_SPEED - this.MIN_SPEED ) + this.MIN_SPEED;
	return new Box2d.b2Vec2(Math.cos( direction ) * speed, Math.abs(Math.sin( direction ) * speed ));
}

Asteroids.prototype.createAsteroid = function(position, velocity){
    this.doCcreateAsteroid(position, velocity);
}

return Asteroids;
})

