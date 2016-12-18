// define a user behaviour
var Rocketship = qc.defineBehaviour('qc.engine.Rocketship', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
    var self = this;
    self.velocity = 300;
    this.bulletRoot = null;
    this.bulletPrefab = null;
    this._fireTime = 0;    
    this.bulletCount = 10;
}, {
    // fields need to be serialized
    velocity: qc.Serializer.INT,
    bulletRoot: qc.Serializer.NODE,
    bulletPrefab: qc.Serializer.NODE
});

// Called when the script instance is being loaded.
//Rocketship.prototype.awake = function() {
//
//};

// Called every frame, if the behaviour is enabled.
Rocketship.prototype.update = function() {
    var self = this,
        rigidBody = self.getScript('qc.arcade.RigidBody');

    if (self.game.input.isKeyDown(qc.Keyboard.UP)) {
        rigidBody.velocity.y = -self.velocity;
    }
    else if (self.game.input.isKeyDown(qc.Keyboard.DOWN)) {
        rigidBody.velocity.y = self.velocity;
    }
    else if (self.game.input.isKeyDown(qc.Keyboard.LEFT)) {
        rigidBody.velocity.x = -self.velocity;
    }
    else if (self.game.input.isKeyDown(qc.Keyboard.RIGHT)) {
        rigidBody.velocity.x = self.velocity;
    }
    else {
        rigidBody.velocity.setTo(0, 0);
    }
    
    if (self.game.input.isKeyDown(qc.Keyboard.SPACEBAR)) {
        self.fire();
    }
};

Rocketship.prototype.fire = function() {
    var self = this,
        rigidbody = this.getScript('qc.arcade.RigidBody');
    if (self.game.time.now - self._fireTime < 200) return;
    if (this.bulletCount < 1) return;
    
    this.bulletCount = this.bulletCount - 1;
    
    var bcText = self.game.world.find('/UIRoot/ui/BulletCount');
    bcText.text = '' + this.bulletCount;
    
    self._fireTime = self.game.time.now;
    
    var bullet = self.game.add.clone(self.bulletPrefab, self.bulletRoot);
    bullet.x = self.gameObject.x;
    bullet.y = self.gameObject.y;
    bullet.rotation = self.gameObject.rotation;
    
    var bulletBody = bullet.getScript('qc.arcade.RigidBody');
    
    var asteroids = self.game.world.find('/UIRoot/asteroids');
    asteroids.children.forEach(function(node) {
        bulletBody.addOverlap(node);    
    });
    
    bulletBody.velocity = new qc.Point(0, -900);
    // Add a new time event to be called after one second(the interval will be affected by the timeScale)
    this.game.timer.add(1000, function() {
         bullet.destroy();
    });
    self.game.add.clone(self.game.world.find('/Sounds/Shoot')).play();
};

