<?php
include("authorization_logic.php");

$decoded = getDecodedJWT();

if ($decoded == null) {
	http_response_code(401);
	die();
}

$decoded_array = (array) $decoded;

$user_id = $decoded_array['sub'];

$page = $_GET['page'];
$filterWords = $_GET['filterWords'];
$filterDifficulty = $_GET['filterDifficulty'];
$filterTags = $_GET['filterTags'];
$filterStartDate = $_GET['filterStartDate'];
$filterEndDate = $_GET['filterEndDate'];
$itemsOnPage = $_GET["itemsOnPage"];


$query = "SELECT * FROM teacher_problems WHERE teacher_id = ?";

if ($filterDifficulty != 'null') {
	$query .= " AND difficulty='" . $filterDifficulty . "'";
}

if ($filterTags != 'null') {

	$query .= " AND (";

	$tags = explode(', ', $filterTags);
	foreach ($tags as $value) {
		$query .= "tags LIKE '%" . $value . "%' OR";
	}

	$query = substr_replace($query, "", -3);

	$query .= ") ";
}

if ($filterWords != "null") {
	$query .= " AND LOWER(title) LIKE LOWER('%" . $filterWords . "%')";
}

if ($filterStartDate != "null") {
	$query .= " AND post_date > '" . $filterStartDate . "'";
}

if ($filterEndDate != "null") {
	$query .= " AND post_date < '" . $filterEndDate . "'";
}

$query .= " LIMIT " . (($page - 1) * $itemsOnPage) . "," . $itemsOnPage;

// echo $query;

$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare($query);
$res = $stm->execute([$user_id]);
$results = $stm->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);


http_response_code(200);

echo $json;