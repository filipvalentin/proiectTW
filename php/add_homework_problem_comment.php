<?php
include("authorization_logic.php");

$decoded = getDecodedJWT();

if ($decoded == null) {
	http_response_code(401);
	die();
}

$decoded_array = (array) $decoded;

$response = json_decode(file_get_contents('php://input'), true);

$user_id = $decoded_array['sub'];
$homework_id = $response["homework_id"];
$problem_id = $response["problem_id"];
$comment = $response["comment"];


$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$unique_id = uniqid("comment");
$stm = $db->prepare("INSERT INTO homeworks_problems_comments VALUES (?,?,?,?,?,NOW())");
$res = $stm->execute([$homework_id, $problem_id, $user_id, $unique_id, $comment]);

http_response_code(200);