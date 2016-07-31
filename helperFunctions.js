
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
    return true;
  } else {
    return false
  }
}


/* Essa função é chamada quando o arquivo de dados é carregado */
function loaded(data) {
  // Understanding Data

  /* You pass a String to 'CSVtoTable' and you get a Table
  The second parameter indicates that the first row should be considered the names of the columns */
  var table = mo.TableEncodings.CSVtoTable(data.result, true);

  //Tables are a List of Lists that represents each column.
  console.log("======================================== \n Report of TableOperators ");
  console.log(mo.TableOperators.getReport(table));

  console.log("======================================== \n Types of each list inside the Table");
  console.log(table.getTypes());

  /* Create a List of dummies. One for each user name in the table */
  mo.TableConversions.TableToDummyList(table);

  console.log(graphics.container);
}
