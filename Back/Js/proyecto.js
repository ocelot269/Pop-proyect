'use strict'

var pulpo;
var dataFromlocalStorage = JSON.parse(localStorage.getItem("diario"));
var listadoAccionesMariano = () => {
  let acciones  = new Set([]);
  DIARIO.forEach(evento => {
    evento.eventos.forEach(accion => {
      acciones.add(accion);
    });
  });
  return acciones;
}

function contieneEvento($evento) { }

function mostrarRegistro() { }

// Añade un objeto de tipo Registro al diario.
function mostrarDiario() { }

function phi(n00, n01, n10, n11) {
  let discriminante = (n10 + n11) *
    (n01 + n00) *
    (n01 + n11) *
    (n10 + n00);

  return (n11 * n00 - n10 * n01) / Math.sqrt(discriminante);
}


console.log(phi(76, 9, 4, 1));
console.log(listadoAccionesMariano());

