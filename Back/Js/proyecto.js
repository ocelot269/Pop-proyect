"use strict";

var dataFromlocalStorage = JSON.parse(localStorage.getItem("diario"));
// set de acciones
var listadoAccionesMariano = () => {
  let acciones = new Set([]);
  DIARIO.forEach(evento => {
    evento.eventos.forEach(accion => {
      acciones.add(accion);
    });
  });
  return acciones;
};

function obtenerListadoAccionesMarianoConValues() {
  let listadoDefinitivo = [];
  listadoAccionesMariano().forEach(registro => {
     listadoDefinitivo.push(calcularN(registro));
  });
  return listadoDefinitivo;
}

function calcularN(registro) {
  let contieneNoPulpo = 0;
  let contieneYPulpo = 0;
  let noContieneYpulpo = 0;
  let noContieneNoPulpo = 0;
  DIARIO.forEach(evento => {
    if (evento.eventos.includes(registro)) {
      if (evento.pulpo) {
        contieneYPulpo++;
      } else {
        contieneNoPulpo++;
      }
    } else if (!evento.eventos.includes(registro)) {
      if (evento.pulpo) {
        noContieneYpulpo++;
      } else {
        noContieneNoPulpo++;
      }
    }
  });
  return { nombre: registro, value: { n00: noContieneNoPulpo, n01: contieneNoPulpo, n10: noContieneYpulpo, n11: contieneYPulpo }
  };
}

function contieneEvento($evento) {}

function mostrarRegistro() {}

function mostrarValoresPhi() {
  let listado = obtenerListadoAccionesMarianoConValues();
  listado.forEach(elemento => {
    console.log(elemento ,phi(elemento.value.n00,elemento.value.n01,elemento.value.n10,elemento.value.n11));
  });
}

function phi(n00, n01, n10, n11) {
  let discriminante = (n10 + n11) * (n01 + n00) * (n01 + n11) * (n10 + n00);

  return (n11 * n00 - n10 * n01) / Math.sqrt(discriminante);
}

console.log(phi(76, 9, 4, 1));
console.log(mostrarValoresPhi());
