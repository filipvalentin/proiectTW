<?php
include("authorization_logic.php");

$decoded = getDecodedJWT();

if($decoded == null){
	http_response_code(401);
	die();
}

$decoded_array = (array) $decoded;
$user_id = $decoded_array['sub'];

$title = file_get_contents('php://input');

$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


$stm = $db->prepare("INSERT INTO classes (teacher_id, class_name, creation_time) VALUES (?,?,NOW())");
$res = $stm->execute([$user_id, $title]);

http_response_code(200);