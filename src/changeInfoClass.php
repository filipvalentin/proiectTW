<?php

$response = json_decode(file_get_contents('php://input'), true);

$id_user = $response['id'];
$name = $response['name'];
$description = $response['description'];


$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare("UPDATE classes SET class_name = ? , description = ? WHERE id = ?");
$stm->bindValue(1, $name);
$stm->bindValue(2, $description);
$stm->bindValue(3, $id_user);

$res = $stm->execute();

http_response_code(200);

