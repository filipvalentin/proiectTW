<?php

$response = json_decode(file_get_contents('php://input'), true);


$idProblem = $response['idProblem'];

$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare("DELETE FROM teacher_problems WHERE teacher_problems.id = ?");

$stm->bindValue(1, $idProblem);

$res = $stm->execute();

http_response_code(200);
