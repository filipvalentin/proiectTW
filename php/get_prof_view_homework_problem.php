<?php
include("authorization_logic.php");

$decoded = getDecodedJWT();

if ($decoded == null) {
	http_response_code(401);
	die();
}

$decoded_array = (array) $decoded;

$homework_id = $_GET["homework_id"];
$problem_id = $_GET["problem_id"];


$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

//username, status, studentid, comment

// echo $homework_id." ".$problem_id;

$query = 
"SELECT users.username, hpi.user_id, hpi.status, hpi.score, hpi.rating, hpi.last_status_update FROM homeworks_problems_info hpi INNER JOIN users ON users.user_id = hpi.user_id WHERE hpi.homework_id = ? AND hpi.problem_id = ?";


$stm = $db->prepare($query);
$res = $stm->execute([$homework_id, $problem_id]);
$results = $stm->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);


http_response_code(200);

echo $json;