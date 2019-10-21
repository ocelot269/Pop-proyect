"use strict";

var dataFromlocalStorage = JSON.parse(localStorage.getItem("diario"));
// listado de todos los diferentes eventos que hay en el diario
var eventos_diario = () => {
  let acciones = new Set([]);
  DIARIO.forEach(evento => {
    evento.eventos.forEach(accion => {
      acciones.add(accion);
    });
  });
  return acciones;
};

function listado_matriz() {
  let listado_eventos = [];
  eventos_diario().forEach(registro => {
     listado_eventos.push(matriz_eventos(registro));
  });
  return listado_eventos;
}

/**
 * n00 == no sucede el evento y no se convierte en pulpo
 * n01 == sucede el evento y pero no se convierte en pulpo
 * n10 == no sucede el evento y pero si se convierte en pulpo
 * n11 == sucede el evento y se convierte en pulpo
 */

function matriz_eventos(registro) {
  let n01 = 0;
  let n11 = 0;
  let n10 = 0;
  let n00 = 0;
  DIARIO.forEach(evento => {
    if (evento.eventos.includes(registro)) {
      if (evento.pulpo) {
        n11++;
      } else {
        n01++;
      }
    } else if (!evento.eventos.includes(registro)) {
      if (evento.pulpo) {
        n10++;
      } else {
        n00++;
      }
    }
  });
  return { nombre: registro, value: { n00: n00, n01: n01, n10: n10, n11: n11 }
  };
}

// function contieneEvento($evento) {}

// function mostrarRegistro() {}

/*function calcular_correlacion() {
  let listado = listado_matriz();
  listado.forEach(elemento => {
    console.log(elemento ,phi(elemento.value.n00,elemento.value.n01,elemento.value.n10,elemento.value.n11));
  });
}*/

function phi(n00, n01, n10, n11) {
  let numero_raiz = (n10 + n11) * (n01 + n00) * (n01 + n11) * (n10 + n00);

  return (n11 * n00 - n10 * n01) / Math.sqrt(numero_raiz);
}

console.log(phi(76, 9, 4, 1));

let listado = listado_matriz();
listado.forEach(elemento => {
  console.log(elemento.nombre);
  console.log(elemento.value.n00,elemento.value.n01,elemento.value.n10,elemento.value.n11);
  console.log(phi(elemento.value.n00,elemento.value.n01,elemento.value.n10,elemento.value.n11))
})


/**
 * creación de la tabla
 */

function tabla() {
  let listado = listado_matriz();
  listado.forEach(elemento => {
    let tabla = document.createElement("table");
    tabla.setAttribute("id", "tabla");
    document.body.appendChild(tabla);
  
    let fila_nombres = document.createElement("tr_nombres");
    fila_nombres.setAttribute("id", "tr_nombres");
    document.getElementById("tabla").appendChild(fila_nombres);
  
    let celda_th = document.createElement("th");
    let contenido_th = document.createTextNode(elemento.nombre);
    celda_th.appendChild(contenido_th);
    document.getElementById("tr_nombres").appendChild(celda_th);

    let fila_valores = document.createElement("tr_valores");
    fila_valores.setAttribute("id", "tr_valores");
    document.getElementById("tabla").appendChild(fila_valores);

    let celda_td = document.createElement("td");
    let contenido00 = document.createTextNode(elemento.value.n00 + "-");
    let contenido01 = document.createTextNode(elemento.value.n01 + "-");
    let contenido10 = document.createTextNode(elemento.value.n10 + "-");
    let contenido11 = document.createTextNode(elemento.value.n11);
    celda_td.appendChild(contenido00);
    celda_td.appendChild(contenido01);
    celda_td.appendChild(contenido10);
    celda_td.appendChild(contenido11);
    document.getElementById("tr_nombres").appendChild(celda_td);
  })
}
console.log(tabla());