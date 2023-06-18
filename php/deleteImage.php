<?php

$response = json_decode(file_get_contents('php://input'), true);


$idUser = $response['idUser'];
$path = __DIR__.'/../resources/Sample_User_Icon.jpg';
$type = pathinfo($path, PATHINFO_EXTENSION);
$data = file_get_contents($path);
$base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);

// echo $path;
$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare("UPDATE info_users SET  user_image = ? WHERE id_user = ?");
$stm->bindValue(1, $base64);
$stm->bindValue(2, $idUser);

$res = $stm->execute();

http_response_code(200);
