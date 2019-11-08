
const Phi = {
  phi : function phi(){
  let numero_raiz = (this.n10 + this.n11) * (this.n01 + this.n00) * (this.n01 + this.n11) * (this.n10 + this.n00);
  return (this.n11 * this.n00 - this.n10 * this.n01) / Math.sqrt(numero_raiz);
}};

var dataFromlocalStorage = JSON.parse(localStorage.getItem("diario"));
// listado de todos los diferentes eventos que hay en el diario
var eventosDiario = () => {
  let acciones = new Set([]);
  DIARIO.forEach(evento => {
    evento.eventos.forEach(accion => {
      acciones.add(accion);
    });
  });
  return acciones;
};

function tableCreate(data) {
  //body reference
  let body = document.getElementsByTagName("body")[0];

  // create elements <table> and a <tbody>
  let tbl = document.createElement("table");
  let tblBody = document.createElement("tbody");

  // cells creation
  for (let tr = 0; tr < data.length; tr++) {
    
    // table row creation
    let row = document.createElement("tr");
    //accion posicion
    const eventoPulpo = data[tr];
    //listado de las propiedades
    const eventoPulpoValues = Object.values(eventoPulpo);

      for (const key in eventoPulpoValues) {

        if (data.hasOwnProperty(key)) {         
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

function listado_matriz() {
  let listadoEventos = new Array();
  eventosDiario().forEach(registro => {
    listadoEventos.push(matriz_eventos(registro));
  });
  return listadoEventos;
}

/**
 * n00 == no sucede el evento y no se convierte en pulpo
 * n01 == sucede el evento y pero no se convierte en pulpo
 * n10 == no sucede el evento y pero si se convierte en pulpo
 * n11 == sucede el evento y se convierte en pulpo
 */

function matriz_eventos(registro) {
  let n01 = 0, n11 = 0, n10 = 0, n00 = 0;
  
  DIARIO.forEach(evento => {
    if (evento.eventos.includes(registro)) {
      evento.pulpo ? n11++ : n01++;
    } else if (!evento.eventos.includes(registro)) {
      evento.pulpo ? n10++ : n00++;
    }
  });

 let eventosMariano = Object.create(Phi);
 eventosMariano = Object.assign({
  nombre: registro,
  n00: n00,
  n01: n01,
  n10: n10,
  n11: n11,
  phi: Phi.phi() })
  return eventosMariano;
}

function calcular_correlacion() {
  listado_matriz().forEach(elemento => {
    console.log(elemento);
  });
}

console.log(calcular_correlacion());
tableCreate(listado_matriz());
