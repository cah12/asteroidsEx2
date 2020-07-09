/*
Example usage:
var details = {
                layers: [
                    {id:"nightSky", speed: 0.15, imageSource: game.image("nightSky")},
                    {id:"daySky", speed: 0.15, imageSource: game.image("daySky")},
                    {id:"trees", speed: 0.60, imageSource: game.image("trees")},
                    {id:"road", speed: 2.0, imageSource: game.image("road")},
                    {id:"hurdle3", y:100, speed: 2.0, imageSource: game.image("hurdle3")}
                    ]
            }            
            var p = new Parallax(physics, details)            
            var bg = p.getBackground("daySky")
            var nbg = p.getBackground("nightSky")
            nbg.show(false)            
            var flag = false;
            setInterval(function(){
                bg.fade(0.009);
                nbg.fade(0.009);
                flag = !flag;                
            }, 8000)
*/
define(['background'], function(Background){
    var backgrounds = {};
    var Parallax = function(physics, details){
        if(_.isUndefined(details) || _.isUndefined(details.layers))
            throw "Parallax: No valid layers array provided";           
        _.each(details.layers, function(item){
            var bkgrnd = new Background.Moving(physics, item);
            if(!_.isUndefined(item.id))
                backgrounds[item.id] = bkgrnd;            
        })  
        
        this.getBackground = function(id){
            return backgrounds[id];
        }       
    }    
    return Parallax;
})