// define a user behaviour
var SoundButton = qc.defineBehaviour('qc.meteor.SoundButton', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
	this.soundOffText = '🔈';
    this.soundOnText = '🔊'; 
    if (this.game.storage.get('playSound') === undefined) {
        this.game.storage.set('playSound', true);
     }
    this.playSound = this.game.storage.get('playSound');
    var self = this;
    this.addListener(this.gameObject.onClick, function() {
        self.playSound = !self.playSound;
        self.game.storage.set('playSound', self.playSound);
        self.setSounds();
        self.setText();
    });
}, {
    // fields need to be serialized
});

// Called when the script instance is being loaded.
SoundButton.prototype.awake = function() {
	this.setSounds();
    this.setText();
};

SoundButton.prototype.setText = function() {
    var text = this.gameObject.find('Text');
    if (this.playSound) {
        text.text = this.soundOnText;
    } else {
		text.text = this.soundOffText;
    }
};
// Called every frame, if the behaviour is enabled.
//SoundButton.prototype.update = function() {
//
//};

SoundButton.prototype.setSounds = function() {
	this.game.sound.mute = !this.playSound; 
};
