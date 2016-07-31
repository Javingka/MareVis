function loadDaysOnAxis_X(days, dias_em_linha, fullRect) {

  var listaDias = days.getWithoutRepetitions();
  var y  = fullRect.y;
  var widthByDia = fullRect.width/dias_em_linha;
  var heightByDia = 30;
  //Criação dos rectângulos gráficos por cada dia
  var rectDias = new mo.List();
  var innerRect;
  var tempCount = 0;
  var tempX;// O ponto inicial é a posição x do Rectângulo contenedor
  for (var i=0; i<listaDias.length; i++ ) {
    tempX = fullRect.x + tempCount * widthByDia;
    innerRect =  new mo.Rectangle(tempX, tempX +  widthByDia, widthByDia, heightByDia );
    innerRect.name = listaDias[i];
    tempCount++;

    rectDias.push(innerRect);
    if (i == dias_em_linha+1) {
      tempCount = 0;
    }
  }
  console.log(vLog, 'Rects de dias: ', rectDias);

}
