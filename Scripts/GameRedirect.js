// define a user behaviour
var GameRedirect = qc.defineBehaviour('qc.engine.GameRedirect', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
}, {
    // fields need to be serialized
});

// Called every frame, if the behaviour is enabled.
GameRedirect.prototype.update = function() {
	this.game.scene.load('game', true);
};
