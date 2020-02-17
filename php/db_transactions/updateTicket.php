<?php
Header('Content-type: text/javascript');
Header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
Header("Cache-Control: post-check=0, pre-check=0", false);
Header("Pragma: no-cache");
error_reporting(E_ERROR);

require $_SERVER['DOCUMENT_ROOT'].'/app/php/dependencies/meekrodb.class.php';
//DB::debugMode();


$postdata = file_get_contents("php://input");
$request = json_decode($postdata, true);

try{
	DB::update('tareas', array(
		'estado_tarea'				=>		$request["estado_tarea"],
		'cant_horas'					=>		$request["cant_horas"],
		'porcentaje_avance'		=>		$request["porcentaje_avance"],
		'id_ejecutor1'				=>		$request["id_ejecutor1"],
		'id_ejecutor2'				=>		$request["id_ejecutor2"],
		'prioridad_tarea'			=>		$request["prioridad_tarea"],
		'timestamp_ejecucion'	=>		$request["timestamp_ejecucion"],
		'obs_operador' 				=>		$request["obs_operador"]), 
		"id_tarea=%d", 							$request["id_tarea"]
	);
	DB::update('operadores', array('tareas' => 1), "tareas=%d", 0);
	
	echo '{"status":"success"}';
}
catch(MeekroDBException $e){
	echo '{"status":"mysqlError","code":"'.$e->getMessage().'"}';
	exit();
}

?>