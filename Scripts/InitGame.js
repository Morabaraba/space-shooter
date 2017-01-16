// define a user behaviour
var InitGame = qc.defineBehaviour('qc.engine.InitGame', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
    this.gameOver = false;
    this.startedAt = this.game.time.now;
}, {
    // fields need to be serialized
    shieldHitText : qc.Serializer.NODE,
    asteroidsDetroyedText: qc.Serializer.NODE,
    bulletCount: qc.Serializer.NODE,
    rocketShip: qc.Serializer.NODE
});

// Called when the script instance is being loaded.
InitGame.prototype.awake = function() {
    var self = this;
	self.game.storage.set('shieldHits', 3);
    self.game.storage.set('asteroidsDetroyed', 0);
    self.game.storage.set('bulletCount', 30);
    
    self.rocketShip = self.rocketShip || self.game.world.find('/UIRoot/rocketship'); 
};

// Called every frame, if the behaviour is enabled.
InitGame.prototype.update = function() {
    var self = this;
    if (self.gameOver) return;
    var shieldHits = self.game.storage.get('shieldHits') || 0;
    
    //return;
    if (shieldHits < 1 && !self.gameOver) {
        self.gameOver = true;
        //self.rocketShip.visible = false;
        self.rocketShip.x = 0;
        self.rocketShip.y = -800;
        self.rocketShip.getScript("qc.arcade.RigidBody").moves = false;
        //self.rocketShip.getScript("qc.engine.Rocketship").destroy();
        self.game.world.find('/UIRoot/UI/Scoreboard/').getScript('qc.TweenPosition').playGroup();
        self.game.world.find('/UIRoot/UI/GameOver').getScript('qc.TweenAlpha').play();
        self.game.world.find('/UIRoot/UI/GameOver/GameOver').getScript('qc.TweenAlpha').play();
        self.game.world.find('/UIRoot/UI/GameOver/PlayAgain').getScript('qc.TweenAlpha').play();
        
        var highscore = this.game.storage.get('highscore');
        highscore.push({ name : 'Player1', 
                        kills: self.game.storage.get('asteroidsDetroyed') , 
                        time: +((this.game.time.now - this.startedAt) / 1000).toFixed(2) });
        this.game.storage.set('highscore', highscore);
        this.game.storage.save();
    }
    
    if (!self.gameOver) {
        t = this.bulletCount || self.game.world.find('/UIRoot/UI/Scoreboard/Time');
		t.text = ((this.game.time.now - this.startedAt) / 1000).toFixed(2);
    }
    
    var t = this.shieldHitText || self.game.world.find('/UIRoot/UI/ShieldHits');
    t.text = '' + shieldHits;
    
    v = self.game.storage.get('asteroidsDetroyed') || 0;
    t = this.asteroidsDetroyedText || self.game.world.find('/UIRoot/UI/Scoreboard/AsteroidsDestroyed');
    t.text = '' + v;
    
    v = self.game.storage.get('bulletCount') || 0;
    t = this.bulletCount || self.game.world.find('/UIRoot/UI/BulletCount');
    t.text = '' + v;   

     
    
};
