<?php

$response = json_decode(file_get_contents('php://input'), true);

$username = $response['username'];
$email = $response['email'];
$role = $response['role'];

$password_hash = password_hash($response['password'], PASSWORD_DEFAULT);


$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);



$checkUsername = $db->prepare('SELECT COUNT(username) FROM users WHERE username = ?');
$checkUsername->execute([$username]);
//asta ar exista mai mult de precautie in cazul in care cumva userul ar trece de javascriptul din pagina
if ($checkUsername->fetchColumn() == 1) { //daca a gasit un username => fail direct
	http_response_code(403);
	return;
}

$checkEmail = $db->prepare('SELECT COUNT(email) FROM users WHERE email =  ?');
$checkEmail->execute([$email]);
if ($checkUsername->fetchColumn() == 1) { //daca a gasit emailul => fail direct
	http_response_code(403);
	return;
}

$path = '../resources/Sample_User_Icon.jpg';

$type = pathinfo($path, PATHINFO_EXTENSION);
$data = file_get_contents($path);
$base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);


$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$uniqueId = uniqid();

$stm = $db->prepare("INSERT INTO users (user_id, username, email, role, password, creation_date) VALUES (?,?,?,?,?, NOW())");
$stm->bindValue(1, $uniqueId);
$stm->bindValue(2, $username);
$stm->bindValue(3, $email);
$stm->bindValue(4, $role);
$stm->bindValue(5, $password_hash);

$res = $stm->execute();


//todo cand facem merge

$stm = $db->prepare("INSERT INTO info_users (id_user, user_image) VALUES (?, ?)");
$stm->bindValue(1, $uniqueId);
$stm->bindValue(2, $base64);
$res = $stm->execute();

http_response_code(200);