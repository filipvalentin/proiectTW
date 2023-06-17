<?php
include("authorization_logic.php");

$decoded = getDecodedJWT();

if($decoded == null){
	http_response_code(401);
	die();
}

$decoded_array = (array) $decoded;

$user_id = $_GET["user_id"];
$user_role = $decoded_array["role"];

if($user_role != "admin"){
	http_response_code(401);
	die();
}

$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

//alte tabele!!!
$stm = $db->prepare("DELETE FROM users WHERE user_id = ?");
$res = $stm->execute([$user_id]);
// $results = $stm->fetchAll(PDO::FETCH_ASSOC);
// $json = json_encode($results);

echo $json;
http_response_code(200);