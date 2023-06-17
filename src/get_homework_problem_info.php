<?php
include("authorization_logic.php");

$decoded = getDecodedJWT();

if ($decoded == null) {
	http_response_code(401);
	die();
}

$decoded_array = (array) $decoded;

$hmk_id = $_GET["homework_id"];
$problem_id = $_GET["problem_id"];
$type = $_GET["problem_type"];


$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

http_response_code(200);

if($type == "custom"){
	$stm = $db->prepare("SELECT title, tags, difficulty, description FROM homeworks_custom_problems WHERE homework_id = ? AND custom_problem_id = ?");
	$res = $stm->execute([$hmk_id, $problem_id]);
	$results = $stm->fetchAll(PDO::FETCH_ASSOC);
	$json = json_encode($results);
	
	echo $json;
}
else if($type == "assigned"){
	$stm = $db->prepare("SELECT tp.title, tp.tags, tp.difficulty, tp.description FROM homeworks_assigned_problems hap INNER JOIN teacher_problems tp ON hap.assigned_problem_id = tp.id WHERE hap.homework_id = ? AND hap.assigned_problem_id = ?");
	$res = $stm->execute([$hmk_id, $problem_id]);
	$results = $stm->fetchAll(PDO::FETCH_ASSOC);
	$json = json_encode($results);
	
	echo $json;
}
else{
	http_response_code(404);
}




