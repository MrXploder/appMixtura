<?php
// Headers HTML para prevenir que el navegador guarde en caché el contenido de la pagina
Header('Content-type: text/javascript');
Header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
Header("Cache-Control: post-check=0, pre-check=0", false);
Header("Pragma: no-cache");
// Notificar solamente errores de ejecución
error_reporting(E_ERROR);

require $_SERVER['DOCUMENT_ROOT'].'/php/dependencies/sanitizeInput.php';
require $_SERVER['DOCUMENT_ROOT'].'/php/dependencies/getIdFromIp.php';
require $_SERVER['DOCUMENT_ROOT'].'/php/dependencies/meekrodb.class.php';
//DB::debugMode();

//VARIABLES////////////////////////////////////////////////
$securityToken      			= sanitizeInput($_GET["security_token"]); //ITS MEANT TO BE AN ALPHANUMERIC 20DIGIT LENGTH UNIQUE TOKEN
$requestedResource  			= sanitizeInput($_GET["requested_resource"]);  //ITS MEANT TO BE THE RESOURCE TO REQUEST EX: TICKETS, PROYECTS, ALL, ETC.
$userType           			= null;
$custumerId 			  			= null;
$payLoad									= array();
$dbResourcesForAdminGetRequest = array(
	"tareas" 						  => "SELECT `tareas`.* , `clientes`.`nom_cliente`, opu.`nom_operador` AS nom_ejecutor1, opd.`nom_operador` AS nom_ejecutor2 FROM `tareas` INNER JOIN `clientes` ON `tareas`.`id_cliente` = `clientes`.`id_cliente` INNER JOIN `operadores` AS opu ON `tareas`.`id_ejecutor1` = opu.`id_operador` INNER JOIN `operadores` AS opd ON `tareas`.`id_ejecutor2` = opd.`id_operador` ORDER BY `tareas`.`id_tarea` DESC",
	"tareas_programadas"  => "SELECT `tareas_programadas`.* , `clientes`.`nom_cliente` FROM `tareas_programadas` INNER JOIN `clientes` ON `tareas_programadas`.`id_cliente` = `clientes`.`id_cliente` ORDER BY `tareas_programadas`.`id_tareaprogramada` DESC",
	"proyectos"					  => "SELECT `proyectos`.* , `clientes`.`nom_cliente`, opu.`nom_operador` AS nom_ejecutor1, opd.`nom_operador` AS nom_ejecutor2, opt.`nom_operador` AS nom_solicitante FROM `proyectos` INNER JOIN `clientes` ON `proyectos`.`id_cliente` = `clientes`.`id_cliente` INNER JOIN `operadores` AS opu ON `proyectos`.`id_ejecutor1` = opu.`id_operador` INNER JOIN `operadores` AS opd ON `proyectos`.`id_ejecutor2` = opd.`id_operador` INNER JOIN `operadores` AS opt ON `proyectos`.`id_solicitante` = opt.`id_operador` ORDER BY `proyectos`.`id_proyecto` DESC",
	"operadores"				  => "SELECT * FROM `operadores` ORDER BY `id_operador` ASC",
	"clientes"					  => "SELECT * FROM `clientes` ORDER BY `id_cliente` ASC",
	"sucursales"				  => "SELECT `sucursales`.*, `clientes`.`nom_cliente` FROM `sucursales` INNER JOIN `clientes` ON `sucursales`.`id_cliente` = `clientes`.`id_cliente`",
	"techdata_equipos"	  => "SELECT `techdata_equipos`.*, `clientes`.`nom_cliente`, `sucursales`.`nom_sucursal` FROM `techdata_equipos` INNER JOIN `clientes` ON `techdata_equipos`.`id_cliente` = `clientes`.`id_cliente` INNER JOIN `sucursales` ON `techdata_equipos`.`id_sucursal` = `sucursales`.`id_sucursal` ORDER BY `techdata_equipos`.`id_cliente` ASC",
	"techdata_servidores" => "SELECT `techdata_servidores`.*, `clientes`.`nom_cliente`, `sucursales`.`nom_sucursal` FROM `techdata_servidores` INNER JOIN `clientes` ON `techdata_servidores`.`id_cliente` = `clientes`.`id_cliente` INNER JOIN `sucursales` ON `techdata_servidores`.`id_sucursal` = `sucursales`.`id_sucursal` ORDER BY `techdata_servidores`.`id_cliente` ASC"
);
///////////////////////////////////////////////////////////
//CALCULAR TIPO DE USUARIO: 1.- ADMIN 2.- CUSTUMER 3.- NULL
if(empty($securityToken)){
	$custumerId = getIdFromIp();
	if($custumerId === -1){
		$userType = null;
		http_response_code(401); //401 Unauthorized
		exit();
	}
	else{
		$userType = "custumer";
	}
}
else if(!empty($securityToken)){
	if(strlen($securityToken) === 20){
		$checkUser = DB::queryFirstRow("SELECT `id_operador` FROM `operadores` WHERE `admin_token` = %s", $_GET["security_token"]);
		if(array_key_exists("id_operador", $checkUser)){
			$userType = "admin";
		}
	}
	else{
		http_response_code(400); //Bad Request
		exit();
	}
}

if(!array_key_exists($requestedResource, $dbResourcesForGetRequest) && $requestedResource != "all"){
	http_response_code(400); //Bad Request
	exit();
}

///***///

$userType = "custumer";
$custumerId = 1;

///***///
////////////////////////////////////////////////////////////////

//METHODS///////////////////////////////////////////////////////
if($_SERVER['REQUEST_METHOD'] === 'GET'){
	if($userType === "admin"){
		if($requestedResource == 'all'){
			foreach ($dbResourcesForGetRequest as $key => $value){
				$payLoad[$key] = DB::query($value);
			}
		}
		else{
			if(array_key_exists($requestedResource, $dbResourcesForGetRequest)){
				$payLoad[$requestedResource] = DB::query($dbResourcesForGetRequest[$requestedResource]);
			}
		}
	}
	else if($userType === "custumer"){
		if($requestedResource === 'all'){
			$payLoad 						= DB::queryFirstRow("SELECT * FROM `clientes` WHERE `id_cliente` = %d", $custumerId);
			$payLoad["tickets"] = DB::query("SELECT * FROM `tareas` WHERE `id_cliente` = %d ORDER BY `id_tarea` DESC", $custumerId);
		}
		else{
			http_response_code(401); //401 Unauthorized
			exit();
		}
	}
	echo json_encode($payLoad, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
	http_response_code(200); //200 OK
	exit();
}
else if($_SERVER['REQUEST_METHOD'] === 'POST'){
	$postdata = file_get_contents("php://input");
	if(!empty($postdata)){
		$request = json_decode($postdata, true);
	}
	else{
		http_response_code(400); //Bad Request
		exit();
	}
}
else if($_SERVER['REQUEST_METHOD'] === 'PUT'){

}
else if($_SERVER['REQUEST_METHOD'] === 'DELETE'){

}
else{
	http_response_code(405); //405 Method not Allowed
	exit();
}
?> 