<?php

$class_id = $_GET["class_id"];
$user_id = $_GET["user_id"];

$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare("SELECT AVG(hpi.score) FROM classes_homeworks c INNER JOIN homeworks_problems_info hpi ON c.class_id = ? AND c.homework_id = hpi.homework_id AND hpi.user_id = ? WHERE score != -1");
$res = $stm->execute([$class_id, $user_id]);
http_response_code(200);

echo $stm->fetchColumn();