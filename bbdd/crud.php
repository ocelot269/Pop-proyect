
<?php
    include 'conexion.php';
   // $sql = "select * from persona";
    $sql = "INSERT INTO Diario (eventos, pulpo) VALUES (['pan de millo',
      'filloas',
      'me lave los dientes',
      'siesta con La Vuelta',
      'baño en a Lanzada'],
    False)";
    $resultado = mysql_query($sql);
?>

