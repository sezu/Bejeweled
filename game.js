(function(root) {
  
  var Bejeweled = root.Bejeweled = ( root.Bejeweled || {} );
  
  var Game = Bejeweled.Game = function(ctx) {
    this.ctx = ctx;
    this.board = new Bejeweled.Board();
    this.playable = true;
    this.dropping = false;
  }
  
  Game.prototype.start = function() {
    var that = this;
    
    this.intervalID = setInterval(function() {that.step() }, Game.FPS);
  }
  
  Game.prototype.stop = function() {
    clearInterval(this.intervalID);
  }
  
  Game.prototype.step = function() {
    this.draw();
    
    if(this.playable) {
      //get input
      this.board.checkMatches();
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
    
    //draw board
    //get input and switch jewels
    
    //check for valid move/matches
    //remove jewels, update score
    //create new jewels for top row
    //drop jewels/redraw until all jewels done dropping
  }
  
  Game.prototype.draw = function() {
    this.ctx.clearRect(0, 0, 600, 600);
    this.board.draw(this.ctx);
  }
  
})(this);