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

// $itemsOnPage = $_GET["items_on_page"];
// $page = $_GET["page"];

$filterUsernameId = $_GET["filterUsernameId"];
$filterAccountType = $_GET["filterAccountType"];
$filterCreationDate = $_GET["filterCreationDate"];


$query = "SELECT COUNT(user_id) FROM users WHERE 1";

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


$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

http_response_code(200);

$stm = $db->prepare($query);
$res = $stm->execute();
$resp = $stm->fetchAll(PDO::FETCH_NUM);
echo $resp[0][0];