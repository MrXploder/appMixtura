<?php
// Headers HTML para prevenir que el navegador guarde en caché el contenido de la pagina
Header('Content-type: text/javascript');
Header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
Header("Cache-Control: post-check=0, pre-check=0", false);
Header("Pragma: no-cache");
// Notificar solamente errores de ejecución
error_reporting(E_ERROR);

// Incluimos los necesario para usar la Clase MeekroDB
require $_SERVER['DOCUMENT_ROOT'].'/php/dependencies/meekrodb.class.php';
//DB::debugMode();

if(!empty($_POST["s_token"])){
	if($_SERVER['REQUEST_METHOD'] === 'GET'){

	}
	else if($_SERVER['REQUEST_METHOD'] === 'POST'){

	}
	else if($_SERVER['REQUEST_METHOD'] === 'PUT'){

	}
	else if($_SERVER['REQUEST_METHOD'] === 'DELETE'){
		
	}
}