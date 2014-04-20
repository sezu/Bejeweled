(function(root) {
  
  var Bejeweled = root.Bejeweled = ( root.Bejeweled || {} );
  
  var Board = Bejeweled.Board = function() {
    this.board = this.createBoard();
    this.image = imagesArray[0];
  }
  
  Board.prototype.createBoard = function() {
    var jewels = [];
    
    for(var i = 0; i < 8; i++) {
      jewels.push([])
      
      for(var j = 0; j < 8; j++) {
        jewels[i].push(this.createJewel(i, j))
      }
    }
    
    return jewels
  }
  
  Board.prototype.createJewel = function(x, y) {
    //Add constant instead of magic number, 1/8 of canvas size
    return new Bejeweled.Jewel(1, [x*75, y*75] )
  }
  
  Board.prototype.draw = function(ctx) {
    ctx.drawImage(this.image, 0, 0);
    
    //draw each jewel
    for(var i = 0; i < this.board.length; i++) {
      for(var j = 0; j < this.board.length; j++) {
        this.board[i][j].draw(ctx);
      }
    }
  }
  
})(this);