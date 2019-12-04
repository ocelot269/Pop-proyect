let correlacion = require("./proyecto");

function crearTablaCorrelaciones() {
  //div tabla reference
  if (document.getElementById("tabla")) {
  let tabla = document.getElementById("tabla");

  // create elements <table> and a <ttabla>
  let tbl = document.createElement("table");
  let tblBody = document.createElement("tbody");

  // cells creation
  for (let tr = 0; tr < correlacion.listadoEventosCorrelacion.length; tr++) {
    // table row creation
    let row = document.createElement("tr");
    //accion posicion
    const eventoPulpo = correlacion.listadoEventosCorrelacion[tr];
    //listado de las propiedades
    const eventoPulpoValues = Object.values(eventoPulpo);

    for (const key in eventoPulpoValues) {
      if (correlacion.listadoEventosCorrelacion.hasOwnProperty(key)) {
        /* console.log(eventoPulpoValues[key]); */
        // create element <td> and text node
        //Make text node the contents of <td> element
        // put <td> at end of the table row
        let cell = document.createElement("td");
        let cellText = document.createTextNode(eventoPulpoValues[key]);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
    }
    //row added to end of table body
    tblBody.appendChild(row);
  }

  // append the <tbody> inside the <table>
  tbl.appendChild(tblBody);
  // put <table> in the <div>
  tabla.appendChild(tbl);
  // tbl border attribute to
  tbl.setAttribute("border", "2");
}
}

function crearValoresGraficaPorLista(lista) {
  let listado = lista;
  let grafica = document.getElementsByClassName("grafica");
  if (grafica[0]) {
    let index = 0;
    for (const elemento of grafica[0].children) {
      console.log(elemento);
      // añades el nombre
      elemento.innerText = listado[index].nombre;
      numero = listado[index].phi;
      // conversion a string y extraemos parte decimal
      numero = String(numero).substring(2, 4);
      // estilo modificado
      elemento.style.width = numero + "%";
      index++;
    }
  }
}
function prueba() {
  console.log("mariano");
}

module.exports = {
  prueba: prueba,
  crearTablaCorrelaciones: crearTablaCorrelaciones,
  crearValoresGraficaPorLista: crearValoresGraficaPorLista
};
