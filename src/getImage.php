<?php
include("authorization_logic.php");

$decoded = getDecodedJWT();

if ($decoded == null) {
    http_response_code(401);
    die();
}

$decoded_array = (array) $decoded;

$user_id = $decoded_array['sub'];

$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare("SELECT user_image from info_users where id_user=?");
$res = $stm->execute([$user_id]);
$resp = $stm->fetchAll(PDO::FETCH_NUM);

if (empty($resp)) {
    // nu s-a gasit e-mail pentru user
    http_response_code(401);
    // echo "ENF"; //email not found
    return;
} else {
    echo $resp[0][0]; //trimit e-mail-ul
}