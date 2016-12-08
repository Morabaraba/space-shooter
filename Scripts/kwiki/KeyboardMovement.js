// define a user behaviour
var KeyboardMovement = qc.defineBehaviour('qc.kwiki.KeyboardMovement', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
    var self = this;
    self.velocity = 300;
}, {
    // fields need to be serialized
    velocity: qc.Serializer.INT
});

// Called when the script instance is being loaded.
//KeyboardMovement.prototype.awake = function() {
//
//};

// Called every frame, if the behaviour is enabled.
//KeyboardMovement.prototype.update = function() {
//
//};

KeyboardMovement.prototype.update = function() {
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
};