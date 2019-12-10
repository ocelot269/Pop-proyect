let correlacion = require("./proyecto");
let diario = require('../../diario');

function crearTablaCorrelaciones() {
  //div tabla reference
  if (document.getElementById("tabla")) {
    let tabla = document.getElementById("tabla");
    
    // create elements <table> and a <tabla>
    let tbl = document.createElement("table");
    let tblBody = document.createElement("tbody");
    // cabecera
    let titulosTabla = ['Eventos','n00','n01','n10','n11','Correlación'];
    let tr = document.createElement("tr");
    tblBody.appendChild(tr);
    titulosTabla.forEach(ths => {
      let th = document.createElement("th");
      thText = document.createTextNode(ths);
      th.appendChild(thText);
      tr.appendChild(th);
    });
    
    
    // creacion de celdas
    for (let tr = 0; tr < correlacion.listadoEventosCorrelacion.length; tr++) {
      // creacion de filas
      row = document.createElement("tr");
      //accion posicion
      const eventoPulpo = correlacion.listadoEventosCorrelacion[tr];
      //listado de las propiedades
      const eventoPulpoValues = Object.values(eventoPulpo);

      for (const propiedades in eventoPulpoValues) {
        if (correlacion.listadoEventosCorrelacion.hasOwnProperty(propiedades)) {
          // creado td y su contenido
          let cell = document.createElement("td");
          let cellText = document.createTextNode(eventoPulpoValues[propiedades]);
          cell.appendChild(cellText);
          row.appendChild(cell);
        }
      }
      tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    
    tabla.appendChild(tbl);
  }
}

function crearValoresGraficaPorLista(lista) {
  let grafica = document.getElementsByClassName("grafica");
  if (grafica[0]) {
    let index = 0;
    for (const elemento of grafica[0].children) {
      console.assert(lista.length > 0, "no contiene valor");
      numero = lista[index].phi;
      // conversion a string y extraemos parte decimal
      numero = String(numero).substring(2, 4) + "%";
      // estilo modificado
      elemento.style.width = numero;
      elemento.style.fontFamily = "Noto Sans, sans-serif";
      // añades el nombre
      elemento.innerText = lista[index].nombre + " " + numero;
      console.assert(elemento.innerText, "no contiene valor");
      index++;
    }
  }
}

function crearTablaEventosDiarios() {
  let lista = document.querySelector(".semanas");
  if (lista) {
    for (let index = 0; index < 90; index++) {
      let row = document.createElement("div");
      // al evento lo pones a escuchar el click
      row.addEventListener("click", evento => {
        modal.style.display = "block";
        evento = evento.target.innerHTML;
        obtenerPosicionDiario(evento);
      });
      // condicion para dividirlo en 7 las filas
      if (index % 7 == 0) {
        lista.appendChild(row);
        // for para las filas
        for (let semana = 1; semana <= 7; semana++) {
          let cell = document.createElement("p");
          // celda con los numeros
          row.appendChild(cell);
          // condicion
          index + semana < 10
            ? (cell.innerHTML = "0" + String(index + semana))
            : (cell.innerHTML = index + semana);
        }
      }
    }
  }
}
function onclickIcon() {
  document.querySelector('.icon').addEventListener("click", evento => {
    navbar();
  });
}
function navbar() {
    
  let topnav = document.getElementById("myTopnav");
  if (myTopnav) {
    if (topnav.className === "topnav") {
        topnav.className += " responsive";
    } else {
        topnav.className = "topnav";
    }
  }
}


function obtenerPosicionDiario(numero) { // numero es tipo string
  console.assert(typeof numero === 'string' && numero, 'no es numero o es null o undefined');
  let p = document.createElement('p') ;
  let p1 = document.createElement('p') ;
  let modal = document.querySelector(".modal-content");
  if (modal.childNodes[3]) {
      modal.removeChild(modal.childNodes[3]); // ---->refactor
      modal.removeChild(modal.childNodes[3]); // ---->refactor      
  }
    if (numero < 10) {
      // para quitar el 0 de delante del numero
      numero = numero[1] ;
    }
      p.innerHTML = 'Eventos: ' + diario.DIARIO[numero -1].eventos;
      modal.appendChild(p);
      if (diario.DIARIO[numero- 1].pulpo == true) {
        p1.innerHTML = "Pulpo: <img src='https://st2.depositphotos.com/1036149/5289/i/950/depositphotos_52899257-stock-photo-fun-octopus-in-sunglasses.jpg' width='90'>";
      } else {
        p1.innerHTML = "Pulpo: <img src='https://fis.com/fis/worldnews/images/24600_350x280_72_DPI_0.jpg' width='90'>";
      }
      modal.appendChild(p1);
}

module.exports = {
  onclickIcon: onclickIcon,
  obtenerPosicionDiario : obtenerPosicionDiario,
  crearTablaCorrelaciones: crearTablaCorrelaciones,
  crearValoresGraficaPorLista: crearValoresGraficaPorLista,
  crearTablaEventosDiarios: crearTablaEventosDiarios
};
