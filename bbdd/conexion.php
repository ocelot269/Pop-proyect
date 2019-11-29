<?php
$con=mysql_connect("localhost","root","root"); //direcion del servidor , usuario y contraseña
mysql_select_db("pop", $con); //nombre de la base de datos
mysql_query("SET NAME 'UTF8'");
?>