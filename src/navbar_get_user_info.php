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

$stm = $db->prepare("SELECT users.username, info_users.user_image FROM users INNER JOIN info_users ON users.user_id = info_users.id_user AND users.user_id=?");
$res = $stm->execute([$user_id]);
$results = $stm->fetchAll(PDO::FETCH_ASSOC);

if (empty($results)) {
	http_response_code(404);
	die();
}
$json = json_encode($results);
echo $json;