/* import '../../front/Css/index.css'; */
/* import '../../front/Css/diario.css'; */


let proyecto = require('./proyecto');
let ajax = require('./ajax');
let diario = require('../../diario');

//set de acciones
proyecto.obtenerListadoEventosCorrelacion(diario.DIARIO);
proyecto.crearTablaCorrelaciones(proyecto.listadoEventosConValores);
ajax.ajax();