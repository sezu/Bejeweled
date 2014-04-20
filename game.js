(function(root) {
  
  var Bejeweled = root.Bejeweled = ( root.Bejeweled || {} );
  
  var Game = Bejeweled.Game = function(ctx) {
    this.ctx = ctx;
    //this.jewel = new Bejeweled.Jewel(img, [100,100]);
    this.board = new Bejeweled.Board();
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
  }
  
  Game.prototype.draw = function() {
    this.ctx.clearRect(0, 0, 600, 600);
    //this.jewel.draw(this.ctx);
    this.board.draw(this.ctx);
  }
  
})(this);