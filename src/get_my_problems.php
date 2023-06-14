<?php
include("authorization_logic.php");

$decoded = getDecodedJWT();

if($decoded == null){
	http_response_code(401);
	die();
}

$decoded_array = (array) $decoded;

$user_id = $decoded_array['sub'];

$page = $_GET['page'];
$filterWords = $_GET['filterWords'];
$filerDifficulty = $_GET['filerDifficulty'];
$filterTags =$_GET['filterTags'];
$filterStartDate =$_GET['filterStartDate'];
$filterEndDate = $_GET['filterEndDate'];



$query = "SELECT * FROM teacher_problems WHERE teacher_id = ? ";

if($filerDifficulty != 'null'){
	$query .= " AND difficulty=".$filerDifficulty;
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


$query .= "LIMIT ".(($page - 1) * 5).", 5";



// echo $query;

$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare($query);
$res = $stm->execute([$user_id]);
// $rows = $stm->fetchAll(PDO::FETCH_NUM);
$results = $stm->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);


http_response_code(200);

echo $json;
// $json = "[";

// foreach ($rows as $row) {
// 	$json .= ""
// }

// $array = array();
// while($row = mysqli_fetch_assoc($result)){
//     $array[] = $row;
// }