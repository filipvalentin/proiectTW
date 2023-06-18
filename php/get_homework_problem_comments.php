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
$user_id = null;
if (isset($_GET["user_id"])) {
	// Modify the flag variable if the parameter is missing
	$user_id = $_GET["user_id"];
}


$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

//username, status, studentid, comment

// echo $homework_id." ".$problem_id;
http_response_code(200);

if ($user_id == null) {
	$stm = $db->prepare("SELECT users.user_id, username, comment_id, comment, comment_date FROM homeworks_problems_comments INNER JOIN users on homeworks_problems_comments.user_id = users.user_id WHERE homework_id = ? AND problem_id = ?");
	$res = $stm->execute([$homework_id, $problem_id]);
	$results = $stm->fetchAll(PDO::FETCH_ASSOC);
	$json = json_encode($results);
	echo $json;
} else {
	$stm = $db->prepare("SELECT users.user_id, username, comment_id, comment, comment_date FROM homeworks_problems_comments INNER JOIN users on homeworks_problems_comments.user_id = users.user_id AND users.user_id = ? WHERE homework_id = ? AND problem_id = ?");
	$res = $stm->execute([$user_id, $homework_id, $problem_id]);
	$results = $stm->fetchAll(PDO::FETCH_ASSOC);
	$json = json_encode($results);
	echo $json;
}