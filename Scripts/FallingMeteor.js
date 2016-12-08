4// define a user behaviour
var FallingMeteor = qc.defineBehaviour('qc.meteor.FallingMeteor', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
    this.showingDamage = false;
}, {
    // fields need to be serialized
});

// Called when the script instance is being loaded.
FallingMeteor.prototype.awake = function() {
    var self = this;
	self.body = self.getScript('qc.arcade.RigidBody');
    self.rocketShip = self.game.world.children[0].find('/rocketship');
    self.body.addOverlap( self.rocketShip );
    // create body if it does not exist TODO
};

// Called every frame, if the behaviour is enabled.
FallingMeteor.prototype.update = function() {
	var self = this;
    var parentObj = self.gameObject.parent;
    
    if (self.gameObject.y > parentObj.height || self.gameObject.y < -500) {
		self.restartPos();
    }
};

FallingMeteor.prototype.restartPos = function() {
	var self = this;
    var rnd = self.game.phaser.rnd;
    var parentObj = self.gameObject.parent;
	self.gameObject.y = -rnd.integerInRange(100, 500);
    self.gameObject.x = rnd.integerInRange(0, parentObj.width);
    self.body.velocity.x = rnd.integerInRange(-450,450);
 };

FallingMeteor.prototype.onCollide = function(o1, o2) {
    console.log('Collide', o1, o2);
};

FallingMeteor.prototype.onOverlap = function(o1, o2) {
    // console.log('onOverlap', o1, o2);
    var self = this;
    var explode = self.game.world.find('/UIRoot/explode');
    explode = self.game.add.clone(explode);

    

    var shieldHits = self.game.storage.get('shieldHits');
    if (!shieldHits) {
        shieldHits = 1;
    } else {
        shieldHits += 1;
    }
    self.game.storage.set('shieldHits', shieldHits);
    self.game.storage.save();
    var shieldHitsText = self.game.world.children[0].find('/ui/shield-hits');
    shieldHitsText.text = 'Shield Hits:' + shieldHits;

    explode.x = o1.x;
    explode.y = o1.y;
    explode.onFinished = function() {
        this.destroy();
    };
    explode.playAnimation('explode', 1, false);
    explode.visible = true;
    
    self.restartPos();
    
    if (!self.showingDamage) {

        self.showingDamage = true;
        self.rocketShip.getScript('qc.TweenAlpha').enable=true;
        explode.visible = true;
        this.game.timer.add(1500, function() {
            self.rocketShip.getScript('qc.TweenAlpha').enable=false;
            self.rocketShip.alpha = 1;
            self.showingDamage = false;
        });
    }

};