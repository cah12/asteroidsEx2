define(["controller","box2dCore"],function(e,t){var n=function(n,r){var i=n.physics,r=r||{},s=r.speed||4,o=r.turnSpeedFactor||.4,u=r.standingTurn||!1,a=this,f=0,l=.008,c=l,h=l;this.controller=new e(r),n.body.SetLinearVelocity(new t.b2Vec2(c,h));var p=function(e){if(e===undefined)return s;s=e},d=function(e){if(e===undefined)return o;o=e},v=function(){if(!u&&!a.controller.isDownKey()&&!a.controller.isUpKey())return;a.controller.isDownKey()?f+=o*s*Math.PI/180:f-=o*s*Math.PI/180},m=function(){if(!u&&!a.controller.isDownKey()&&!a.controller.isUpKey())return;a.controller.isDownKey()?f-=o*s*Math.PI/180:f+=o*s*Math.PI/180},g=function(){return c=s*Math.sin(f),h=-s*Math.cos(f),c==0&&(c=l),h==0&&(h=l),{x:c,y:h}},y=function(){return c=s*Math.sin(-1*f),h=s*Math.cos(f),c==0&&(c=l),h==0&&(h=l),{x:c,y:h}},b=function(){return a.controller.isLeftKey()&&v(),a.controller.isRightKey()&&m(),a.controller.isUpKey()&&g(),a.controller.isDownKey()&&y(),!a.controller.isUpKey()&&!a.controller.isDownKey()&&(c=l,h=l),{x:c,y:h}};$(window).on("step",function(){var e=b();n.body.SetAngle(f),_.isUndefined(e)||(n.body.SetLinearVelocity(new t.b2Vec2(e.x,e.y)),$(window).trigger("newPos"))})};return n});