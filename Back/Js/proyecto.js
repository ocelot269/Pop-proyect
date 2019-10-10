"use strict";

var pulpo;
var registro = [
  {
    evento: "trabajar, tocar un árbol, hamburguesa, correr, twitter",
    pulpo: false
  }
];

function contieneEvento($evento, evento) {}

function mostrarRegistro() {}

// Añade un objeto de tipo Registro al diario.
function mostrarDiario() {}

function phi(n00, n01, n10, n11) {
  let multiplos = (n10 + n11) * 
                  (n01 + n00) * 
                  (n01 + n11) * 
                  (n10 + n00);
                  
  return (n11 * n00 - n10 * n01) / Math.sqrt(multiplos);
}

console.log(phi(76, 9, 4, 1));
