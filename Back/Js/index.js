let proyecto = require('./proyecto');
let diario = require('../../diario');

//set de acciones
proyecto.obtenerListadoEventosCorrelacion(diario.DIARIO);
proyecto.crearTablaCorrelaciones(proyecto.listadoEventosConValores);