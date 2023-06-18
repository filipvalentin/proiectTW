<?php
include("authorization_logic.php");

$decoded = getDecodedJWT();

if ($decoded == null) {
	http_response_code(401);
	die();
}

$decoded_array = (array) $decoded;

$class_id = $_GET["class_id"];
$page_count = $_GET["page_count"];
$page_multiplier = $_GET["page_multiplier"];


$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare("SELECT homework_id, title, deadline FROM classes_homeworks WHERE class_id = ? LIMIT ?, ?");
$res = $stm->execute([$class_id, $page_multiplier, $page_count]);
$results = $stm->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);

http_response_code(200);

echo $json;