let correlacion = require('./proyecto');

function crearTablaCorrelaciones() {
  //body reference
  let body = document.getElementsByTagName("body")[0];

  // create elements <table> and a <tbody>
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
          console.log(eventoPulpoValues[key]);
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
  // put <table> in the <body>
  body.appendChild(tbl);
  // tbl border attribute to
  tbl.setAttribute("border", "2");
}
module.exports = {
    crearTablaCorrelaciones: crearTablaCorrelaciones
}