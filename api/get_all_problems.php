<?php

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
	http_response_code(400);
	die();
}

$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare("SELECT id, title, tags, difficulty, description, status, post_date FROM teacher_problems");
$res = $stm->execute();
$results = $stm->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);

http_response_code(200);

echo $json;