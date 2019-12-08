let proyecto = require('./proyecto');
let diarioService = require('./diarioService');
let diario = require('../../diario');
let dom = require('./dom');
let phi = require('./phi');

function expect(resultado) {
    return {
        toBe(esperado) {
            if (resultado !== esperado) {
                throw new Error('El resutado: ' + resultado + ' no es igual al esperado: ' + esperado)
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

/* test('listado', () => {
    const resultado = eventos_diario().size;
    const esperado = 26;
    console.log(expect(resultado).toBe(esperado));
});

test('nombre evento', () => {
    const resultado = listado_matriz()[12].nombre;
    const esperado = "feria del pulpo";
    console.log(expect(resultado).toBe(esperado));
}); */