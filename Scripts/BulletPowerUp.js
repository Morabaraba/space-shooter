// define a user behaviour
var BulletPowerUp = qc.defineBehaviour('qc.engine.BulletPowerUp', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
}, {
    // fields need to be serialized
});

// Called when the script instance is being loaded.
BulletPowerUp.prototype.awake = function() {
    var self = this;
	self.body = self.getScript('qc.arcade.RigidBody');
    self.rocketShip = self.rocketShip || self.game.world.find('/GameRoot/rocketship');    
    self.body.addOverlap(self.rocketShip);    
};

// Called every frame, if the behaviour is enabled.
BulletPowerUp.prototype.update = function() {
	var self = this;
    var parentObj = self.gameObject.parent;
    
    if (self.gameObject.y > parentObj.height || self.gameObject.y < -500) {
		self.restartPos();
    }
    
};

BulletPowerUp.prototype.restartPos = function() {
	var self = this;
    var rnd = self.game.phaser.rnd;
    var parentObj = self.gameObject.parent;
	self.gameObject.y = -rnd.integerInRange(100, 500);
    self.gameObject.x = rnd.integerInRange(0, parentObj.width);
    self.body.velocity.x = rnd.integerInRange(-50,50);
 };

BulletPowerUp.prototype.onOverlap = function(o1, o2) {
    //console.log('onOverlap', o1, o2);
    var self = this;
    self.game.add.clone(self.game.world.find('/Sounds/Powerup')).play();
    self.restartPos();
    var bulletCount = self.game.storage.get('bulletCount') || 0;
    self.game.storage.set('bulletCount', bulletCount + 10);
};