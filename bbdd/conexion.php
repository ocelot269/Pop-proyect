<?php
class Database {
    private const USERNAME = 'root';
    private const PASSWORD = '';
    public $connectionDb;

      public function __construct() {

         // Hacemos un try catch para depurar errores
         try {

            // Creamos el constructor usando el atributo $connectionDb
            $this->connectionDb =new PDO('mysql:host=localhost:3306;dbname=pop;charset=utf8', self::USERNAME, self::PASSWORD);;

         } catch (Exception $e) {

            // Si hubiera algún error lo mostramos usando el método GetMessage
            echo "Error de conexión: " . $e->GetMessage() . "<br>En la AAAA línea: " . $e->getLine();

         } finally {

            // Cerramos la conexión haya ténido éxito o no
            //$this->connectionDb = null;
         }   
}
}
?>