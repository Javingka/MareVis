/* O projeto utiliza duas bibliotecas
  Moebio - para trabalho com dados no código, todos os objetos Moebio começam com mo
  P5js - para desenho
*/
var vLog = 'MV';
var margem = 10;
var moBotaoFullscreen; //
var moFundoDesenho;


function setup() {
  createCanvas(windowWidth, windowHeight);

  var table = mo.TableEncodings.CSVtoTable(data_como_string, true);
  console.log(vLog, 'table loaded', table);
  //mo.Loader.loadData('data/TabelaMare.csv', loaded, this); //'loaded' é chamado quando os dados estão prontos
  moBotaoFullscreen = new mo.Rectangle(10,10,  textWidth('fullscreen'),10); //Rectângulo para botão full-screen
  moBotaoFullscreen.name = 'fullscreen';

  moFundoDesenho = new mo.Rectangle(margem,margem, width-margem*2, height-margem*2); //Rectangulo de fundo do grafico
  moFundoDesenho.color = 'white';


}

function draw() {
  drawBackgrounds();
  drawFullSizeButon();

  noFill();
  stroke('red');
  ellipse( width/2, height/2, 40);
}

/*Pinta os fundos sobre os quais vão se desenhar*/
function drawBackgrounds(){
  background(255, 200, 255);
  fill(moFundoDesenho.color);
  rect(moFundoDesenho.x, moFundoDesenho.y, moFundoDesenho.width, moFundoDesenho.height);

}

/*Desenha o botão para mudar a fullscreen e muda o desenho do cursor*/
function drawFullSizeButon(){
  //Se o cursor estiver em cima do botão coloca a mão de icone.
  if (isMouseOver(moBotaoFullscreen)) {
    cursor(HAND);
  } else {
    cursor(ARROW);

  }
  //rect(moBotaoFullscreen.x, moBotaoFullscreen.y, moBotaoFullscreen.width, moBotaoFullscreen.height);
  fill('black');
  textAlign(CENTER,CENTER);
  noStroke();
  textSize(12);
  text(moBotaoFullscreen.name, moBotaoFullscreen.x + moBotaoFullscreen.width/2, moBotaoFullscreen.y + moBotaoFullscreen.height/2); //Nome do botão, no centro do botão
}

function mousePressed() {
  if (isMouseOver(moBotaoFullscreen)) {
    var fs = fullscreen();
    fullscreen(!fs);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
