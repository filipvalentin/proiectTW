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

$query = "SELECT u.user_id, u.username, c.id, c.class_name, c.creation_time FROM users u INNER JOIN classes c ON u.user_id = c.teacher_id";

if (!empty($filterByTitleOrId)) {
	$query .= " WHERE LOWER(c.class_name) LIKE LOWER('%" . $filterByTitleOrId . "%') OR c.id LIKE '" . $filterByTitleOrId . "' ";
}

$query .= " LIMIT ?, ?";
// echo $query;
$stm = $db->prepare($query);
$res = $stm->execute([($page - 1) * $itemsOnPage, $itemsOnPage]);
$results = $stm->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);

echo $json;
http_response_code(200);