<?php
include("authorization_logic.php");

$decoded = getDecodedJWT();

if ($decoded == null) {
	http_response_code(401);
	die();
}

$decoded_array = (array) $decoded;

$response = json_decode(file_get_contents('php://input'), true);

$user_id = $decoded_array["sub"];
$hmk_id = $response["hmk_id"];
$problem_id = $response["problem_id"];
$rating = $response["rating"];


$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare("UPDATE homeworks_problems_info SET rating = ? WHERE homework_id = ? AND problem_id = ? AND user_id = ?");
$res = $stm->execute([$rating, $hmk_id, $problem_id, $user_id]);

echo $rating;
http_response_code(200);