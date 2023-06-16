<?php
require_once(__DIR__ . '/../vendor/autoload.php'); //todo
use Firebase\JWT\JWT;

$response = json_decode(file_get_contents('php://input'), true);

$email = $response['email'];
$intent = $response["intent"];

$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);



$stm = $db->prepare("SELECT user_id, password, role FROM users WHERE email = ?");
$res = $stm->execute([$email]);
$rows = $stm->fetchAll(PDO::FETCH_NUM); //userId, username, email, role, password

if (empty($rows)) { // nu s-a gasit emailul
	http_response_code(401);
	return;
}

//daca intentul este de admin si dar userul nu e admin, gbye
if ($rows[0][2] != "admin" && $intent == "admin") {
	http_response_code(401);
	return;
}

if (password_verify($response['password'], $rows[0][1]) && $rows[0][2] == $intent) {
	$t0 = time();

	$key = 'one key to rule them all';
	$payload = [
		'iss' => 'http://localhost',
		'sub' => $rows[0][0],
		'iat' => $t0,
		'exp' => $t0 + 3600 * 24 * 7,
		'role' => $rows[0][2]
	];

	$jwt = JWT::encode($payload, $key, 'HS256');

	echo $jwt;
} else {
	http_response_code(401);
}