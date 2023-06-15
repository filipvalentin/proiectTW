<?php

$user_id = $_GET['id'];

$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare("SELECT user_image from info_users where id_user=?");
$res = $stm->execute([$user_id]);
$resp = $stm->fetchAll(PDO::FETCH_NUM); //TODO 401 trimite unauthorized, de refacut logica

if (empty($resp)) {
    // nu s-a gasit e-mail pentru user
    http_response_code(404);
    // echo "ENF"; //email not found
    return;
} else {
    echo $resp[0][0]; //trimit e-mail-ul
}