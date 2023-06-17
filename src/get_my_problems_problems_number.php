<?php
include("authorization_logic.php");

$decoded = getDecodedJWT();

if($decoded == null){
	http_response_code(401);
	die();
}

$decoded_array = (array) $decoded;

$user_id = $decoded_array['sub'];

$filterWords = $_GET['filterWords'];
$filterDifficulty = $_GET['filterDifficulty'];
$filterTags =$_GET['filterTags'];
$filterStartDate =$_GET['filterStartDate'];
$filterEndDate = $_GET['filterEndDate'];


$query = "SELECT COUNT(id) FROM teacher_problems WHERE teacher_id = ?";

if($filterDifficulty != 'null'){
	$query .= " AND difficulty='".$filterDifficulty."'";
}

if($filterTags != 'null'){

	$query .= " AND (";

	$tags = explode(', ', $filterTags);
	foreach ($tags as $value) {
		$query .= "tags LIKE '%".$value."%' OR";
	}

	$query = substr_replace($query ,"", -3);

	$query .= ") ";


}


$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare($query);
$stm->execute([$user_id]);

http_response_code(200);

echo $stm->fetchColumn();