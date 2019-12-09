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
        console.log(nombre + ' funcionando correctamente');
    } catch (Error) {
        callback();
        console.log(nombre);
    };
};

test('phi', () => {
    const resultado = phi.calcularCorrelacion(76, 9, 4, 1);
    const esperado = 0.06859943405700354;
    expect(resultado).toBe(esperado);
});

 test('obtenerSetEventosDiario', () => {
    const resultado = proyecto.obtenerSetEventosDiario(diario.DIARIO).size;
    const esperado = 26;
    expect(resultado).toBe(esperado);
});


test('obtenerListadoEventosCorrelacion', () => {
    const resultado = proyecto.obtenerListadoEventosCorrelacion(diario.DIARIO)[12].nombre;
    const esperado = "feria del pulpo";
    expect(resultado).toBe(esperado);
});


test('calcularCorrelacion', () => {
    const resultado = proyecto.calcularCorrelacion('mejillones',diario.DIARIO).phi;
    const esperado =  0.014097096860865023;
    expect(resultado).toBe(esperado);
});

test('calcularCorrelacion2', () => {
    const resultado = proyecto.calcularCorrelacion('mejillones',diario.DIARIO).nombre;
    const esperado = 'mejillones';
    expect(resultado).toBe(esperado);
});


test('obtenerMayoresCorrelaciones', () => {
    const resultado = proyecto.obtenerMayoresCorrelaciones().length;
    const esperado = 3;
    expect(resultado).toBe(esperado);
});


test('obtenerMayoresCorrelaciones2', () => {
    const resultado = proyecto.obtenerMayoresCorrelaciones(6).length;
    const esperado = 6;
    expect(resultado).toBe(esperado);
});

test('obtenerMayoresCorrelaciones3', () => {
    const resultado = proyecto.obtenerMayoresCorrelaciones(1).length;
    const esperado = 1;
    expect(resultado).toBe(esperado);
});

test('mostrarCorrelacion', () => {
    const resultado = proyecto.mostrarCorrelacion();
    const esperado = undefined;
    expect(resultado).toBe(esperado);
});





