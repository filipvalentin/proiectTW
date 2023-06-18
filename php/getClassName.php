<?php
$class_id = $_GET['id'];


$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare("SELECT class_name from classes where id = ?");
$res = $stm->execute([$class_id]);
$rows = $stm->fetchAll(PDO::FETCH_NUM);

if(empty($rows)){
	http_response_code(404);
	die();
}
echo $rows[0][0];