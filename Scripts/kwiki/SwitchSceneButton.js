// define a user behaviour
var SwitchSceneButton = qc.defineBehaviour('qc.kwiki.SwitchSceneButton', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
    var self = this;
    self.toScene = self.toScene || 'menu'; // default scene is to switch to the menu scene
    self.addListener(self.gameObject.onClick, function() {
        self.game.scene.clearWorld();
        // http://ask.qiciengine.com/?/question/9
        var load = function(){
        	self.game.scene.load(self.toScene);
    	};
    	self.game.timer.add(1, load);
    });  
}, {
    // fields need to be serialized
    toScene: qc.Serializer.STRING
});

// Called when the script instance is being loaded.
//SwitchSceneButton.prototype.awake = function() {
//
//};

// Called every frame, if the behaviour is enabled.
//SwitchSceneButton.prototype.update = function() {
//
//};
