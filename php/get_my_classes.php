<?php
include("authorization_logic.php");

$decoded = getDecodedJWT();

if ($decoded == null) {
	http_response_code(401);
	die();
}

$decoded_array = (array) $decoded;

$user_id = $decoded_array["sub"];
$role = $decoded_array["role"];


$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$stm = null;
if ($role == "teacher") {
	$stm = $db->prepare("SELECT * FROM CLASSES WHERE teacher_id=?");
} else if ($role == "student") {
	$stm = $db->prepare("SELECT c.id, c.teacher_id, c.class_name, c.description FROM classes_students cs INNER JOIN classes c ON c.id=cs.class_id WHERE cs.student_id=?");
}

$res = $stm->execute([$user_id]);
$results = $stm->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);

http_response_code(200);

echo $json;