(function(root) {
  
  var Bejeweled = root.Bejeweled = ( root.Bejeweled || {} );
  
  var Board = Bejeweled.Board = function() {
    this.board = this.createBoard();
    this.image = imagesArray[0];
    
    //stretch goal
    this.exploding = [];
    this.hyperJewel = [];
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
    
    return jewels;
  }
  
  Board.prototype.createJewel = function(x, y) {
    //Add constant instead of magic number, 1/8 of canvas size
    var jewelType = Math.floor(Math.random() * 7) + 1
    
    return new Bejeweled.Jewel(jewelType, [x*75, (y-1)*75] )
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
  
  Board.prototype.setFallingJewels = function() {
    var empty = false
    //not checking matches yet, just setting jewels to fall
    for(var i = this.board.length - 1; i >= 0; i--) {
      for(var j = this.board.length - 1; j >= 0; j--) {
        
        if(this.board[i][j+1] == null || this.board[i][j+1].falling) {
          empty = true;
          this.board[i][j+1] = this.board[i][j];
        
          if(this.board[i][j])
            this.board[i][j].falling = true;
          //create a new jewel once we've dropped hidden row
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
        jewel && jewel.draw(ctx);
      }
    }
  }
  
  Board.prototype.checkMatches = function() {
    //only check subsection of board
    this.checkHorizontal();
    this.checkVertical();
    
    for(var i = 0; i < this.board.length; i++) {
      for(var j = 1; j < this.board[i].length; j++) {
        if(this.board[i][j].destroyable)
          this.board[i][j] = null;
      }
    }
  }
  
  //Check vertical or horizontal matches
  Board.prototype.checkHorizontal = function() {
    for(var y = 1; y < this.board[0].length; y++) {
      for(var x = 0; x < this.board.length - 2; x++) {

        if(this.board[x][y].id === this.board[x + 1][y].id &&
           this.board[x][y].id === this.board[x + 2][y].id) {
             this.board[x][y].destroyable = true;
             this.board[x + 1][y].destroyable = true;
             this.board[x + 2][y].destroyable = true;
        }
      }
    }
  }
  
  Board.prototype.checkVertical = function() {
    for(var x = 0; x < this.board.length; x++) {
      for(var y = 1; y < this.board[0].length - 2; y++) {
    
        if(this.board[x][y].id === this.board[x][y + 1].id &&
           this.board[x][y].id === this.board[x][y + 2].id) {
             this.board[x][y].destroyable = true;
             this.board[x][y + 1].destroyable = true;
             this.board[x][y + 2].destroyable = true;
           }    
      }
    }   
  }
})(this);