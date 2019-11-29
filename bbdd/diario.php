<?php
$data = file_get_contents("./diario.json");
$diarios = json_decode($data,true);
foreach ($diarios as $diario){
    echo '<pre>';
    print_r($diario);
    echo '</pre>';


}
?>