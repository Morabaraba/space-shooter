// define a user behaviour
var FollowPointer = qc.defineBehaviour('qc.engine.FollowPointer', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
}, {
    // fields need to be serialized
});

FollowPointer.prototype.awake = function() {
    var input = this.game.input,
        self = this;
    
    this.addListener(input.onPointerDown, self.doOnMove, self);
    this.addListener(input.onPointerMove, self.doOnMove, self);
    this.addListener(input.onPointerUp, self.doOnUp, self);
    console.log('FollowPointer Listeners');
};

FollowPointer.prototype.doOnMove = function(id, x, y) {
    this.getScript('qc.arcade.RigidBody').moveToObject({x: x, y: y}, 800);
	//console.log('FollowPointer Moving', {x: x, y: y});
    this._onMove = true;
    this._pointerX = x;
    this._pointerY = y;
};

FollowPointer.prototype.update = function() {
    if (!this._onMove) return;
	console.log('FollowPointer Updating');
    // 判定是否已靠近
    // determined whether or not it is close
    var ob = this.gameObject;

    var rw = ob.width;
    var rh = ob.height;
/*
    if (qc.Rectangle.containsRaw(ob.x - rw / 2, ob.y - rh / 2, rw, rh, this._pointerX, this._pointerY)) {
        // 停止下来
        // stop it
        this.getScript('qc.arcade.RigidBody').velocity.setTo(0, 0);
    };
*/
    if (qc.Rectangle.containsRaw(ob.x - rw / 2 , ob.y , rw, rh, this._pointerX, this._pointerY)) {
        // 停止下来
        // stop it
        this.getScript('qc.arcade.RigidBody').velocity.setTo(0, 0);
    };
};

FollowPointer.prototype.doOnUp = function(id, x, y) {
    this._onMove = false;
    this.getScript('qc.arcade.RigidBody').velocity.setTo(0, 0);
    console.log('FollowPointer Up');
};
