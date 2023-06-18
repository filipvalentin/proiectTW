<?php

include("authorization_logic.php");

$decoded = getDecodedJWT();

if($decoded == null){
	http_response_code(401);
	die();
}

$decoded_array = (array) $decoded;

$user_id = $decoded_array['sub'];

$response = json_decode(file_get_contents('php://input'), true);

$email = $response['email'];


$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare("UPDATE users SET email = ? WHERE user_id = ?");
$stm->bindValue(1, $email);
$stm->bindValue(2, $user_id);

$res = $stm->execute();

http_response_code(200);

