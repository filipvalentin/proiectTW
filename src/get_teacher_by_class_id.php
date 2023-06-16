<?php

$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare("SELECT users.user_id, users.username FROM classes INNER JOIN users ON users.user_id = classes.teacher_id AND classes.id = ?");
$res = $stm->execute([$_GET["class_id"]]);
$results = $stm->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results[0]);

http_response_code(200);

echo $json;