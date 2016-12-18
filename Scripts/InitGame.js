// define a user behaviour
var InitGame = qc.defineBehaviour('qc.engine.InitGame', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
}, {
    // fields need to be serialized
});

// Called when the script instance is being loaded.
InitGame.prototype.awake = function() {
    var self = this;
	self.game.storage.set('shieldHits', 0);
    self.game.storage.set('asteroidsDetroyed', 0);
};

// Called every frame, if the behaviour is enabled.
//InitGame.prototype.update = function() {
//
//};
