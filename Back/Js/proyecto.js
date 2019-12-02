let phi = require("./phi");

let listadoEventosCorrelacion = new Array();
// listado de todos los diferentes eventos que hay en el diario
var obtenerSetEventosDiario = DIARIO => {
  let acciones = new Set([]);
  DIARIO.forEach(evento => {
    evento.eventos.forEach(accion => {
      acciones.add(accion);
    });
  });
  return acciones;
};

function obtenerListadoEventosCorrelacion(DIARIO) {
  obtenerSetEventosDiario(DIARIO).forEach(registro => {
    listadoEventosCorrelacion.push(calcularCorrelacion(registro, DIARIO));
  });
/*   console.log(listadoEventosCorrelacion); */
  return listadoEventosCorrelacion;
}

function calcularCorrelacion(registro, listaEventos) {
  let n01 = 0,
    n11 = 0,
    n10 = 0,
    n00 = 0;
  listaEventos.forEach(evento => {
    if (evento.eventos.includes(registro)) {
      evento.pulpo ? n11++ : n01++;
    } else if (!evento.eventos.includes(registro)) {
      evento.pulpo ? n10++ : n00++;
    }
  });

  eventos = Object.create(phi.phi);
  return {
    nombre: registro,
    n00: n00,
    n01: n01,
    n10: n10,
    n11: n11,
    phi: eventos.prototype.phi(n00, n01, n10, n11)
  };
}

// te devuelve las correlaciones mas altas
function obtenerMayoresCorrelaciones(numero= 3) {
  let eventosOrdenadosPhi = [];
  let arrayOrdenadoEventos = [];
  let numeroEventosOrdenados= [];
  listadoEventosCorrelacion.forEach(evento => {
    eventosOrdenadosPhi.push(evento.phi);
    
  });
  // eventos ordenados por phi
  eventosOrdenadosPhi.sort().reverse();
  numeroEventosOrdenados = eventosOrdenadosPhi.splice(0,numero);
  
  // copia del numero seleccionado
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
  console.log(eventosOrdenadosPhi);
  return eventosOrdenadosPhi;
 }



function mostrarCorrelacion() {
  listadoEventosCorrelacion.forEach(elemento => {
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
