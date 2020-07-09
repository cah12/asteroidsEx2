/*Usage:
var BaseClass = function(v1, v2){                
    this.basevar1 = v1;
    this.basevar2 = v2;
                    
}
BaseClass.prototype.basefunc = function(){
        return "base"
    }

var DeriveClass = function(v1, v2){
    BaseClass.call(this, v1, v2)
    this.derivevar1 = 1;
     
}
DeriveClass.inheritsFrom(BaseClass)
DeriveClass.prototype.basefunc = function(){
    this.parent.basefunc(); //call BaseClass method
    return "derivebase"
}

var derived = new DeriveClass(10, 20)
derived.basefunc(); //call Derived class method*/
            
Function.prototype.inheritsFrom = function( ParentClassOrObject ){
    if ( ParentClassOrObject.constructor === Function )   {       //Normal Inheritance
        this.prototype = new ParentClassOrObject;
        this.prototype.constructor = this;
        this.prototype.parent = ParentClassOrObject.prototype;
    }   else   {       //Pure Virtual Inheritance
        this.prototype = ParentClassOrObject;
        this.prototype.constructor = this;
        this.prototype.parent = ParentClassOrObject;
    }
    return this;
}