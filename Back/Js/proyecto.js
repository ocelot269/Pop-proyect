"use strict";

var dataFromlocalStorage = JSON.parse(localStorage.getItem("diario"));

var eventos_diario = () => {
  /**
   * Devuelve un set de todos los
   * diferentes eventos que hay en el diario.
   */
  let acciones = new Set([]);
  DIARIO.forEach(evento => {
    evento.eventos.forEach(accion => {
      acciones.add(accion);
    });
  });
  return acciones;
};

function listado_matriz() {
  /**
   * Devuelve un array con el evento
   * y la matriz con sus valores correspondientes.
   * Llama a "matriz_eventos" para recibir los valores.
   */
  let listado_eventos = [];
  eventos_diario().forEach(registro => {
     listado_eventos.push(matriz_eventos(registro));
  });
  return listado_eventos;
}

function matriz_eventos(registro) {
  /**
   * n00 == no sucede el evento y no se convierte en pulpo
   * n01 == sucede el evento y pero no se convierte en pulpo
   * n10 == no sucede el evento y pero si se convierte en pulpo
   * n11 == sucede el evento y se convierte en pulpo
   */
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

function phi(n00, n01, n10, n11) {
  let numero_raiz = (n10 + n11) * (n01 + n00) * (n01 + n11) * (n10 + n00);

  return (n11 * n00 - n10 * n01) / Math.sqrt(numero_raiz);
}

/**
 * Diferentes console.log para ver que vamos 
 * haciendo e ir "testeando".
 */

console.log(phi(76, 9, 4, 1));

var listado_eventos = listado_matriz();
console.log(listado_eventos);

let listado = listado_matriz();
listado.forEach(elemento => {
  console.log(elemento.nombre);
  console.log(elemento.value.n00,elemento.value.n01,elemento.value.n10,elemento.value.n11);
  console.log(phi(elemento.value.n00,elemento.value.n01,elemento.value.n10,elemento.value.n11))
})

/**
 * ¡CASOS TEST!
 */

function expect(resultado) {
  return {
      toBe(esperado) {
          if (resultado !== esperado) {
              throw new Error('El resutado: ' + resultado +' no es igual al esperado: ' + esperado)
          };
      }
  };
};

function test(nombre, callback) {
  try {
      callback();
      console.log(nombre);
  } catch (Error) {
      callback();
      console.log(nombre);
  };
};

test('phi', () => {
  const resultado = phi(76, 9, 4, 1);
  const esperado = 0.06859943405700354;
  console.log(expect(resultado).toBe(esperado));
});

test('listado', () => {
  const resultado = eventos_diario().size;
  const esperado = 26;
  console.log(expect(resultado).toBe(esperado));
});

