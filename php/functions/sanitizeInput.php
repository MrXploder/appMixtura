<?php
/*
* @param $data (variable) -> can be any valid type
* @author MrXploder

*/
function sanitizeInput($data) {
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

//USAGE:
// echo $secureVar = sanitizeInput($_GET["myVar"]);
?>