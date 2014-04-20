(function(root) {
  
  var Bejeweled = root.Bejeweled = ( root.Bejeweled || {} );
  
  var Jewel = Bejeweled.Jewel = function(id, pos) {
    this.id = id;
    this.image = imagesArray[this.id];
    this.pos = pos;
  }
  
  Jewel.prototype.draw = function(ctx) {
    ctx.drawImage(this.image, this.pos[0], this.pos[1])
  }
  
})(this);