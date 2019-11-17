var proyecto = require('./proyecto');
var diario = require('../../diario');

//set de acciones
console.log(proyecto.obtenerSetEventosDiario(diario.DIARIO));
proyecto.obtenerListadoEventosCorrelacion(diario.DIARIO);
console.log(proyecto.mostrarCorrelacion(proyecto.listadoEventosConValores));
proyecto.crearTablaCorrelaciones(proyecto.listadoEventosConValores);