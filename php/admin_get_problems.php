<?php
include("authorization_logic.php");

$decoded = getDecodedJWT();

if ($decoded == null) {
	http_response_code(401);
	die();
}

$decoded_array = (array) $decoded;

$user_id = $decoded_array["sub"];
$user_role = $decoded_array["role"];

if ($user_role != "admin") {
	http_response_code(401);
	die();
}

$itemsOnPage = $_GET["items_on_page"];
$page = $_GET["page"];

$filterByTitleOrId = $_GET["filter_by_title_or_id"];

$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

http_response_code(200);

$query = "SELECT u.user_id, u.username, tp.id, tp.status, tp.post_date, tp.title FROM teacher_problems tp INNER JOIN users u ON tp.teacher_id=u.user_id AND tp.status = 'PENDING'";

if(!empty($filterByTitleOrId)){
	$query .= "WHERE LOWER(title) LIKE LOWER('%".$filterByTitleOrId."%') OR id LIKE '".$filterByTitleOrId."' ";
}

$query .= "LIMIT ?, ?";

$stm = $db->prepare($query);
$res = $stm->execute([($page - 1) * $itemsOnPage, $itemsOnPage]);
$results = $stm->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);

echo $json;
http_response_code(200);