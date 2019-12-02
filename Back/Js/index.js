/* import '../../front/Css/index.css'; */
/* import '../../front/Css/diario.css'; */


let proyecto = require('./proyecto');
let diarioService = require('./diarioService');
let diario = require('../../diario');
let dom = require('./dom');

//set de acciones
proyecto.obtenerListadoEventosCorrelacion(diario.DIARIO);
proyecto.obtenerMayoresCorrelaciones(3);
dom.crearValoresGraficaPorLista(proyecto.obtenerMayoresCorrelaciones());
dom.crearTablaCorrelaciones(proyecto.listadoEventosConValores); 
dom.prueba();
diarioService.diarioService();