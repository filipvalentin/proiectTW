<?php
include("authorization_logic.php");

$decoded = getDecodedJWT();

if ($decoded == null) {
	http_response_code(401);
	die();
}

$decoded_array = (array) $decoded;

$user_id = $decoded_array["sub"];

$hmk_id = $_GET["homework_id"];
$problem_id = $_GET["problem_id"];



$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

http_response_code(200);

// echo $hmk_id." ".$problem_id." ".$user_id;

$stm = $db->prepare("SELECT * FROM classes_homeworks ch INNER JOIN homeworks_problems_info hpi ON hpi.homework_id = ch.homework_id AND hpi.homework_id = ? AND hpi.problem_id = ? AND hpi.user_id = ?");
$res = $stm->execute([$hmk_id, $problem_id, $user_id]);
$results = $stm->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);

echo $json;