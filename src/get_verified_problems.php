<?php
include("authorization_logic.php");

$decoded = getDecodedJWT();

if ($decoded == null) {
	http_response_code(401);
	die();
}

$decoded_array = (array) $decoded;


$response = json_decode(file_get_contents('php://input'), true);

$by_id_or_name = $response["by_id_or_name"];
$by_tags = $response["by_tags"];
$easy = $response["easy"];
$medium = $response["medium"];
$hard = $response["hard"];

$query = "SELECT id, title, tags, difficulty FROM teacher_problems WHERE status = 'VERIFIED'";



if ($easy == 'true' || $medium == 'true' || $hard == 'true') {
	$query .= " AND difficulty IN (";

	$commaFlag = false;

	if ($easy == 'true') {
		$query .= "'EASY'";
		$commaFlag = true;
	}

	if ($medium == 'true') {
		if ($commaFlag) {
			$query .= ",";
		}
		$query .= "'MEDIUM'";
		$commaFlag = true;
	}

	if ($hard == 'true') {
		if ($commaFlag) {
			$query .= ",";
		}
		$query .= "'HARD'";
	}

	$query .= ")";
}



if (!empty($by_tags)) {

	$query .= " AND (";

	foreach ($by_tags as $value) {
		$query .= "LOWER(tags) LIKE LOWER('%" . $value . "%') OR ";
	}

	$query = substr_replace($query, "", -3);

	$query .= ")";
}

if (!empty($by_id_or_name)) {
	$query .= " AND ( LOWER(title) LIKE LOWER('%".$by_id_or_name."%') OR id LIKE LOWER('%".$by_id_or_name."%') )";
}

// echo $query;

$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare($query);
$res = $stm->execute();
$results = $stm->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);

http_response_code(200);

echo $json;