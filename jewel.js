(function(root) {
  
  var Bejeweled = root.Bejeweled = ( root.Bejeweled || {} );
  
  var Jewel = Bejeweled.Jewel = function(id, pos) {
    this.id = id;
    this.pos = pos;
    this.image = imagesArray[this.id];
    this.falling = false;
    this.destroyed = false;
  }
  
  Jewel.prototype.draw = function(ctx) {
    ctx.drawImage(this.image, this.pos[0], this.pos[1])
  }
  
  Jewel.prototype.drop = function() {
    if(this.falling) {
      this.pos[1] += 1;
      
      //if we've reached the next grid spot(1/8th of canvas size), stop falling
      if(this.pos[1] % 75 == 0)
        this.falling = false;
        
      return true;
    }
    
    return false;
  }
  
})(this);