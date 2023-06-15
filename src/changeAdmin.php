<?php

$response = json_decode(file_get_contents('php://input'), true);


$idUser = $response['idUser'];

$username=$response['username'];
$entire_name=$response['entire_name'];
$highschool=$response['highschool'];
$gender=$response['gender'];
$aboutMe=$response['aboutMe'];
$role = $response['role'];
$email = $response['email'];


$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare("UPDATE users SET username = ?, email = ?, role = ?  WHERE user_id = ?");
$stm->bindValue(1, $username);
$stm->bindValue(2, $email);
$stm->bindValue(3, $role);
$stm->bindValue(4, $idUser);

$res = $stm->execute();

$stm = $db->prepare("UPDATE info_users SET entire_name = ?, gender = ?, high_school = ?, about_me = ? WHERE id_user = ?");
$stm->bindValue(1, $entire_name);
$stm->bindValue(2, $gender);
$stm->bindValue(3, $highschool);
$stm->bindValue(4, $aboutMe);
$stm->bindValue(5, $idUser);

$res = $stm->execute();

http_response_code(200);
