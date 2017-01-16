// define a user behaviour
var BulletButton = qc.defineBehaviour('qc.engine.BulletButton', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
}, {
    // fields need to be serialized
});

// Called when the script instance is being loaded.
//BulletButton.prototype.awake = function() {
//
//};

// Called every frame, if the behaviour is enabled.
//BulletButton.prototype.update = function() {
//
//};

BulletButton.prototype.onClick = function(event) {
    // double click?
    var rocketScript = this.game.world.find('/UIRoot/rocketship').getScript('qc.engine.Rocketship');
    if (event.isDoubleTap) {
        rocketScript.fire();
    }
    else if (event.isDoubleClick) {
        rocketScript.fire();
    }
};