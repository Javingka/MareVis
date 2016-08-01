/* O projeto utiliza duas bibliotecas
  Moebio - para trabalho com dados no código, todos os objetos Moebio começam com mo
  P5js - para desenho
*/

var vLog = 'MV';
var margem = 10;
var moBotaoFullscreen; //
var moFundoDesenho;

var TABELA;
var TABELA_INFO;
var colunaDias, colunaHoras, colunaMetros, colunaMare, colunaLua;
var TDiasInfo, THoraInfo, TMEtrosInfo, TMareInfo, TLuaInfo;
var axisX;

var botaoNumeroDias;
var numeroDias = 31;
var input;

function setup() {
  createCanvas(windowWidth, windowHeight);

  //Botão de dias_em_linha
  input = createInput();
  input.position(20, 15);
  botaoNumeroDias = createButton('submit');
  botaoNumeroDias.position(150, 15);
  botaoNumeroDias.mousePressed(novoGrafico);

  moBotaoFullscreen = createButton('fullscreen');//new mo.Rectangle(width-100,10,  textWidth('fullscreen'),10); //Rectângulo para botão full-screen
  moBotaoFullscreen.position(width-100, 15);
  moBotaoFullscreen.mouseClicked(fullScreenPressed);//name = 'fullscreen';

  moFundoDesenho = new mo.Rectangle(50,50, width-70, height-120); //Rectangulo de fundo do grafico
  moFundoDesenho.color = 'white';

  //mo.Loader.loadData('data/TabelaMare.csv', loaded, this); //'loaded' é chamado quando os dados estão prontos
  TABELA = mo.TableEncodings.CSVtoTable(data_como_string, true);
  TABELA_INFO = mo.TableOperators.buildInformationObject(TABELA);
  colunaDias = TABELA[0];
  colunaHoras = TABELA[1];
  colunaMetros = TABELA[2];
  colunaMare = TABELA[3];
  colunaLua = TABELA[4];

  TDiasInfo = TABELA_INFO.listsInfoObjects[0]; //info dos dias
  THoraInfo = TABELA_INFO.listsInfoObjects[1]; //info das horas
  TMEtrosInfo = TABELA_INFO.listsInfoObjects[2]; //info dos metros
  TMareInfo = TABELA_INFO.listsInfoObjects[3]; //info das marés
  TLuaInfo = TABELA_INFO.listsInfoObjects[4]; //info das marés

  console.log(vLog, 'table TABELA_INFO', TABELA_INFO, TABELA);
  axisX = new DiasRectAxis();

  //Cria o axis x com os tamanhos dos rectángulos segundo os parâmetros
  axisX.createGraphicalObjects(
    colunaDias,  TDiasInfo,
    colunaHoras, THoraInfo,
    colunaMetros, TMEtrosInfo,
    colunaMare,  TMareInfo,
    colunaLua, TLuaInfo,
    31, moFundoDesenho);
}

function draw() {
  drawBackgrounds();
  axisX.DrawMetrosAxis();
  axisX.drawRects();
  axisX.drawColorLeyend();
  axisX.drawMousePosition();
}

/*Pinta os fundos sobre os quais vão se desenhar*/
function drawBackgrounds(){
  background(255, 255, 255);
  fill(moFundoDesenho.color);
  rect(moFundoDesenho.x, moFundoDesenho.y, moFundoDesenho.width, moFundoDesenho.height);

}

function mousePressed() {
  if (isMouseOver(moBotaoFullscreen)) {
    var fs = fullscreen();
    fullscreen(!fs);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  moFundoDesenho = new mo.Rectangle(50,50, width-70, height-120); //Rectangulo de fundo do grafico
  moFundoDesenho.color = 'white';
  novoGrafico();
}

function novoGrafico(_num) {
  var num = Number(input.value()) == null? 31: Number(input.value());
  num = Math.min( Math.max(1, num), 31 );
  console.log(vLog, 'num', num)
  //Cria o axis x com os tamanhos dos rectángulos segundo os parâmetros
  axisX.createGraphicalObjects(
    colunaDias,  TDiasInfo,
    colunaHoras, THoraInfo,
    colunaMetros, TMEtrosInfo,
    colunaMare,  TMareInfo,
    colunaLua, TLuaInfo,
    num, moFundoDesenho);
}

function fullScreenPressed(){
  var fs = fullscreen();
  fullscreen(!fs);
}
