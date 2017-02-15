// define a user behaviour
var Rocketship = qc.defineBehaviour('qc.engine.Rocketship', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
    var self = this;
    self.velocity = 800;
    this.bulletRoot = null;
    this.bulletPrefab = null;
    this._fireTime = 0;    
}, {
    // fields need to be serialized
    velocity: qc.Serializer.INT,
    bulletRoot: qc.Serializer.NODE,
    bulletPrefab: qc.Serializer.NODE,
    explosionSound : qc.Serializer.NODE,
    explosionAnimation : qc.Serializer.NODE    
});

// Called when the script instance is being loaded.
Rocketship.prototype.awake = function() {
    this.addListener(this.game.input.onKeyUp, this.doOnKeyUp, this);
    this.addListener(this.game.input.onPointerDown, this.fire, this);
	this.setupGyro();
};

Rocketship.prototype.setupGyro = function() {
    if (navigator.accelerometer) {
        var self = this;
        var rigidBody = this.getScript('qc.arcade.RigidBody');
        var refAcc = { x: null, y: null};
        var onSuccess = function(acceleration) {
                /*console.log('Acceleration X: ' + acceleration.x + '\n' +
                      'Acceleration Y: ' + acceleration.y + '\n' +
                      'Acceleration Z: ' + acceleration.z + '\n' +
                      'Timestamp: '      + acceleration.timestamp + '\n');*/
                
            if (! refAcc.x) {
                refAcc.x = acceleration.x;
                refAcc.y = acceleration.y;
                return;
            }        
            if (! refAcc.x) {
                refAcc.x = acceleration.x;
                refAcc.y = acceleration.y;
                return;
            }        
            var triggerValue = 1;
            if (acceleration.x < (refAcc.x - triggerValue)) {
                rigidBody.velocity.y = -self.velocity;
            }
             if (acceleration.x > (refAcc.x + triggerValue )) {
                rigidBody.velocity.y = self.velocity;
            }
             if (acceleration.y > (refAcc.y + triggerValue)) {
                rigidBody.velocity.x = self.velocity;
            }
            if (acceleration.y < (refAcc.y - triggerValue)) {
                rigidBody.velocity.x = -self.velocity;
            }

            if (Math.abs(Math.abs(acceleration.x) - Math.abs(refAcc.x)) < triggerValue) {
                rigidBody.velocity.y = 0;
            }

            if (Math.abs(Math.abs(acceleration.y) - Math.abs(refAcc.y) ) < triggerValue) {
                rigidBody.velocity.x = 0;
            }
        };

        var onError = function() {
			console.log('onError!', arguments);
        };

        var options = { frequency: 50 }; 

        this.watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);        
    }
    
};

Rocketship.prototype.doOnKeyUp = function() {
    var rigidBody = this.getScript('qc.arcade.RigidBody');
    rigidBody.velocity.setTo(0, 0);
};

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
        //rigidBody.velocity.setTo(0, 0);
    }
    
    if (self.game.input.isKeyDown(qc.Keyboard.SPACEBAR)) {
        self.fire();
    }
};

Rocketship.prototype.fire = function() {
    var self = this,
        rigidbody = this.getScript('qc.arcade.RigidBody');
    if (self.game.time.now - self._fireTime < 200) return;
    
    this.bulletCount = self.game.storage.get('bulletCount');
    if (!this.bulletCount || this.bulletCount < 1) return;
    self.game.storage.set('bulletCount', this.bulletCount - 1);

    self._fireTime = self.game.time.now;
    
    var bullet = self.game.add.clone(self.bulletPrefab, self.bulletRoot);
    var bulletScript = bullet.getScript('qc.engine.Bullet');
    bulletScript.explosionSound = self.explosionSound;
    bulletScript.explosionAnimation = self.explosionAnimation;
    
    bullet.x = self.gameObject.x;
    bullet.y = self.gameObject.y;
    bullet.rotation = self.gameObject.rotation;
    
    var bulletBody = bullet.getScript('qc.arcade.RigidBody');
    
    var asteroids = self.game.world.find('/GameRoot/asteroids');
    asteroids.children.forEach(function(node) {
        bulletBody.addOverlap(node);    
    });
    
    bulletBody.velocity = new qc.Point(0, -900);
    // Add a new time event to be called after one second(the interval will be affected by the timeScale)
    this.game.timer.add(2000, function() {
         bullet.destroy();
    });
    self.game.add.clone(self.game.world.find('/Sounds/Shoot')).play();
};

Rocketship.prototype.onDestroy = function() {
    if (navigator.accelerometer) {
		navigator.accelerometer.clearWatch(this.watchID);
    }
};

/*
Rocketship.prototype.onClick = function(event) {
    // double click?
    if (event.isDoubleTap) {
        this.fire();
    }
    else if (event.isDoubleClick) {
        this.fire();
    }
};*/

