<?php

include("authorization_logic.php");

$decoded = getDecodedJWT();

if($decoded == null){
	http_response_code(401);
	die();
}

$decoded_array = (array) $decoded;

$user_id = $decoded_array['sub'];

$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$username = $_GET['username'];

$result = $db->prepare('SELECT COUNT(username) FROM users WHERE username = ? AND user_id != ?' );
$result->bindValue(2, $user_id);
$result->bindValue(1, $username);
$result->execute();

echo $result->fetchColumn();