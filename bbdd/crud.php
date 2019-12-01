<?php
     include './conexion.php';
     include './diario.php';

    function GetAllEvents() {
      $conexion = new Database();
      // Usamos try and catch para controlar los errores
      try {
      	header("access-control-allow-origin: *");
        
         // Variable que contiene la sentencia SQL para MySQL
         //$sql = "INSERT INTO `diario` (`id`, `pulpo`, `eventos`) VALUES (NULL, \'1\', \'  {\\r\\n    \\\"eventos\\\": [\\r\\n      \\\"mejillones\\\",\\r\\n      \\\"chinchos\\\",\\r\\n      \\\"me lave los dientes\\\",\\r\\n      \\\"Panorama\\\",\\r\\n      \\\"siesta con La Vuelta\\\"\\r\\n    ],\\r\\n    \\\"pulpo\\\": false\\r\\n  }\')";
         $sql = "SELECT * FROM `diario2`";
         // Guardamos en la variable query la setencia sql usando la conexion de $connectionDb de la clase Connection con el método prepare de PDO
         $query = $conexion->connectionDb->prepare($sql);
        
         // Guardamos los registros en un array sin delimitar
         $query->execute();

         // Guardamos los resultaos en una variable llamada resultado y le aplicamos el método fetchAll
         $resultado = $query->fetchAll(PDO::FETCH_ASSOC);

         // Cerramos la query
         $query->closeCursor();

         // Y devolvemos los resultados para la función
		 $data = array();
		// obtenemos los datos:
		$data[] = array(
		    $resultado[0]['eventos']
		  );
        
         return json_encode($data[0]);

         // Vaciamos el objeto connectionDb
         $this->connectionDb = null;

      } catch (Exception $e) {

         // Si hubiera algún error lo mostramos usando el método GetMessage
         echo "Error: " . $e->GetMessage() . "<br>línea: " . $e->getLine();

      }

   }
    
         
    echo '<pre>';
    print_r(GetAllEvents());
    echo '</pre>';
    //$diario= new Diario();
    //foreach( $diario->getActions() as $action){
     
     // print_r($action);
     // $sql =  "INSERT INTO diario (eventos,pulpo) VALUES ( " .  $action[0] . "),(" .$action[1] . ");" ; 
      
    //}
    // $resultado = mysql_query($sql);
?>
