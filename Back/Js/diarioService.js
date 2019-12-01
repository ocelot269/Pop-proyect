function diarioService() {
    // Creación de la petición HTTP
var req = new XMLHttpRequest();
// Petición HTTP GET síncrona hacia el archivo diario.json del servidor
req.open("GET", "http://localhost/Pop-proyect/bbdd/crud.php", false);
// Envío de la petición
req.send(null);
// Impresión por la consola de la respuesta recibida desde el servidor
console.log(req.responseText);
}

module.exports = {
    diarioService: diarioService
}