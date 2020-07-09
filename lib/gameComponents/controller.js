/*
Example usage:
This is the default
details = {keys: {
        leftKey: [37, 65], //left arrow or "a"
        upKey: [38, 87], //up arrow or "w"
        rightKey: [39, 68], //right arrow or "d"
        downKey: [40, 83] //down arrow or "s"
    }}

To use the arrows only
details = {keys: {
        leftKey: 37, //left arrow 
        upKey: 38, //up arrow
        rightKey: 39, //right arrow 
        downKey: 40 //down arrow
    }}
To redefine the control keys, pass in the info as a details property
details = {
            ...
            keys: {                    
                    leftKey: user_leftKey, 
                    upKey: user_upKey, 
                    rightKey: user_rightKey, 
                    downKey: user_downKey
                   }
            }
or
details = {
            ...
            keys: {
                    leftKey:[user_leftKey_1, user_leftKey_2], 
                    upKey: [user_upKey, user_upKey_2],
                    rightKey: [user_rightKey, user_rightKey_2],
                    downKey: [user_downKey,user_downKey_2]
                  }
          }
*/

define(function(){
var Controller = function(details){
    var details = details || {};        
    var self = this;    
    var downKey = false; 
    var upKey = false;  
    var leftKey = false;  
    var rightKey = false;
    var key_down = undefined;
    var key_up = undefined;

    var keys_1 = [37, 38, 39, 40]; //[left, up, right, bottom]
    var keys_2 = [65, 87, 68, 83]; //[left, up, right, bottom]

    var keys = {
        leftKey: [37, 65], //left arrow or "a"
        upKey: [38, 87], //up arrow or "w"
        rightKey: [39, 68], //right arrow or "d"
        downKey: [40, 83] //down arrow or "s"
    };

    //Client redefining control keys
    if(!_.isUndefined(details.keys)){
        keys = details.keys;
        if(keys.leftKey !== undefined){
            if(_.isArray(keys.leftKey)){
                keys_1[0] = keys.leftKey[0];
                keys_2[0] = keys.leftKey[1];
            }
            else{
                keys_1[0] = keys.leftKey;
                keys_2[0] = 1000; //used as invalid
            }
        }
        if(keys.upKey !== undefined){
            if(_.isArray(keys.upKey)){
                keys_1[1] = keys.upKey[0];
                keys_2[1] = keys.upKey[1];
            }
            else{
                keys_1[1] = keys.upKey
                keys_2[1] = 1000; //used as invalid
            }
        }
        if(keys.rightKey !== undefined){
            if(_.isArray(keys.rightKey)){
                keys_1[2] = keys.rightKey[0];
                keys_2[2] = keys.rightKey[1];
            }
            else{
                keys_1[2] = keys.rightKey;
                keys_2[2] = 1000; //used as invalid
            }
        }
        if(keys.downKey !== undefined){
            if(_.isArray(keys.downKey)){
                keys_1[3] = keys.downKey[0];
                keys_2[3] = keys.downKey[1];
            }
            else{
                keys_1[3] = keys.downKey;
                keys_2[3] = 1000; //used as invalid
            }
        }
    }
    
    
    var keydownCallback = function(e){
        e.preventDefault();
        key_down = e.keyCode;
        if(e.keyCode === 1000)
            return;
        switch(e.keyCode)
        {
            case keys_1[0]: 
            case keys_2[0]:
                leftKey = true;
                break;
            case keys_1[1]: 
            case keys_2[1]:
                upKey = true;
                break;
            case keys_1[2]: 
            case keys_2[2]:
                rightKey = true;
                break;
            case keys_1[3]: 
            case keys_2[3]:
                downKey = true;
                break;
        }
    }

    var keyupCallback = function(e){
        e.preventDefault();
        key_up = e.keyCode;
        switch(e.keyCode)
        {            
            case keys_1[0]: 
            case keys_2[0]:
                leftKey = false;
                break;
            case keys_1[1]: 
            case keys_2[1]:
                upKey = false;
                break;
            case keys_1[2]: 
            case keys_2[2]:
                rightKey = false;
                break;
            case keys_1[3]: 
            case keys_2[3]:       
                downKey = false;
                break;                  
        }
    }
    
    var enableKeyboardControl  = function(set){
        if(set === undefined || set === true){
            window.addEventListener("keydown", keydownCallback, false);
            window.addEventListener("keyup", keyupCallback, false); 
        }
        else {
            window.removeEventListener("keydown", keydownCallback, false);
            window.removeEventListener("keyup", keyupCallback, false); 
        }
    }      

    function isDownKey(){return downKey;}
    function isUpKey(){return upKey;}
    function isLeftKey(){return leftKey;}
    function isRightKey(){return rightKey;}
    function keyDown(){return key_down;}
    function keyUp(){return key_up;}

    return {
        isDownKey: isDownKey,
        isUpKey: isUpKey,
        isLeftKey: isLeftKey,
        isRightKey: isRightKey,
        keyDown: keyDown,
        keyUp: keyUp,
        enableKeyboardControl: enableKeyboardControl
    }

}
return Controller;
})