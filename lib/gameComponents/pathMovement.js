/*
Example usage:
var paths = [[{x: 5, y: 5}, {x: 5, y: -5}], [{x: -10, y: 10}, {x: 10, y: 0}]]

var myBdy2 = new Body(physics, {type: "kinematic", x: 12, y: 10, 
    image: "imgs/Car.png", width: 1.5});
    var pM = new PathMovement(myBdy2, {
    speed: 4,            
    loop: true,
    path: paths[0]
});
var flag = false;    
setInterval(function(){
    if(!flag)
        pM.setNewPath(paths[1])                
    else
        pM.setNewPath(paths[0]) 
    flag = !flag;   
}, 6000)
*/
define(['underscore', 'jquery', 'box2dCore'], function(_, $, Box2d){
var PathMovement = function(obj, details){
	var self = this;
    this.dEpsilon = details.dEpsilon = details.dEpsilon || 0.08;
    this.loop = false;
    
    if(!_.isUndefined(details.loop))
        this.loop = details.loop;
	this.speed = details.speed = details.speed || 2;
    this.path = details.path = details.path || [];
    this.newPath = null;
    var exite = 0.008;
    var velocity = {x: exite, y: exite};
    var indexInPath = 0;
    var currentPos = null;    

    var angle = getAngle(self.path[indexInPath].x, self.path[indexInPath].y);
    var legStartPt = null;
    var originalStartPt = null;
    var legEndPt = null;
    var numOfLegs = _.size(this.path);
    var stop = false;
    var run = true;
    
	
    //Build and add a closing point to the path array. 
    function closePath(path){
        var offX = 0;
        var offY = 0;
        _.each(path, function(o){
            offX += o.x;
            offY += o.y;
        })
        if(!(offX == 0 && offY == 0)){            
            path.push({x:-offX, y: -offY})
            numOfLegs += 1;
        }        
    }

    if(this.loop)
        closePath(this.path)
    
    function setLegPointsAndAngle(){
        if(indexInPath < numOfLegs){
            if(indexInPath === 0)
                originalStartPt = legStartPt = {x: obj.body.GetPosition().x, y: obj.body.GetPosition().y};            
            else
                legStartPt = legEndPt;
            if(!_.isUndefined(self.path[indexInPath])){
                legEndPt = {x: self.path[indexInPath].x+legStartPt.x, 
                    y: self.path[indexInPath].y+legStartPt.y}
                angle = getAngle(self.path[indexInPath].x, self.path[indexInPath].y);
            }           
            rotateAndMoveBody();
        }                
    }

    function rotateAndMoveBody(){
        if(stop)
            velocity = {x: exite, y: exite};         
        else      
            velocity = {x: self.speed * Math.sin(angle*Math.PI/180),
                 y: -self.speed * Math.cos(angle*Math.PI/180)};
        obj.body.SetAngle(angle*Math.PI/180);
        obj.body.SetLinearVelocity(new Box2d.b2Vec2(velocity.x, velocity.y))
    }  

    this.setNewPath = function(newPath){
        self.newPath = newPath;
        if(this.loop)
            closePath(self.newPath);
    } 

    this.setRun = function(set){
        run = set;
        if(run){            
            stop = false;                    
        }
    }   
    
    function isEqual(a, b){
        var absA = Math.abs(a);
        var absB = Math.abs(b);
        var diff = Math.abs(a - b);

        if (a == b) { // shortcut, handles infinities
            return true;
        } else if (a == 0 || b == 0 || diff < Number.MIN_VALUE) {
            // a or b is zero or both are extremely close to it
            // relative error is less meaningful here
            return diff < (self.dEpsilon * Number.MIN_VALUE);
        } else { // use relative error
            return diff / (absA + absB) < self.dEpsilon;
        }       
    }
    
    //measured clockwise from the upper y-axis
    function getAngle(dx, dy)
    {
        if(dx==0){
            if(dy > 0)
                return 180;
            else
                return 0;
        }
        if(dy==0){
            if(dx > 0)
                return 90;
            else
                return 270;
        }
        var angle = Math.atan(-dy/dx)/(Math.PI/180) 
        if(dx < 0 && dy > 0)
            return 270 - angle;
        if(dx < 0 && dy < 0)
            return 270 - angle;
        if(dx > 0 && dy < 0)
            return 90 - angle;        
        return 90-angle;           
    }       

    function isLegCompleted(){
        if(isEqual(currentPos.x, legEndPt.x) && isEqual(currentPos.y, legEndPt.y))
            return true;
        return false;
    }

    function advance(){ //go to next leg if it exist
        if(isLegCompleted()){
            if(indexInPath < numOfLegs){
                indexInPath++;
                setLegPointsAndAngle();                
            }
            else{
                if(self.loop){
                    if(self.newPath){
                        self.path = self.newPath;
                        self.newPath = null;
                    }
                    obj.body.SetPosition(new Box2d.b2Vec2(originalStartPt.x, originalStartPt.y));
                    indexInPath = 0;
                    setLegPointsAndAngle(); 
                    if(!run)
                        stop = true;
                }
                else
                    stop = true;
            }
        }        
    }
          
    
    $(window).on("step", function(){
        if(!stop){
        	currentPos = obj.body.GetPosition();
            advance();            
        }       
    })  
    obj.body.SetBullet()  
    setLegPointsAndAngle();
}

return PathMovement;
});