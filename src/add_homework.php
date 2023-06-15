<?php
include("authorization_logic.php");

$decoded = getDecodedJWT();

if ($decoded == null) {
	http_response_code(401);
	die();
}

$decoded_array = (array) $decoded;


$response = json_decode(file_get_contents('php://input'), true);

$classId = $response["class_id"];
$title = $response["title"];
$deadline = $response["deadline"];

$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$uniqueId = uniqid("hmk");

$stm = $db->prepare("INSERT INTO classes_homeworks (class_id, homework_id, title, deadline, added_at) VALUES (?,?,?,?,NOW())");
$res = $stm->execute([$classId, $uniqueId, $title, $deadline]);

$assigned_problems = $response["assigned_problems"];

foreach ($assigned_problems as $assignedProblemId) {
	$stm = $db->prepare("INSERT INTO homeworks_assigned_problems VALUES (?,?)");
	$res = $stm->execute([$uniqueId, $assignedProblemId]);
}

$custom_roblems = $response["custom_problems"];
foreach ($custom_roblems as $customProblem) {
	$stm = $db->prepare("INSERT INTO homeworks_custom_problems (homework_id, title, tags, difficulty, description, added_at) VALUES (?,?,?,?,?,NOW())");
	$res = $stm->execute([$uniqueId, $customProblem["title"], $customProblem["tags"], $customProblem["difficulty"], $customProblem["description"]]);
}



http_response_code(200);