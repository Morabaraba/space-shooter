// define a user behaviour
var FallingMeteor = qc.defineBehaviour('qc.meteor.FallingMeteor', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
    this.showingDamage = false;
    this.velocity = 300;
}, {
    // fields need to be serialized
    rocketShip : qc.Serializer.NODE 
});

// Called when the script instance is being loaded.
FallingMeteor.prototype.awake = function() {
    var self = this;
	self.body = self.getScript('qc.arcade.RigidBody');
    self.rocketShip = /*self.rocketShip ||*/ self.game.world.find('/GameRoot/rocketship');
    self.body.velocity.y = this.velocity;
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
    self.gameObject.scaleX = 1.25  + ( rnd.integerInRange(0, 100) / 100);
    self.gameObject.scaleY = self.gameObject.scaleX;

    self.body.velocity.x = rnd.integerInRange(-this.velocity,this.velocity);
 };

FallingMeteor.prototype.onOverlap = function(o1, o2) {
    //console.log('onOverlap', o1, o2);
    var self = this;
    var explode = self.game.world.find('/GameRoot/explode');
    explode = self.game.add.clone(explode);

    explode.x = o1.x;
    explode.y = o1.y;
    explode.onFinished.add(function() {
        console.log('destory explode', this);
        this.destroy();
    }, explode);
    explode.playAnimation('explode', 1, false);
    explode.visible = true;
    
    self.restartPos();
    
    if (!self.showingDamage) {
        self.showingDamage = true;
        
        self.game.add.clone(self.game.world.find('/Sounds/Explosion')).play();
        this.game.timer.add(500, function() {
            self.game.add.clone(self.game.world.find('/Sounds/Restore')).play();
        });
                            
        var shieldHits = self.game.storage.get('shieldHits');
        shieldHits -= 1;
        self.game.storage.set('shieldHits', shieldHits);

        self.rocketShip.getScript('qc.TweenAlpha').enable=true;
        this.game.timer.add(1500, function() {
            var tween = self.rocketShip.getScript('qc.TweenAlpha');
            if (tween) tween.enable=false;
            self.rocketShip.alpha = 1;
            self.showingDamage = false;
        });
    }
};