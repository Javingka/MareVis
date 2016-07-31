
// Jitter class
function Point() {
  this.x = random(width);
  this.y = random(height);

  this.diameter = 30;

  this.display = function() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
};

//Detecta se o cursor esta sobre o rectângulo
function isMouseOver(rect){
  if (mouseX > rect.x && mouseX < rect.x+rect.width && mouseY > rect.y && mouseY < rect.y+rect.height) {
    console.log(vLog, 'true');
    return true;
  } else {
    return false
  }
}
