<?php
include("authorization_logic.php");

$decoded = getDecodedJWT();

if ($decoded == null) {
	http_response_code(401);
	die();
}

$decoded_array = (array) $decoded;

$hmk_id = $_GET["id"];


$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);



$stm = $db->prepare("SELECT custom_problem_id as id, title FROM homeworks_custom_problems WHERE homework_id = ?");
$res = $stm->execute([$hmk_id]);
$results = $stm->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);


http_response_code(200);

echo $json;