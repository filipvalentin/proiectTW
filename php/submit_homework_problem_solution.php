<?php

include("authorization_logic.php");

$decoded = getDecodedJWT();

if($decoded == null){
	http_response_code(401);
	die();
}

$decoded_array = (array) $decoded;

$user_id = $decoded_array['sub'];
$role = $decoded_array["role"];

if($role != "student"){
	http_response_code(401);
	return;
}


$response = json_decode(file_get_contents('php://input'), true);
$solution = $response["solution"];
$homework_id = $response["homework_id"];
$problem_id = $response["problem_id"];


$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare("UPDATE homeworks_problems_info SET solution = ?, status = 'solved', last_status_update = NOW() WHERE homework_id = ? AND problem_id = ? AND user_id = ?");
$res = $stm->execute([$solution, $homework_id, $problem_id, $user_id]);

http_response_code(200);