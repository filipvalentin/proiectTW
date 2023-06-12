<?php
require_once("E:\\twlab\\xampp\\php\\vendor\\autoload.php");//TODO 
use Firebase\JWT\JWT;

$response = json_decode(file_get_contents('php://input'), true);

$email = $response['email'];
$password_hash = password_hash($response['password'], PASSWORD_DEFAULT);



$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);



$stm = $db->prepare("SELECT user_id, password FROM users WHERE email = ?");
$res = $stm->execute([$email]);
$rows = $stm->fetchAll(PDO::FETCH_NUM); //userId, username, email, role, password

if(empty($rows)){ // nu s-a gasit emailul
	http_response_code(401);
	echo "ENF"; //email not found
	return;
}


if (password_verify($response['password'], $rows[0][1]))
{
    $t0 = time();

    $key = 'one key to rule them all';
    $payload = [
        'iss' => 'http://localhost',
        'sub' => $rows[0][0],
        'iat' => $t0,
        'exp' => $t0 + 3600*24*7
    ];

    $jwt = JWT::encode($payload, $key, 'HS256');
	

    echo $jwt;
} else {
    http_response_code(401);
}