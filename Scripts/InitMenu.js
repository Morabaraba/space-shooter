// define a user behaviour
var InitMenu = qc.defineBehaviour('qc.engine.InitMenu', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;

}, {
    // fields need to be serialized
});

// Called when the script instance is being loaded.
InitMenu.prototype.awake = function() {
    var higscore = this.game.storage.get('highscore') || 
        [{ name :'Can\'t', kills: 70, time: 80}, 
         { name : 'Touch', kills: 200, time: 70}, 
         { name : 'This', kills: 10, time: 30}];
    //debugger;
	this.game.storage.set('highscore', higscore);    
   
    var t = this.game.world.find('/UIRoot/UI/HighscoreNames');
    text = [];
    higscore.forEach(function(score,index) {
        text.push( (index + 1) + '. ' + score.name + ' (' + score.kills + ' / ' +
                  score.time + ' = ' + 
                  (score.kills / score.time).toFixed(2) + ' kps)' );
    });
    t.text = text.join('\n');
};

// Called every frame, if the behaviour is enabled.
//InitMenu.protdddhigscoress.update = fudsdsdnction() {
//
//};
