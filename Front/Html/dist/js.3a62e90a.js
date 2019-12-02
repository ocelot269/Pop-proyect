// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../back/js/phi.js":[function(require,module,exports) {
var phi = Object.create(Object);

phi.prototype.phi = function phi(n00, n01, n10, n11) {
  var numero_raiz = (n10 + n11) * (n01 + n00) * (n01 + n11) * (n10 + n00);
  return (n11 * n00 - n10 * n01) / Math.sqrt(numero_raiz);
};

module.exports = {
  phi: phi
};
},{}],"../../back/js/proyecto.js":[function(require,module,exports) {
var phi = require("./phi");

var listadoEventosCorrelacion = new Array(); // listado de todos los diferentes eventos que hay en el diario

var obtenerSetEventosDiario = function obtenerSetEventosDiario(DIARIO) {
  var acciones = new Set([]);
  DIARIO.forEach(function (evento) {
    evento.eventos.forEach(function (accion) {
      acciones.add(accion);
    });
  });
  return acciones;
};

function obtenerListadoEventosCorrelacion(DIARIO) {
  obtenerSetEventosDiario(DIARIO).forEach(function (registro) {
    listadoEventosCorrelacion.push(calcularCorrelacion(registro, DIARIO));
  });
  /*   console.log(listadoEventosCorrelacion); */

  return listadoEventosCorrelacion;
}

function calcularCorrelacion(registro, listaEventos) {
  var n01 = 0,
      n11 = 0,
      n10 = 0,
      n00 = 0;
  listaEventos.forEach(function (evento) {
    if (evento.eventos.includes(registro)) {
      evento.pulpo ? n11++ : n01++;
    } else if (!evento.eventos.includes(registro)) {
      evento.pulpo ? n10++ : n00++;
    }
  });
  eventos = Object.create(phi.phi);
  return {
    nombre: registro,
    n00: n00,
    n01: n01,
    n10: n10,
    n11: n11,
    phi: eventos.prototype.phi(n00, n01, n10, n11)
  };
} // te devuelve las correlaciones mas altas


function obtenerMayoresCorrelaciones() {
  var numero = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
  var eventosOrdenadosPhi = [];
  var arrayOrdenadoEventos = [];
  var numeroEventosOrdenados = [];
  listadoEventosCorrelacion.forEach(function (evento) {
    eventosOrdenadosPhi.push(evento.phi);
  }); // eventos ordenados por phi

  eventosOrdenadosPhi.sort().reverse();
  numeroEventosOrdenados = eventosOrdenadosPhi.splice(0, numero); // copia del numero seleccionado

  listadoEventosCorrelacion.forEach(function (evento) {
    numeroEventosOrdenados.forEach(function (element) {
      if (element === evento.phi) {
        arrayOrdenadoEventos.push(evento.phi);
      }
    });
  });
  arrayOrdenadoEventos.sort().reverse(); // pusheado objetos en array

  eventosOrdenadosPhi = [];
  arrayOrdenadoEventos.forEach(function (element) {
    listadoEventosCorrelacion.forEach(function (evento) {
      if (evento.phi === element) {
        eventosOrdenadosPhi.push({
          nombre: evento.nombre,
          phi: evento.phi
        });
      }
    });
  });
  console.log(eventosOrdenadosPhi);
  return eventosOrdenadosPhi;
}

function mostrarCorrelacion() {
  listadoEventosCorrelacion.forEach(function (elemento) {
    /*   console.log(elemento); */
  });
}

module.exports = {
  obtenerMayoresCorrelaciones: obtenerMayoresCorrelaciones,
  obtenerSetEventosDiario: obtenerSetEventosDiario,
  obtenerListadoEventosCorrelacion: obtenerListadoEventosCorrelacion,
  calcularCorrelacion: calcularCorrelacion,
  mostrarCorrelacion: mostrarCorrelacion,
  listadoEventosCorrelacion: listadoEventosCorrelacion
};
},{"./phi":"../../back/js/phi.js"}],"../../back/js/diarioService.js":[function(require,module,exports) {
function diarioService() {
  // Creación de la petición HTTP
  var req = new XMLHttpRequest(); // Petición HTTP GET síncrona hacia el archivo diario.json del servidor

  req.open("GET", "http://localhost/Pop-proyect/bbdd/crud.php", false); // Envío de la petición

  req.send(null); // Impresión por la consola de la respuesta recibida desde el servidor

  console.log(req.responseText);
}

module.exports = {
  diarioService: diarioService
};
},{}],"../../diario.js":[function(require,module,exports) {
var DIARIO = [{
  eventos: ["mejillones", "caminar", "siesta con La Vuelta"],
  pulpo: false
}, {
  eventos: ["pan de millo", "filloas", "me lave los dientes", "siesta con La Vuelta", "baño en a Lanzada"],
  pulpo: false
}, {
  eventos: ["mejillones", "chinchos", "me lave los dientes", "Panorama", "siesta con La Vuelta"],
  pulpo: false
}, {
  eventos: ["caldo gallego", "licor cafe", "me lave los dientes", "mencia", "siesta con La Vuelta"],
  pulpo: false
}, {
  eventos: ["feria del pulpo", "pementos de padron", "me lave los dientes", "caminar", "siesta con La Vuelta", "Paris de Noia"],
  pulpo: false
}, {
  eventos: ["caldo gallego", "filloas", "me lave los dientes", "caña de 1906", "siesta con La Vuelta"],
  pulpo: false
}, {
  eventos: ["pizza", "me lave los dientes", "mencia", "leer el Marca", "baño en a Lanzada"],
  pulpo: false
}, {
  eventos: ["pan de millo", "recortarme la barba", "me lave los dientes", "Panorama", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["empanada de bacalao", "me lave los dientes", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["pizza", "me lave los dientes", "Panorama", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["carne o caldeiro", "chinchos", "me lave los dientes", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["me lave los dientes", "siesta con La Vuelta", "baño en a Lanzada"],
  pulpo: false
}, {
  eventos: ["navajas", "me lave los dientes", "ver el fúbol", "siesta con La Vuelta"],
  pulpo: false
}, {
  eventos: ["vieiras", "me lave los dientes", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["me lave los dientes", "mencia", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["navajas", "chinchos", "me lave los dientes", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["mejillones", "me lave los dientes", "caña de 1906", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["me lave los dientes", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["empanada de bacalao", "choveu", "siesta con La Vuelta"],
  pulpo: false
}, {
  eventos: ["pan de millo", "me lave los dientes", "siesta con La Vuelta"],
  pulpo: false
}, {
  eventos: ["carne o caldeiro", "me lave los dientes", "caminar", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["vieiras", "me lave los dientes", "choveu", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["mejillones", "licor cafe", "me lave los dientes", "ver el fúbol", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["vieiras", "chinchos", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["empanada de bacalao", "licor cafe", "me lave los dientes", "Panorama", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["vieiras", "percebes", "mencia", "siesta con La Vuelta"],
  pulpo: true
}, {
  eventos: ["feria del pulpo", "licor cafe", "me lave los dientes", "mencia", "siesta con La Vuelta"],
  pulpo: false
}, {
  eventos: ["feria del pulpo", "licor cafe", "me lave los dientes", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["percebes", "me lave los dientes", "caña de 1906", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["feria del pulpo", "caminar", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["pizza", "licor cafe", "mencia", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["carne o caldeiro", "licor cafe", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["empanada de bacalao", "pementos de padron", "choveu", "siesta con La Vuelta"],
  pulpo: false
}, {
  eventos: ["carne o caldeiro", "chinchos", "me lave los dientes", "caña de 1906", "siesta con La Vuelta"],
  pulpo: false
}, {
  eventos: ["feria del pulpo", "me lave los dientes", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["mejillones", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["pizza", "recortarme la barba", "leer el Marca", "Paris de Noia"],
  pulpo: false
}, {
  eventos: ["carne o caldeiro", "filloas", "Panorama", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["vieiras", "me lave los dientes", "choveu", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["vieiras", "filloas", "ver el fúbol", "siesta con La Vuelta"],
  pulpo: false
}, {
  eventos: ["pan de millo", "me lave los dientes", "caminar", "siesta con La Vuelta"],
  pulpo: false
}, {
  eventos: ["carne o caldeiro", "percebes", "leer el Marca"],
  pulpo: true
}, {
  eventos: ["pizza", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["feria del pulpo", "caminar", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["me lave los dientes", "caminar", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["vieiras", "me lave los dientes", "ver el fúbol", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["pizza", "Panorama", "siesta con La Vuelta"],
  pulpo: false
}, {
  eventos: ["mejillones", "me lave los dientes", "siesta con La Vuelta"],
  pulpo: false
}, {
  eventos: ["mejillones", "recortarme la barba", "me lave los dientes", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["pizza", "percebes", "pementos de padron", "leer el Marca"],
  pulpo: true
}, {
  eventos: ["mejillones", "percebes", "me lave los dientes", "choveu", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["feria del pulpo", "percebes", "me lave los dientes", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["mejillones", "chinchos", "me lave los dientes", "caminar", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["pizza", "percebes", "me lave los dientes", "ver el fúbol", "siesta con La Vuelta"],
  pulpo: false
}, {
  eventos: ["carne o caldeiro", "me lave los dientes", "Panorama", "siesta con La Vuelta"],
  pulpo: false
}, {
  eventos: ["empanada de bacalao", "percebes", "me lave los dientes", "mencia", "leer el Marca", "baño en a Lanzada"],
  pulpo: false
}, {
  eventos: ["navajas", "me lave los dientes", "ver el fúbol", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["feria del pulpo", "me lave los dientes", "mencia", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["pan de millo", "pementos de padron", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["feria del pulpo", "chinchos", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["mejillones", "filloas", "me lave los dientes", "siesta con La Vuelta"],
  pulpo: false
}, {
  eventos: ["mejillones", "me lave los dientes", "caminar", "siesta con La Vuelta", "baño en a Lanzada"],
  pulpo: false
}, {
  eventos: ["caldo gallego", "caña de 1906", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["me lave los dientes", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["navajas", "me lave los dientes", "caña de 1906", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["pementos de padron", "me lave los dientes", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["caldo gallego", "me lave los dientes", "mencia", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["pan de millo", "me lave los dientes", "siesta con La Vuelta"],
  pulpo: false
}, {
  eventos: ["empanada de bacalao", "me lave los dientes", "siesta con La Vuelta"],
  pulpo: false
}, {
  eventos: ["vieiras", "pementos de padron", "ver el fúbol", "leer el Marca", "baño en a Lanzada"],
  pulpo: false
}, {
  eventos: ["mejillones", "filloas", "me lave los dientes", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["navajas", "me lave los dientes", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["mejillones", "licor cafe", "me lave los dientes", "Panorama", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["pizza", "me lave los dientes", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["vieiras", "percebes", "caminar", "siesta con La Vuelta"],
  pulpo: true
}, {
  eventos: ["pan de millo", "recortarme la barba", "mencia", "siesta con La Vuelta", "baño en a Lanzada"],
  pulpo: false
}, {
  eventos: ["me lave los dientes", "caña de 1906", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["navajas", "percebes", "me lave los dientes", "leer el Marca", "baño en a Lanzada"],
  pulpo: false
}, {
  eventos: ["carne o caldeiro", "me lave los dientes", "ver el fúbol", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["empanada de bacalao", "me lave los dientes", "caña de 1906", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["mejillones", "me lave los dientes", "caña de 1906", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["mejillones", "choveu", "siesta con La Vuelta"],
  pulpo: false
}, {
  eventos: ["mejillones", "percebes", "choveu", "siesta con La Vuelta"],
  pulpo: true
}, {
  eventos: ["feria del pulpo", "me lave los dientes", "caña de 1906", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["carne o caldeiro", "licor cafe", "leer el Marca", "baño en a Lanzada"],
  pulpo: false
}, {
  eventos: ["empanada de bacalao", "percebes", "me lave los dientes", "Panorama", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["pizza", "me lave los dientes", "caña de 1906", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["navajas", "me lave los dientes", "leer el Marca"],
  pulpo: false
}, {
  eventos: ["pan de millo", "me lave los dientes", "ver el fúbol", "siesta con La Vuelta"],
  pulpo: false
}, {
  eventos: ["empanada de bacalao", "percebes", "me lave los dientes", "siesta con La Vuelta"],
  pulpo: false
}];
module.exports = {
  DIARIO: DIARIO
};
},{}],"../../back/js/dom.js":[function(require,module,exports) {
var correlacion = require("./proyecto");

function crearTablaCorrelaciones() {
  //body reference
  var body = document.getElementById("tabla"); // create elements <table> and a <tbody>

  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody"); // cells creation

  for (var tr = 0; tr < correlacion.listadoEventosCorrelacion.length; tr++) {
    // table row creation
    var row = document.createElement("tr"); //accion posicion

    var eventoPulpo = correlacion.listadoEventosCorrelacion[tr]; //listado de las propiedades

    var eventoPulpoValues = Object.values(eventoPulpo);

    for (var key in eventoPulpoValues) {
      if (correlacion.listadoEventosCorrelacion.hasOwnProperty(key)) {
        /* console.log(eventoPulpoValues[key]); */
        // create element <td> and text node
        //Make text node the contents of <td> element
        // put <td> at end of the table row
        var cell = document.createElement("td");
        var cellText = document.createTextNode(eventoPulpoValues[key]);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
    } //row added to end of table body


    tblBody.appendChild(row);
  } // append the <tbody> inside the <table>


  tbl.appendChild(tblBody); // put <table> in the <body>

  body.appendChild(tbl); // tbl border attribute to

  tbl.setAttribute("border", "2");
}

function crearValoresGraficaPorLista(lista) {
  var listado = lista;
  console.log(listado);
  var grafica = document.getElementsByClassName("grafica");

  if (grafica[0]) {
    var index = 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = grafica[0].children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var elemento = _step.value;
        // añades el nombre
        elemento.innerText = listado[index].nombre;
        numero = listado[index].phi; // conversion a string y extraemos parte decimal

        numero = String(numero).substring(2, 4); // estilo modificado

        elemento.style.width = numero + "%";
        index++;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
}

function prueba() {
  console.log("mariano");
}

module.exports = {
  prueba: prueba,
  crearTablaCorrelaciones: crearTablaCorrelaciones,
  crearValoresGraficaPorLista: crearValoresGraficaPorLista
};
},{"./proyecto":"../../back/js/proyecto.js"}],"../../back/js/index.js":[function(require,module,exports) {
/* import '../../front/Css/index.css'; */

/* import '../../front/Css/diario.css'; */
var proyecto = require('./proyecto');

var diarioService = require('./diarioService');

var diario = require('../../diario');

var dom = require('./dom'); //set de acciones


proyecto.obtenerListadoEventosCorrelacion(diario.DIARIO);
proyecto.obtenerMayoresCorrelaciones(3);
dom.crearValoresGraficaPorLista(proyecto.obtenerMayoresCorrelaciones());
dom.crearTablaCorrelaciones(proyecto.listadoEventosConValores);
dom.prueba();
diarioService.diarioService();
},{"./proyecto":"../../back/js/proyecto.js","./diarioService":"../../back/js/diarioService.js","../../diario":"../../diario.js","./dom":"../../back/js/dom.js"}],"../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54751" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../../back/js/index.js"], null)
//# sourceMappingURL=/js.3a62e90a.js.map