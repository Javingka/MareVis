/* O projeto utiliza duas bibliotecas
  Moebio - para trabalho com dados no código, todos os objetos Moebio começam com mo
  P5js - para desenho
*/
var vLog = 'MV';
var moBotao;

function setup() {
  createCanvas(windowWidth, windowHeight);

  var table = mo.TableEncodings.CSVtoTable(data_como_string, true);
  console.log(vLog, 'table loaded', table);
  //mo.Loader.loadData('data/TabelaMare.csv', loaded, this); //'loaded' é chamado quando os dados estão prontos
  moBotao = new mo.Rectangle(10,10,  textWidth('fullscreen'),10); //Rectângulo para botão full-screen
  moBotao.name = 'fullscreen';
}

function draw() {
  background(255, 200, 255);
  drawFullSizeButon();

  noFill();
  stroke('red');
  ellipse( width/2, height/2, 40);
}

/*Desenha o botão para mudar a fullscreen e muda o desenho do cursor*/
function drawFullSizeButon(){
  //Se o cursor estiver em cima do botão coloca a mão de icone.
  if (isMouseOver(moBotao)) {
    cursor(HAND);
  } else {
    cursor(ARROW);

  }
  //rect(moBotao.x, moBotao.y, moBotao.width, moBotao.height);
  fill('black');
  textAlign(CENTER,CENTER);
  noStroke();
  textSize(12);
  text(moBotao.name, moBotao.x + moBotao.width/2, moBotao.y + moBotao.height/2); //Nome do botão, no centro do botão
}

function mousePressed() {
  if (isMouseOver(moBotao)) {
    var fs = fullscreen();
    fullscreen(!fs);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
