<?php
$user_id = $_GET['id'];


$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare("SELECT users.username, users.email, users.role, info_users.entire_name, info_users.gender, info_users.high_school, info_users.about_me, users.user_id FROM users JOIN info_users on users.user_id = ? AND users.user_id=info_users.id_user");
$res = $stm->execute([$user_id]);
$rows = $stm->fetchAll(PDO::FETCH_NUM); //passwd

if(empty($rows)){ // nu s-a gasit emailul
	http_response_code(401);
	// echo "ENF"; //email not found
	return;
}

$user = array(
	'user_id' => $rows[0][7],
    'username' => $rows[0][0],
    'email' => $rows[0][1],
    'role' => $rows[0][2],
    'entire_name' => $rows[0][3],
    'gender' => $rows[0][4],
    'high_school' => $rows[0][5],
    'about_me' => $rows[0][6],
);

header('Content-Type: application/json');
echo json_encode($user);

