function DiasRectAxis () {
  this.rectDias = new mo.List();
}

DiasRectAxis.prototype.drawColorLeyend = function () {

  var x = width*0.4;
  var y = 15
  for (var i=0; i<this.color_by_mare.length; i++) {
    fill(this.color_by_mare[i]);
    noStroke()
    ellipse(x ,y, 10,10);
    text('Maré '+(i+1), x+6, y);
    x += 80;

  }
}

DiasRectAxis.prototype.DrawMetrosAxis = function () {
  var fullRect = this.fullRect;
  var range = this.maxMetros - this.mimMetros;
  var cantLineas = 30
  var separacao = 1/cantLineas;
  for (var i=0; i<cantLineas; i++){
    stroke('gray');
    line(fullRect.x, fullRect.y+(fullRect.height*separacao*i),
        fullRect.x+fullRect.width, fullRect.y+(fullRect.height*separacao*i));
    fill('black');
    text( (this.mimMetros + range*separacao*i).toFixed(2),
      fullRect.x-30, fullRect.y+fullRect.height-(fullRect.height*separacao* (i+1) ) );
  }
};
/* Recebe um alista de dias, e cria uma serie de rectángulos, um por cada dia
  essses rectángulos vão ficar dentro da área especificada pelo 'fullRect' */
DiasRectAxis.prototype.createGraphicalObjects = function(
  days, dInfo, hours, hInfo,
  metros, meInfo, mares, mInfo,
  luas, lInfo, dias_em_linha, fullRect) {

  this.rectDias = new mo.List();
  this.fullRect = fullRect;

  dInfo.frequenciesTable = dInfo.frequenciesTable.getListsSortedByList( dInfo.frequenciesTable[0]);

  var listaDias = dInfo.frequenciesTable[0];//days.getWithoutRepetitions();
  var horasXDias = dInfo.frequenciesTable[1]; //números de vezes que o dia aparece na tabela, ouseja a quantidade de horas distintas
  var color_by_mare = this.color_by_mare = mInfo.frequenciesTable[3]; //tabela de cores

  this.maxMetros = metros.getMax();
  this.mimMetros = metros.getMin();

  var y  = fullRect.y;
  var widthByDia = fullRect.width/dias_em_linha;
  var heightByDia = fullRect.height;
  //Criação dos rectângulos gráficos por cada dia
  var rectDias = new mo.List();
  var innerRect;
  var tempCount = 0;
  var tempX;// O ponto inicial é a posição x do Rectângulo contenedor

  var dia, inicioDia, fimDia;
  var dadoHora, horasDesdeInicio;
  var metroHora;
  var indiceParaHoras = 0;
  var posicaoHoraNoDia;

  var arrayDeHoras; // Posições de 0 a 1 para marcar as horas das marés dentro do dia
  var arrayDeCorMares; // Cores para cada ponto de maré
  var arrayDeMetros; // Posições de 0 a 1 para marcar a altura em metros da maré

  var loops = 0;
  //Vai por cada dia, criando um rectángulo.
  for (var i=0; i<listaDias.length; i++ ) {
    tempX = fullRect.x + tempCount * widthByDia;
    innerRect =  new mo.Rectangle(tempX,y, widthByDia, heightByDia );
    innerRect.name = listaDias[i];
    innerRect.color = 'rgba(255,0,0,0.1)'
    tempCount++;
    arrayDeHoras = new mo.NumberList();
    arrayDeCorMares = new mo.StringList();
    arrayDeMetros = new mo.NumberList();

    //loop por cada hora do dia,
    dia = mo.DateOperators.stringToDate(listaDias[i],5, '/');
    dia = mo.DateOperators.dateToString(dia,0); //Volta para String em formato ingles MM/DD/YYYY
    inicioDia = new Date(dia);
    fimDia = new Date(dia + ' 23:59' );
    for (var j=0; j<horasXDias[i]; j++) {

      // Calculo da posição horizontal segundo hora do dia
      dadoHora = new Date( dia+" "+hours[indiceParaHoras] ); //Tomamos a hora desde a Lista dInfo, que tem os dados de hora para cada dia
      horasDesdeInicio = mo.DateOperators.hoursBetweenDates(inicioDia, dadoHora);
      posicaoHoraNoDia = horasDesdeInicio/24; // númetro entre 0 e 1. Onde 0 sería as 00:00 hrs e 1 24.00 horas
      arrayDeHoras.push( posicaoHoraNoDia);
      arrayDeCorMares.push( color_by_mare[mares[ indiceParaHoras ] - 1 ] );

      //Calcula da posição vertical segundo metros
      metroHora = metros[indiceParaHoras];
      arrayDeMetros.push( metroHora / this.maxMetros );

      indiceParaHoras++;
    }

    innerRect.onLoop = loops;
    innerRect.arrayDeHoras = arrayDeHoras;
    innerRect.arrayDeCorMares = arrayDeCorMares;
    innerRect.arrayDeMetros = arrayDeMetros;
    this.rectDias.push(innerRect);
    if ((i+1)%dias_em_linha == 0) {
      tempCount = 0;
      loops++;
    }
  }
  console.log(vLog, 'Rects de dias: ', this.rectDias, 'horasXDias ', horasXDias, 'hours',hours, 'fimDia',fimDia);

}

DiasRectAxis.prototype.drawRects = function () {

  var r;
  var posHora, corMare, metro;
  for (var i=0; i<this.rectDias.length; i++) {
    r = this.rectDias[i];
    fill(r.color);
    noFill();
    stroke('#ddd');
    strokeWeight(0.5);
    rect(r.x, r.y, r.width, r.height);

    //Desenha os Pontos da hora
    for (var j=0; j<r.arrayDeHoras.length; j++) {
      posHora = r.arrayDeHoras[j];
      corMare = r.arrayDeCorMares[j];
      metro = r.arrayDeMetros[j];
      fill(corMare);
      noStroke();
      ellipse(r.x + (r.width*posHora), r.y+(r.height*metro), 6,6);
    }

    //Draw Day Text
    push();
    translate( r.x +r.onLoop * 15 , r.y + r.height + 50);
    rotate(-Math.PI*0.25);
    text(r.name,0 ,0); // Text wraps within text box
    pop();
  }

};
