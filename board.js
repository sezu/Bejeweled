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
      
      //add extra row at top so we get a nice drop animation from above window
      for(var j = 0; j < 9; j++) {
        jewels[i].push(this.createJewel(i, j))
      }
    }
    
    jewels[7][8] = null;
    jewels[7][7] = null;
    jewels[7][6] = null;
    
    return jewels
  }
  
  Board.prototype.createJewel = function(x, y) {
    //Add constant instead of magic number, 1/8 of canvas size
    return new Bejeweled.Jewel(1, [x*75, (y-1)*75] )
  }
  
  Board.prototype.dropJewels = function() {
    var dropping = false;
    
    for(var i = 0; i < this.board.length; i++) {
      for(var j = 0; j < this.board[i].length; j++) {
        
        if(this.board[i][j] && this.board[i][j].drop()) 
            dropping = true;
          
      }
    }
    
    return dropping;
  }
  
  Board.prototype.hasEmptyTiles = function() {
    var empty = false
    //not checking matches yet, just setting jewels to fall
    for(var i = this.board.length - 1; i >= 0; i--) {
      for(var j = this.board.length - 1; j >= 0; j--) {
        
        if(this.board[i][j+1] == null || this.board[i][j+1].falling) {
          empty = true;
          this.board[i][j+1] = this.board[i][j];
          
          if(!this.board[i][j])
            continue;
          
          this.board[i][j].falling = true;
          
          //create a new jewel once we've reached hidden row
          if(j == 0)
            this.board[i][j] = this.createJewel(i, j);
        }
      }
    }
    
    return empty;
  }
  
  Board.prototype.draw = function(ctx) {
    ctx.drawImage(this.image, 0, 0);
    
    //draw each jewel, skipping top row
    for(var i = 0; i < this.board.length; i++) {
      for(var j = 0; j < this.board[i].length; j++) {
        var jewel = this.board[i][j];
        
        if(jewel)
          jewel.draw(ctx);
      }
    }
  }
  
})(this);