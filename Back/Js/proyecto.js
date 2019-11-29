let phi = Object.create(Object);
phi.prototype.phi = function phi(n00,n01,n10,n11) {
  let numero_raiz = (n10 + n11) * (n01 + n00) * (n01 + n11) * (n10 + n00);
  return (n11 * n00 - n10 * n01) / Math.sqrt(numero_raiz);
};

let listadoEventosCorrelacion = new Array();
// listado de todos los diferentes eventos que hay en el diario
var obtenerSetEventosDiario = (DIARIO) => {
  let acciones = new Set([]);
  DIARIO.forEach(evento => {
    evento.eventos.forEach(accion => {
      acciones.add(accion);
    });
  });
  return acciones;
};

function crearTablaCorrelaciones() {
  //body reference
  let body = document.getElementsByTagName("body")[0];

  // create elements <table> and a <tbody>
  let tbl = document.createElement("table");
  let tblBody = document.createElement("tbody");

  // cells creation
  for (let tr = 0; tr < listadoEventosCorrelacion.length; tr++) {
    
    // table row creation
    let row = document.createElement("tr");
    //accion posicion
    const eventoPulpo = listadoEventosCorrelacion[tr];
    //listado de las propiedades
    const eventoPulpoValues = Object.values(eventoPulpo);

      for (const key in eventoPulpoValues) {

        if (listadoEventosCorrelacion.hasOwnProperty(key)) {         
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

function obtenerListadoEventosCorrelacion(DIARIO) {
  obtenerSetEventosDiario(DIARIO).forEach(registro => {
    listadoEventosCorrelacion.push(calcularCorrelacion(registro,DIARIO));
  });
  console.log(listadoEventosCorrelacion);
  return listadoEventosCorrelacion;
}

function calcularCorrelacion(registro, listaEventos) {
  let n01 = 0, n11 = 0, n10 = 0, n00 = 0;
  listaEventos.forEach(evento => {
    if (evento.eventos.includes(registro)) {
      evento.pulpo ? n11++ : n01++;
    } else if (!evento.eventos.includes(registro)) {
      evento.pulpo ? n10++ : n00++;
    }
  });

  eventos = Object.create(phi);
  return { nombre: registro,
          n00: n00,
          n01: n01,
          n10: n10,
          n11: n11,
          phi: eventos.prototype.phi(n00,n01,n10,n11) }
}

function mostrarCorrelacion() {
  listadoEventosCorrelacion.forEach(elemento => {
    console.log(elemento);
  });
}

module.exports = {
  phi: phi,
  obtenerSetEventosDiario: obtenerSetEventosDiario,
  crearTablaCorrelaciones: crearTablaCorrelaciones,
  obtenerListadoEventosCorrelacion: obtenerListadoEventosCorrelacion,
  calcularCorrelacion: calcularCorrelacion,
  mostrarCorrelacion: mostrarCorrelacion,
  listadoEventosCorrelacion: listadoEventosCorrelacion,
}