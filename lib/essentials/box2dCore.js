

/*var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2World = Box2D.Dynamics.b2World;
var b2MassData = Box2D.Collision.Shapes.b2MassData;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;*/

define(['underscore', 'Box2d'], function(_){

var Box2d = {
b2Vec2: Box2D.Common.Math.b2Vec2,
b2BodyDef: Box2D.Dynamics.b2BodyDef,
b2Body: Box2D.Dynamics.b2Body,
b2FixtureDef: Box2D.Dynamics.b2FixtureDef,
b2Fixture: Box2D.Dynamics.b2Fixture,
b2World: Box2D.Dynamics.b2World,
b2MassData: Box2D.Collision.Shapes.b2MassData,
b2PolygonShape: Box2D.Collision.Shapes.b2PolygonShape,
b2CircleShape: Box2D.Collision.Shapes.b2CircleShape,
b2DebugDraw: Box2D.Dynamics.b2DebugDraw
}

var Physics = window.Physics = function(element,scale) {
    var self = this;
    var gravity = new Box2d.b2Vec2(0,1);
    this.world = new Box2d.b2World(gravity, true);
    this.element = element;
    this.context = element.getContext("2d");
    this.scale = scale || 30;
    this.dtRemaining = 0;
    this.stepAmount = 1/60;  
    this.dragNDropCalled = false;
    this.running = true;
    this.screenboundaryThickness = 0; //0 indicate no screen boundary exist

    var spentBodies = [];
    this.storeBodyForDestruction = function(body){
        spentBodies.push(body.body);
    }  

    this.destroyBodies = function(){
        _.each(spentBodies, function(obj){
            self.world.DestroyBody(obj);   
        })

        // for(var i=0; i<spentBodies.length; ++i){
        //     this.world.DestroyBody(spentBodies[i].body);            
        // }


        spentBodies = [];
   }
};

Physics.prototype.destroyBody = function (body){
   this.storeBodyForDestruction(body);
}



Physics.prototype.screenBoundaries = function (details){
    var details = details || {};
    var c = details.color || "transparent";
    var t = this.screenboundaryThickness = details.wallThickness || 7.5;
    var w = this.element.width;
    var h = this.element.height;
    // Create some walls
    new Body(this, { type: "static", x: (2*t/this.scale)*0.5, y: (h/this.scale)*0.5, 
        height: h/this.scale,  width: 2*t/this.scale, color: c , id: "boundary"});
    new Body(this, { type: "static", x:(w-t)/this.scale, y: (h/this.scale)*0.5, 
            height: h/this.scale,  width: 2*t/this.scale, color: c, id: "boundary"});
    new Body(this, { type: "static", x: (w/this.scale)*0.5, y: (2*t/this.scale)*0.5, 
            height: 2*t/this.scale, width: w/this.scale, color: c, id: "boundary"});
    new Body(this, { type: "static", x: (w/this.scale)*0.5, y:(h-t)/this.scale, 
            height: 2*t/this.scale, width: w/this.scale, color: c, id: "boundary"});
}

Physics.prototype.animate = function () {
    var self = this;
    var lastFrame = new Date().getTime();
    // shim layer with setTimeout fallback
    var requestAnimFrame = function(callback){
      return  window.requestAnimationFrame(callback) ||
              window.webkitRequestAnimationFrame(callback) ||
              window.mozRequestAnimationFrame(callback) ||
              function(callback){
                window.setTimeout(callback, 1000 / 60);
              };
    };
   var gameLoop = function() {        
        var tm = new Date().getTime();
        requestAnimFrame(gameLoop);
        var dt = (tm - lastFrame) / 1000;
        if(dt > 1/15) { dt = 1/15; }
        self.step(dt);
        lastFrame = tm;        
    };
   requestAnimFrame(gameLoop);
}

Physics.prototype.step = function (dt) {
    if(!this.running)
	return;
    this.dtRemaining += dt;
    while (this.dtRemaining > this.stepAmount) {
        this.dtRemaining -= this.stepAmount;
        this.world.Step(this.stepAmount,
        8, // velocity iterations
        3); // position iterations        
    }    
     
    this.context.clearRect(0, 0, this.element.width, this.element.height); 
    
    $(window).trigger("step");    

    this.destroyBodies();

    // $(window).trigger("step");    

    var obj = this.world.GetBodyList();

    this.context.save();       

    this.context.scale(this.scale, this.scale);
    while (obj) {
        var body = obj.GetUserData();        
        if (body){
            body.draw(this.context);            
        }
        obj = obj.GetNext();
    }
    this.context.restore();

    if (this.debugDraw) 
        this.world.DrawDebugData();       
    
}

Physics.prototype.debug = function() {
    this.debugCanvas = document.createElement('canvas');
    this.debugCanvas.width = this.element.width;
    this.debugCanvas.height = this.element.height;
    var parent = this.element.parentNode; 
    parent.insertBefore(this.debugCanvas, parent.childNodes[0]);
    this.debugCanvas.style.position = "absolute";   
    this.debugContext = this.debugCanvas.getContext("2d");

    this.debugDraw = new Box2d.b2DebugDraw();
    this.debugDraw.SetSprite(this.debugContext);
    this.debugDraw.SetDrawScale(this.scale);
    this.debugDraw.SetFillAlpha(0.5);
    this.debugDraw.SetLineThickness(1.0);
    this.debugDraw.SetFlags(Box2d.b2DebugDraw.e_shapeBit | Box2d.b2DebugDraw.e_jointBit);
    this.world.SetDebugDraw(this.debugDraw);

    if(this.clickCallBack !== undefined)
        this.click(this.clickCallBack)

    if(this.dragNDropCalled === true)
        this.dragNDrop();
};

Physics.prototype.click = function(callback) {

  var self = this;
  this.clickCallBack = callback;

  function handleClick(e) {
    e.preventDefault();
    var point = {
        x: (e.offsetX || e.layerX) / self.scale,
        y: (e.offsetY || e.layerY) / self.scale
      };

        self.world.QueryPoint(function(fixture) {        
    callback(fixture.GetBody(),
       fixture,
       point);
        }, point);
      }

  if(this.debugDraw){
      this.debugCanvas.addEventListener("mousedown",handleClick);
      this.debugCanvas.addEventListener("touchstart",handleClick);      
    }
    else{
      this.element.addEventListener("mousedown",handleClick);
      this.element.addEventListener("touchstart",handleClick);
    }
};

Physics.prototype.collision = function () {
    this.listener = new Box2D.Dynamics.b2ContactListener();
    //console.log(this.listener)
    this.listener.PostSolve = function (contact, impulse) {
        var bodyA = contact.GetFixtureA().GetBody().GetUserData(),
            bodyB = contact.GetFixtureB().GetBody().GetUserData();

        if (bodyA.contact) {
            bodyA.contact(contact, impulse, bodyB);//true)
        }
        if (bodyB.contact) {
            bodyB.contact(contact, impulse, bodyA);//false)
        }

    };
    /*this.listener.BeginContact = function (contact){
        var bodyA = contact.GetFixtureA().GetBody().GetUserData(),
            bodyB = contact.GetFixtureB().GetBody().GetUserData();

        if (bodyA.contact) {
            bodyA.contact(contact)            
        }
        if (bodyB.contact) {
            bodyB.contact(contact)
        }

    };*/
    /*this.listener.EndContact = function (contact){
        var bodyA = contact.GetFixtureA().GetBody().GetUserData(),
            bodyB = contact.GetFixtureB().GetBody().GetUserData();

        if (bodyA.contact) {
            bodyA.contact(contact)
        }
        if (bodyB.contact) {
            bodyB.contact(contact)
        }
    };*/
    this.world.SetContactListener(this.listener);
};

Physics.prototype.dragNDrop = function () {
    var self = this;
    var obj = null;
    var joint = null;

    this.dragNDropCalled = true;

    function calculateWorldPosition(e) {
        return point = {
            x: (e.offsetX || e.layerX) / self.scale,
            y: (e.offsetY || e.layerY) / self.scale
        };
    }

    var elem = this.element;
    if(this.debugDraw){
      elem = this.debugCanvas;      
    }    

    elem.addEventListener("mousedown", function (e) {
        e.preventDefault();
        var point = calculateWorldPosition(e);
        self.world.QueryPoint(function (fixture) {
            obj = fixture.GetBody().GetUserData();            
        }, point);
    });

    elem.addEventListener("mousemove", function (e) {
        if (!obj) {
            return;
        }
        
        if(obj.details.draggable !== undefined && !obj.details.draggable){
            return;
        }
            
        var point = calculateWorldPosition(e);

        if (!joint) {
            var jointDefinition = new Box2D.Dynamics.Joints.b2MouseJointDef();

            jointDefinition.bodyA = self.world.GetGroundBody();
            jointDefinition.bodyB = obj.body;
            jointDefinition.target.Set(point.x, point.y);
            jointDefinition.maxForce = 100000;
            jointDefinition.timeStep = self.stepAmount;
            joint = self.world.CreateJoint(jointDefinition);
        }

        joint.SetTarget(new Box2d.b2Vec2(point.x, point.y));
    });

    elem.addEventListener("mouseup", function (e) {
        obj = null;
        if (joint) {
            self.world.DestroyJoint(joint);
            joint = null;
        }
    });

};

Physics.prototype.distanceJoint = function (body1, body2) {
    var bdy1 = body1.body;
    var bdy2 = body2.body;
    var def = new Box2D.Dynamics.Joints.b2DistanceJointDef();
    def.Initialize(bdy1, bdy2, bdy1.GetWorldCenter(),
        bdy2.GetWorldCenter());
    return this.world.CreateJoint(def);
}

Physics.prototype.revoluteJoint = function (body1, body2, point, details) {
    var bdy1 = body1.body;
    var bdy2 = body2.body;
    var def = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
    var details = details || {};
    if(details !== undefined){        
        def.enableLimit = details.enableLimit;
        if(details.lowerAngle !== undefined)
            def.lowerAngle = details.lowerAngle*Math.PI/180;
        if(details.upperAngle !== undefined)
            def.upperAngle = details.upperAngle*Math.PI/180; 
    if(details.motorSpeed !== undefined)
	    def.motorSpeed = details.motorSpeed;
        if(details.enableMotor !== undefined)
	    def.enableMotor = details.enableMotor;
        if(details.maxMotorTorque !== undefined)
	    def.maxMotorTorque = details.maxMotorTorque;    
    }
    def.Initialize(bdy1, bdy2, new Box2d.b2Vec2(point.x,point.y));    

    return this.world.CreateJoint(def);
}

                                                      
Physics.prototype.prismaticJoint = function (body1, body2, point1, point2, lower, upper) {
    var bdy1 = body1.body;
    var bdy2 = body2.body;
    var def = new Box2D.Dynamics.Joints.Box2d.b2PrismaticJointDef();
    def.Initialize(bdy1, bdy2, new Box2d.b2Vec2(point1.x,point1.y), 
                                    new Box2d.b2Vec2(point1.x,point1.y));
    if(lower !== undefined && upper !== undefined){
        def.enableLimit = true;
        def.lowerTranslation = lower;
        def.upperTranslation = upper
        console.log(def)
    }
    return this.world.CreateJoint(def);
}
////////////////////////////////////////////////////////////////
var Body = window.Body = function (physics, details) {
    this.physics = physics;
    this.details = details = details || {};


    // Create the definition
    this.definition = new Box2d.b2BodyDef();

    // Set up the definition
    for (var k in this.definitionDefaults) {
        this.definition[k] = details[k] || this.definitionDefaults[k];
    }
    this.id = details.id || "";
    this.x = details.x || 0;
    this.y = details.y || 0;
    //this.animation = details.animation = details.animation || null;
    if(this.details.animation){
        if(!details.x)
            this.x = this.details.animation.x/physics.scale+details.width/2;
        if(!details.y)
            this.y = this.details.animation.y/physics.scale+details.height/2; 
        if(!details.shape)
            details.shape = "block";       
    }

    this.definition.position = new Box2d.b2Vec2(this.x, this.y);
    this.definition.linearVelocity = new Box2d.b2Vec2(details.vx || 0, details.vy || 0);
    this.definition.userData = this;
    //this.definition.type = details.type == "static" ? Box2d.b2Body.b2_staticBody : Box2d.b2Body.b2_dynamicBody;

    if(details.type == "static")
      this.definition.type = Box2d.b2Body.b2_staticBody;
    else if(details.type == "kinematic")
      this.definition.type = Box2d.b2Body.b2_kinematicBody;
    else
      this.definition.type = Box2d.b2Body.b2_dynamicBody;

    // Create the Body
    this.body = physics.world.CreateBody(this.definition);

    // Create the fixture
    this.fixtureDef = new Box2d.b2FixtureDef();
    for (var l in this.fixtureDefaults) {
        this.fixtureDef[l] = details[l] || this.fixtureDefaults[l];
    }


    details.shape = details.shape || this.defaults.shape;

    switch (details.shape) {
        case "circle":
            details.radius = details.radius || this.defaults.radius;
            this.fixtureDef.shape = new Box2d.b2CircleShape(details.radius);
            //console.log(this.fixtureDef)
            break;
        case "polygon":
            this.fixtureDef.shape = new Box2d.b2PolygonShape();
            this.fixtureDef.shape.SetAsArray(details.points, details.points.length);
            //console.log(details.points)
            break;
        case "block":
        default:
            details.width = details.width || this.defaults.width;
            details.height = details.height || this.defaults.height;            
            this.fixtureDef.shape = new Box2d.b2PolygonShape();
            this.fixtureDef.shape.SetAsBox(details.width / 2,
            details.height / 2);
            break;
    }

    this.body.CreateFixture(this.fixtureDef);
};


Body.prototype.defaults = {
    shape: "block",
    width: 2.5,
    height: 2.5,
    radius: 1.25
};

Body.prototype.fixtureDefaults = {
    density: 2,
    friction: 1,
    restitution: 0.2
};

Body.prototype.definitionDefaults = {
    active: true,
    allowSleep: true,
    angle: 0,
    angularVelocity: 0,
    awake: true,
    bullet: false,
    fixedRotation: false
};

Body.prototype.draw = function (context) {
    var pos = this.body.GetPosition(),
        angle = this.body.GetAngle();

    // Save the context
    context.save();
    

    // Translate and rotate
    context.translate(pos.x, pos.y);
    context.rotate(angle);

    
    // Draw the shape outline if the shape has a color
    if (this.details.color) {
        context.fillStyle = this.details.color;

        switch (this.details.shape) {
            case "circle":
                context.beginPath();
                context.arc(0, 0, this.details.radius, 0, Math.PI * 2);
                context.fill();
                break;
            case "polygon":
                var points = this.details.points;
                context.beginPath();
                context.moveTo(points[0].x, points[0].y);
                for (var i = 1; i < points.length; i++) {
                    context.lineTo(points[i].x, points[i].y);
                }
                context.fill();
                break;
            case "block":
                context.fillRect(-this.details.width / 2, -this.details.height / 2,
                this.details.width,
                this.details.height);
            default:
                break;
        }
    }

    
    
   
    // If an image property is set, draw the image.
    if (this.details.image) {
        if(typeof(this.details.image) === 'string'){
            var img = document.createElement('img');
            img.src = this.details.image;
            this.details.image = img;            
        }        
        context.drawImage(this.details.image, -this.details.width / 2, -this.details.height / 2
            ,this.details.width,this.details.height);
    }

    if (this.details.animation ){
        //console.log(444)
        this.details.animation.x = (pos.x-this.details.width / 2)*this.physics.scale;
        this.details.animation.y = (pos.y-this.details.height / 2)*this.physics.scale;
    }

    context.restore();
};
return Box2d;
})
