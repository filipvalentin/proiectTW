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

$username=$response['username'];
$entire_name=$response['entire_name'];
$birthday=$response['birthday'];
$highschool=$response['highschool'];
$gender=$response['gender'];
$aboutMe=$response['aboutMe'];
$displayGender=$response['displayGender'];
$displayBirthday=$response['displayBirthday'];
$displayHighSchool=$response['displayHighschool'];


$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare("UPDATE users SET username = ? WHERE user_id = ?");
$stm->bindValue(1, $username);
$stm->bindValue(2, $user_id);

$res = $stm->execute();

$stm = $db->prepare("UPDATE info_users SET entire_name = ?, gender = ?, birth_date = ?, high_school = ?, about_me = ?, display_birthdate = ?, display_highschool = ?, display_gender = ? WHERE id_user = ?");
$stm->bindValue(1, $entire_name);
$stm->bindValue(2, $gender);
$stm->bindValue(3, $birthday);
$stm->bindValue(4, $highschool);
$stm->bindValue(5, $aboutMe);
$stm->bindValue(6, $displayBirthday);
$stm->bindValue(7, $displayHighSchool);
$stm->bindValue(8, $displayGender);
$stm->bindValue(9, $user_id);

$res = $stm->execute();

http_response_code(200);
