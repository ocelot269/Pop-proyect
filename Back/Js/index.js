/* import '../../front/Css/index.css'; */
/* import '../../front/Css/diario.css'; */


let proyecto = require('./proyecto');
let diarioService = require('./diarioService');
let diario = require('../../diario');
let dom = require('./dom');

//set de acciones
proyecto.obtenerListadoEventosCorrelacion(diario.DIARIO);
//recibe lista
/* proyecto.prueba(); */
dom.crearValoresGraficaPorLista(proyecto.obtenerMayoresCorrelaciones(5));
dom.crearTablaCorrelaciones(proyecto.listadoEventosConValores); 
diarioService.diarioService();