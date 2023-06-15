<?php

$response = json_decode(file_get_contents('php://input'), true);


$idProblem = $response['id'];
$status=$response['status'];


$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare("UPDATE teacher_problems SET status = ?, status_update_date = NOW() WHERE id = ?");
if($status == '1'){
    $stm->bindValue(1, 'VERIFIED');
}else{
    $stm->bindValue(1, 'REJECTED');
}

$stm->bindValue(2, $idProblem);


$res = $stm->execute();

http_response_code(200);
