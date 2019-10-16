'use strict'

var pulpo;
var dataFromlocalStorage = JSON.parse(localStorage.getItem("diario"));
var conjuntoN = [];

function contieneEvento($evento) { }

function mostrarRegistro() { }

// Añade un objeto de tipo Registro al diario.
function mostrarDiario() { }

function calcularN00() {
  let n00 = new Set([]);
  DIARIO.forEach(evento => {
    n00 = new Set([]);;
    n00.add(evento.eventos);
    console.log(n00);
    
  });
}

function phi(n00, n01, n10, n11) {
  let discriminante = (n10 + n11) *
    (n01 + n00) *
    (n01 + n11) *
    (n10 + n00);

  return (n11 * n00 - n10 * n01) / Math.sqrt(discriminante);
}


console.log(phi(76, 9, 4, 1));
console.log(calcularN00());

