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


$stm = $db->prepare("INSERT INTO users VALUES (?,?,?,?)");
$stm->bindValue(1, $username);
$stm->bindValue(2, $email);
$stm->bindValue(3, $role);
$stm->bindValue(4, $password_hash);

$res = $stm->execute();

http_response_code(200);