<?php



class Diario {

    private $data;
    private $diarios;


function __construct()
{    
    $this->data = file_get_contents("diario.json");
    $this->diarios = json_decode($this->data,true);
}

function getActions () {
$actions = [];
$index = 0;
foreach ($this->diarios as $diario){
    echo '<pre>';
    $actions[$index] = [$diario['eventos'] ,  $diario['pulpo']]; 
    echo '</pre>';
   $index++;
}
 return $actions;
}


}
 
?>

