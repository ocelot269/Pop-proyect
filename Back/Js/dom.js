let correlacion = require("./proyecto");

function crearTablaCorrelaciones() {
  //div tabla reference
  if (document.getElementById("tabla")) {
    let tabla = document.getElementById("tabla");

    // create elements <table> and a <ttabla>
    let tbl = document.createElement("table");

    let tblBody = document.createElement("tbody");

    // creacion de celdas
    for (let tr = 0; tr < correlacion.listadoEventosCorrelacion.length; tr++) {
      // creacion de filas
      let row = document.createElement("tr");
      //accion posicion
      const eventoPulpo = correlacion.listadoEventosCorrelacion[tr];
      //listado de las propiedades
      const eventoPulpoValues = Object.values(eventoPulpo);

      for (const key in eventoPulpoValues) {
        if (correlacion.listadoEventosCorrelacion.hasOwnProperty(key)) {
          // creado td y su contenido
          let cell = document.createElement("td");
          let cellText = document.createTextNode(eventoPulpoValues[key]);
          cell.appendChild(cellText);
          row.appendChild(cell);
        }
      }
      tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    tabla.appendChild(tbl);
    tbl.setAttribute("border", "2");
  }
}

function crearValoresGraficaPorLista(lista) {
  let grafica = document.getElementsByClassName("grafica");
  if (grafica[0]) {
    let index = 0;
    for (const elemento of grafica[0].children) {
      console.assert(lista.length > 0 , 'no contiene valor');
      numero = lista[index].phi;
      // conversion a string y extraemos parte decimal
      numero = String(numero).substring(2, 4) + "%";
      // estilo modificado
      elemento.style.width = numero ;
      // añades el nombre
      elemento.innerText = lista[index].nombre + ' ' + numero;
      console.assert(elemento.innerText , 'no contiene valor');
      index++;
    }
  }
}

module.exports = {
  crearTablaCorrelaciones: crearTablaCorrelaciones,
  crearValoresGraficaPorLista: crearValoresGraficaPorLista
};
