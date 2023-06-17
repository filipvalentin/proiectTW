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

$filterUsernameId = $_GET["filterUsernameId"];
$filterAccountType = $_GET["filterAccountType"];
$filterCreationDate = $_GET["filterCreationDate"];


$query = "SELECT user_id, username, role FROM users WHERE 1";

if (!empty($filterUsernameId)) {
	$whereFlag = true;
	$andFlag = true;
	$query .= " AND (LOWER(username) LIKE LOWER('%" . $filterUsernameId . "%') OR user_id LIKE '" . $filterUsernameId . "')";
}

if (!empty($filterAccountType)) {
	$query .= " AND role = '" . $filterAccountType . "'";
}

if (!empty($filterCreationDate)) {
	$query .= " AND creation_date LIKE '%" . $filterCreationDate . "%'";
}

$query .= " LIMIT " . (($page - 1) * $itemsOnPage) . "," . $itemsOnPage;

// echo $query;
$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


$stm = $db->prepare($query);
$res = $stm->execute();
$results = $stm->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);

echo $json;
http_response_code(200);