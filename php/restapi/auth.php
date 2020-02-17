<?php
// Headers HTML para prevenir que el navegador guarde en caché el contenido de la pagina
Header('Content-type: text/javascript');
Header('Expires: Sun, 01 Jan 2014 00:00:00 GMT');
Header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
Header("Cache-Control: post-check=0, pre-check=0", false);
Header("Pragma: no-cache");
// Notificar solamente errores de ejecución
error_reporting(E_ERROR);

require $_SERVER['DOCUMENT_ROOT'] . '/app' .'/php/dependencies/meekrodb.class.php';
require $_SERVER['DOCUMENT_ROOT'] . '/app' .'/php/functions/sanitizeInput.php';
require $_SERVER['DOCUMENT_ROOT'] . '/app' .'/php/enviroment.php';

$secretPrefix = "elvisIsNotDead";
$secretSubFix = "theManDidNotGoToTheMoon";

//Necesario por medidas de seguridad.
if (!empty($_SERVER['HTTP_CLIENT_IP'])) { $ip_solicitante = $_SERVER['HTTP_CLIENT_IP']; }
else if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) { $ip_solicitante = $_SERVER['HTTP_X_FORWARDED_FOR']; }
else { $ip_solicitante = $_SERVER['REMOTE_ADDR']; }

//METHODS///////////////////////////////////////////////////////
//POST FOR AUTHENTICATE A USER GIVEN A USER NAME AND PASSWORD
//RETURNS A 20 ALPHANUMERIC TOKEN

//TOKEN -> 20 ALPHANUMERIC + 
try{
	if($_SERVER['REQUEST_METHOD'] === 'POST'){
		$postdata = file_get_contents("php://input");
		if(!empty($postdata)){
			$request = json_decode($postdata, true);
			$userInfo = DB::queryFirstRow("SELECT * FROM `operators` WHERE `name` = %s", $request["name"]);
			if($userInfo != null && $userInfo["name"] === $request["name"] && $userInfo["pass"] === $request["pass"]){
				$sinceDate = new DateTime("now");
				$tillDate = new DateTime("now");
				$tillDate->add(new DateInterval('P30D'));
				$hash = hash("sha256", ($secretPrefix.",".$userInfo["name"].",".$userInfo["pass"].",".$sinceDate->format("d/m/Y").",".$tillDate->format("d/m/Y")));
				DB::insert("sessions", array(
					"operator_id" => $userInfo["id"],
					"since"				=> $sinceDate->format("d/m/Y"),
					"till"        => $tillDate->format("d/m/Y"),
					"hash"				=> $hash
				)); 
				$payLoad["user"] = array(
					"id"	   => $userInfo["id"], 
					"name"   => $userInfo["name"],
					"avatar" => $userInfo["avatar"],
					"token"  => $hash,
				);
				http_response_code(200);
				echo json_encode($payLoad, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
				exit();	
			}
			else{
				http_response_code(400);
				exit();
			}
		}
		else{
			http_response_code(400);
			exit();
		}
	}
	else if($_SERVER['REQUEST_METHOD'] === 'HEAD'){
		$token = sanitizeInput($_GET["token"]);
		$action = sanitizeInput($_GET["action"]);
		
		if(!empty($token) && $action === "verify"){
			$sessionInfo = DB::queryFirstRow("SELECT * FROM `sessions` WHERE `hash` = %s", $token);
			if(!empty($sessionInfo)){
				$currentDate = new DateTime("now");
				$dbDate = DateTime::createFromFormat("d/m/Y", $sessionInfo["till"]);
				if($currentDate > $dbDate){
					DB::delete("sessions", "hash = %s", $token);
					http_response_code(410);
					exit();
				}
				else{
					http_response_code(200);
					exit();
				}
			}
			else{
				http_response_code(401);
				exit();
			}
		}
		else if(!empty($token) && $action === "logout"){
			DB::query("SELECT * FROM `sessions` WHERE `hash` = %s LIMIT 1", $token);
			if(DB::count() > 0){
				DB::delete("sessions", "hash = %s", $token);
				http_response_code(202);
				exit();
			}
			else{
				http_response_code(404);
				exit();
			}
		}
		else{
			http_response_code(401);
			exit();
		}
	}
	else{
		http_response_code(405);
		exit();
	}
}
catch(MeekroDBException $e){
	Header("X-Error-Message: ".$e->getMessage());
	http_response_code(500);
	exit();
}
?> 