<?php
include("authorization_logic.php");

$decoded = getDecodedJWT();

if($decoded == null){
	http_response_code(401);
	die();
}

$decoded_array = (array) $decoded;


$response = json_decode(file_get_contents('php://input'), true);


$user_id = $decoded_array['sub'];
$difficulty = $response['difficulty'];
$tags = $response['tags'];
$description = $response['description'];
$title = $response['title'];


$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


$stm = $db->prepare("INSERT INTO teacher_problems (teacher_id, title, difficulty, tags, status, description, post_date, status_update_date) VALUES (?,?,?,?,'PENDING',?, NOW(), NOW())");
$res = $stm->execute([$user_id, $title, $difficulty, $tags, $description]);

http_response_code(200);
