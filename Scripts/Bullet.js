// define a user behaviour
var Bullet = qc.defineBehaviour('qc.engine.Bullet', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
}, {
    // fields need to be serialized
    explosionSound : qc.Serializer.NODE,
    explosionAnimation : qc.Serializer.NODE
});

// Called when the script instance is being loaded.
//Bullet.prototype.awake = function() {
//
//};

// Called every frame, if the behaviour is enabled.
//Bullet.prototype.update = function() {
//
//};

Bullet.prototype.onOverlap = function(o1, asteroid) {
    //console.log('bullet onOverlap', o1, asteroid);
    
    var self = this;
    var explode = self.explosionAnimation; //self.game.world.find('/UIRoot/explode');
    explode = self.game.add.clone(explode);
	self.game.add.clone(self.explosionSound).play();
    
    explode.x = o1.x;
    explode.y = o1.y;
    explode.onFinished = function() {
        this.destroy();
    };
    explode.playAnimation('explode', 1, false);
    explode.visible = true;  
    
    asteroid.getScript("qc.meteor.FallingMeteor").restartPos();
    
    var asteroidsDetroyed = self.game.storage.get('asteroidsDetroyed');
    if (!asteroidsDetroyed) {
        asteroidsDetroyed = 1;
    } else {
        asteroidsDetroyed += 1;
    }
    self.game.storage.set('asteroidsDetroyed', asteroidsDetroyed);
    
    self.destroy();
    
};