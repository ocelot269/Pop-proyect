/* import '../../front/Css/index.css'; */
/* import '../../front/Css/diario.css'; */


let proyecto = require('./proyecto');
let diarioService = require('./diarioService');
let diario = require('../../diario');
let crearTablaCorrelaciones = require('./tablaCorrelacion');

//set de acciones
proyecto.obtenerListadoEventosCorrelacion(diario.DIARIO);
crearTablaCorrelaciones.crearTablaCorrelaciones(proyecto.listadoEventosConValores); 
diarioService.diarioService();