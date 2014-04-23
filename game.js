(function(root) {
  
  var Bejeweled = root.Bejeweled = ( root.Bejeweled || {} );
  
  var Game = Bejeweled.Game = function(ctx) {
    this.ctx = ctx;
    this.board = new Bejeweled.Board();
    this.playable = true;
    this.dropping = false;
  }
  
  Game.prototype.start = function(canvas) {
    var that = this;
    canvas.addEventListener("mousedown", this.getInput.bind(this), false)
    
    this.intervalID = setInterval(function() {that.step() }, Game.FPS);
  }
  
  Game.prototype.stop = function() {
    clearInterval(this.intervalID);
  }
  
  Game.prototype.step = function() {
    this.draw();
    
    if(this.playable) {
      this.playable = this.board.checkMatches();
      this.playable = false;
    } 
    else {
      if(!this.dropping) {
        //check matches
        this.playable = !this.board.setFallingJewels();
        this.dropping = true;
      } else {
        //handle dropping animation
        this.dropping = this.board.dropJewels();
      }
    }
  }
  
  Game.prototype.draw = function() {
    this.ctx.clearRect(0, 0, 600, 600);
    this.board.draw(this.ctx);
  }
  
  Game.prototype.getInput = function(event) {
    var x = Math.floor(event.x / 75)
    var y = Math.floor(event.y / 75) + 1
    
    if(this.selectedPos) {
      this.processInput(this.selectedPos, [x, y]);
      this.selectedPos = null;
    } else {
      this.selectedPos = [x, y];
    }
  }
  
  Game.prototype.processInput = function(fromPos, toPos) {
    this.board.moveJewels(fromPos, toPos);
    this.playable = true;
  }
  
})(this);