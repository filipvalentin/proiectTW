<?php
include("authorization_logic.php");

$decoded = getDecodedJWT();

if($decoded == null){
	http_response_code(401);
	die();
}

$decoded_array = (array) $decoded;

$user_id = $decoded_array['sub'];


$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare("SELECT * FROM CLASSES WHERE teacher_id=?");
$res = $stm->execute([$user_id]);
$results = $stm->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);

http_response_code(200);

echo $json;
