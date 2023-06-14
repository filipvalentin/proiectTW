<?php
include("authorization_logic.php");

$decoded = getDecodedJWT();

if($decoded == null){
	http_response_code(401);
	die();
}

$decoded_array = (array) $decoded;

$response = json_decode(file_get_contents('php://input'), true);

$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


$stm = $db->prepare("DELETE FROM classes_students WHERE class_id = ? AND student_id = ?");
$res = $stm->execute([$response["class_id"], $response["user_id"]]);

http_response_code(200);