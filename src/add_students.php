<?php
include("authorization_logic.php");

$decoded = getDecodedJWT();

if($decoded == null){
	http_response_code(401);
	die();
}

$decoded_array = (array) $decoded;

$response = json_decode(file_get_contents('php://input'), true);

$class_id = $response["class_id"];
$users = $response["users"];

// echo $class_id;

$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$stm = $db->prepare("CALL add_student(?,?)");

foreach ($users as $user) {
	$res = $stm->execute([$class_id, $user]);
}

http_response_code(200);
