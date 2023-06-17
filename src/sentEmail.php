<?php

require_once(__DIR__ . '/../vendor/autoload.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;



$response = json_decode(file_get_contents('php://input'), true);

$email_user = $response['email'];

$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare("SELECT user_id FROM users where email = ?");
$res = $stm->execute([$email_user]);
$rows = $stm->fetchAll(PDO::FETCH_NUM); //passwd

if (empty($rows)) { // nu s-a gasit emailul
    http_response_code(404);
    // echo "ENF"; //email not found
    return;
} else {
    echo $rows[0][0];
}