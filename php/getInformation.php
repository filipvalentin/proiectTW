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

$stm = $db->prepare("SELECT users.username, users.email, users.creation_date, info_users.entire_name, info_users.gender, info_users.high_school, info_users.birth_date, info_users.about_me, info_users.display_birthdate, info_users.display_gender, info_users.display_highschool FROM users JOIN info_users on users.user_id = ? AND users.user_id=info_users.id_user");
$res = $stm->execute([$user_id]);
$rows = $stm->fetchAll(PDO::FETCH_NUM); //passwd

if(empty($rows)){ // nu s-a gasit emailul
	http_response_code(401);
	// echo "ENF"; //email not found
	return;
}

$birth = strtotime($rows[0][6]);
$enter = strtotime($rows[0][2]);


$user = array(
    'username' => $rows[0][0],
    'email' => $rows[0][1],
    'creation_date' => date("d F Y", $enter),
    'entire_name' => $rows[0][3],
    'gender' => $rows[0][4],
    'high_school' => $rows[0][5],
    'birth_date' => date("d F Y", $birth),
    'about_me' => $rows[0][7],
    'display_birthdate' => $rows[0][8],
    'display_gender' => $rows[0][9],
    'display_highschool' => $rows[0][10],
    'unformat_b_d' =>$rows[0][6]
);

header('Content-Type: application/json');
echo json_encode($user);

