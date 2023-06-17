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

$password = $response['password'];


$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare("SELECT password FROM users WHERE user_id = ?");
$res = $stm->execute([$user_id]);
$rows = $stm->fetchAll(PDO::FETCH_NUM); //passwd

if(empty($rows)){ // nu s-a gasit emailul
	http_response_code(401);
	// echo "ENF"; //email not found
	return;
}

if (password_verify($password, $rows[0][0]))
{
    $response = "DA";
    echo $response;
} else {
    $response = "NU";
    echo $response;
}


