<?php
include("authorization_logic.php");

$decoded = getDecodedJWT();

if ($decoded == null) {
	http_response_code(401);
	die();
}

$decoded_array = (array) $decoded;

$response = json_decode(file_get_contents('php://input'), true);

$hmk_id = $response["homework_id"];
$problem_id = $response["problem_id"];
$user_id = $response["user_id"];
$comment_id = $response["comment_id"];

$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare("DELETE FROM homeworks_problems_comments WHERE homework_id = ? AND problem_id = ? AND user_id = ? AND comment_id=?");
$res = $stm->execute([$hmk_id, $problem_id, $user_id, $comment_id]);
// echo $hmk_id." ".$problem_id." ". $user_id;

http_response_code(200);

