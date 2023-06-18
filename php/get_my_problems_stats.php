<?php
include("authorization_logic.php");

$decoded = getDecodedJWT();

if ($decoded == null) {
	http_response_code(401);
	die();
}

$decoded_array = (array) $decoded;

$user_id = $decoded_array['sub'];


$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare("SELECT COUNT(id) FROM teacher_problems WHERE teacher_id = ?");
$res = $stm->execute([$user_id]);
$result = $stm->fetchAll(PDO::FETCH_NUM);
$problem_count = $result[0][0];

$stm = $db->prepare("SELECT COUNT(id) FROM teacher_problems WHERE teacher_id = ? AND status = 'VERIFIED'");
$res = $stm->execute([$user_id]);
$result = $stm->fetchAll(PDO::FETCH_NUM);
$verified_count = $result[0][0];

http_response_code(200);
echo json_encode(array('problem_count' => $problem_count, 'verified_count' => $verified_count));