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
    $id_user = $rows[0][0];
    $link = "<a href='http://localhost/proiectTW/resetPassword.hmtl?id=" . $id_user . "'>Click To Reset password</a>";

    try {
        $mail = new PHPMailer(true);
        $mail->CharSet = "UTF-8";
        $mail->isSMTP();
        $mail->SMTPAuth = true;
        $mail->Host = "smtp.gmail.com";
        $mail->Port = 465;
        $mail->SMTPSecure = "ssl";
        $mail->Username = "informatixproject@gmail.com";
        $mail->Password = "TWproject";
        $mail->From = "informatixproject@gmail.com";
        $mail->FromName = "InformatiX";
        $mail->addAddress($email_user);
        $mail->Subject = 'Reset Password';
        $mail->isHTML(true);
        $mail->Body = 'Click On This Link to Reset Password ' . $link . '';
        $mail->send();
        echo "Check Your Email and Click on the link sent to your email";
    } catch (Exception $e) {
        echo "Mail Error -> " . $mail->ErrorInfo;
    }
}