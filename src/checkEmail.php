<?php
include("authorization_logic.php");

$decoded = getDecodedJWT();

if($decoded == null){
	http_response_code(401);
	die();
}

$email = $_GET['email'];

$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare("SELECT user_id from users where email=?");
$res = $stm->execute([$email]);
$resp = $stm->fetchColumn();

if(!$resp){ 
    // nu este utilizat
    $response = "NU";
	echo $response;
}
else{
    $response = "DA";
	echo $response; //este utilizat
}