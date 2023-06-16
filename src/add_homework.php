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

$hmk_unique_id = uniqid("hmk");

$stm = $db->prepare("INSERT INTO classes_homeworks (class_id, homework_id, title, deadline, added_at) VALUES (?,?,?,?,NOW())");
$res = $stm->execute([$classId, $hmk_unique_id, $title, $deadline]);

$assigned_problems = $response["assigned_problems"];

foreach ($assigned_problems as $assignedProblemId) {
	$stm = $db->prepare("INSERT INTO homeworks_assigned_problems VALUES (?,?)");
	$res = $stm->execute([$hmk_unique_id, $assignedProblemId]);

	$stm = $db->prepare("CALL homework_add_class_students(?,?,?)");
	$res = $stm->execute([$classId, $hmk_unique_id, $assignedProblemId]);
}

$custom_problem_unique_id = uniqid("customp");

$custom_roblems = $response["custom_problems"];
foreach ($custom_roblems as $customProblem) {
	$stm = $db->prepare("INSERT INTO homeworks_custom_problems (homework_id, custom_problem_id, title, tags, difficulty, description, added_at) VALUES (?,?,?,?,?,?,NOW())");
	$res = $stm->execute([$hmk_unique_id, $custom_problem_unique_id, $customProblem["title"], $customProblem["tags"], $customProblem["difficulty"], $customProblem["description"]]);

	$stm = $db->prepare("CALL homework_add_class_students(?,?,?)");
	$res = $stm->execute([$classId, $hmk_unique_id, $custom_problem_unique_id]);
}





http_response_code(200);