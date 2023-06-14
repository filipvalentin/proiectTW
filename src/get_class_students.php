<?php
include("authorization_logic.php");

$decoded = getDecodedJWT();

if($decoded == null){
	http_response_code(401);
	die();
}

$decoded_array = (array) $decoded;


$class_id = $_GET["id"];


$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare("SELECT users.user_id, users.username, users.user_image FROM users INNER JOIN classes_students ON users.user_id = classes_students.student_id AND classes_students.class_id = ?");
$res = $stm->execute([$class_id]);
$results = $stm->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);

http_response_code(200);

echo $json;