let phi = require("./phi");
let diario =  require("../../diario");

let listadoEventosCorrelacion = new Array();
// listado de todos los diferentes eventos que hay en el diario
let obtenerSetEventosDiario = diario => {
  let acciones = new Set([]);
  console.assert(diario , 'no contiene valor');
  diario.forEach(evento => {
    evento.eventos.forEach(accion => {
      acciones.add(accion);
    });
  });
  console.assert(acciones.size > 0 , 'no contiene valor');
  return acciones;
};


function obtenerListadoEventosCorrelacion(diario) {
  obtenerSetEventosDiario(diario).forEach(elemento => {
    listadoEventosCorrelacion.push(calcularCorrelacion(elemento, diario));
  });
  console.assert(listadoEventosCorrelacion.length !== 0 , 'no contiene valor');
  return listadoEventosCorrelacion;
}

function calcularCorrelacion(elemento, listaEventos) {
  let n01 = 0,
      n11 = 0,
      n10 = 0,
      n00 = 0;

  console.assert(elemento , 'es un nulo o undefined o vacio');   
  console.assert(listaEventos.length > 0, 'es una lista vacia');   
  listaEventos.forEach(evento => {
    if (evento.eventos.includes(elemento)) {
      evento.pulpo ? n11++ : n01++;
    } else if (!evento.eventos.includes(elemento)) {
      evento.pulpo ? n10++ : n00++;
    }
  });

  console.assert(elemento , 'es un nulo o undefined o vacio');   
  eventos = Object.create(phi.calcularCorrelacion);
  
  return {
    nombre: elemento,
    n00: n00,
    n01: n01,
    n10: n10,
    n11: n11,
    phi: eventos.prototype.calcularCorrelacion(n00, n01, n10, n11)
  };
}

// te devuelve las correlaciones mas altas
function obtenerMayoresCorrelaciones(numero = 3) {
  console.assert(typeof numero === 'number', 'no es un numero');
  let eventosOrdenadosPhi = [];
  let arrayOrdenadoEventos = [];
  let numeroEventosOrdenados= [];
  listadoEventosCorrelacion.forEach(evento => {
    eventosOrdenadosPhi.push(evento.phi);
  });
  console.assert(eventosOrdenadosPhi.length > 0, 'no contiene almenos un dato');
  // eventos ordenados por phi
  eventosOrdenadosPhi.sort().reverse();
  // lista con elementos ordenados igual a numero
  numeroEventosOrdenados = eventosOrdenadosPhi.splice(0,numero);
  console.assert(numeroEventosOrdenados.length === numero , 'no se han copiado o el numero de elementos no es el mismo');
  
  // obtienes la lista con los elementos selecionados y la ordenas
  listadoEventosCorrelacion.forEach(evento => {
    numeroEventosOrdenados.forEach(element => {
      if (element === evento.phi) {
        arrayOrdenadoEventos.push(evento.phi);
    }
    });
  });

  arrayOrdenadoEventos.sort().reverse();
  // pusheado objetos en array
  eventosOrdenadosPhi = [];
  arrayOrdenadoEventos.forEach(element => {
    listadoEventosCorrelacion.forEach(evento => {
      if (evento.phi === element) {
          eventosOrdenadosPhi.push({nombre: evento.nombre, phi: evento.phi});
      }
    });
  });
  console.assert(eventosOrdenadosPhi.length === numero , 'no se han copiado o el numero de elementos no es el mismo');
  return eventosOrdenadosPhi;
 }



function mostrarCorrelacion() {
  console.assert(listadoEventosCorrelacion.length > 0, 'es una lista vacia');
  listadoEventosCorrelacion.forEach(elemento => {
    console.assert(typeof elemento === 'object', 'no es una lista de objetos'); 
  /*   console.log(elemento); */
  });
}

module.exports = {

  obtenerMayoresCorrelaciones: obtenerMayoresCorrelaciones,
  obtenerSetEventosDiario: obtenerSetEventosDiario,
  obtenerListadoEventosCorrelacion: obtenerListadoEventosCorrelacion,
  calcularCorrelacion: calcularCorrelacion,
  mostrarCorrelacion: mostrarCorrelacion,
  listadoEventosCorrelacion: listadoEventosCorrelacion
};
