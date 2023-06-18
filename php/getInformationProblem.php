<?php
$user_id = $_GET['id'];


$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stm = $db->prepare("SELECT users.username, teacher_problems.post_date, teacher_problems.difficulty, teacher_problems.tags, teacher_problems.description, teacher_problems.status, teacher_problems.title, teacher_problems.status_update_date FROM teacher_problems JOIN users on teacher_problems.id = ? AND users.user_id=teacher_problems.teacher_id");
$res = $stm->execute([$user_id]);
$rows = $stm->fetchAll(PDO::FETCH_NUM); //passwd

if(empty($rows)){
	http_response_code(401);
	return;
}

$user = array(
    'teacher' => $rows[0][0],
    'post_date' => $rows[0][1],
    'difficulty' => $rows[0][2],
    'tags' => $rows[0][3],
    'description' => $rows[0][4],
    'status' => $rows[0][5],
    'title_problem' => $rows[0][6],
    'update_data' => $rows[0][7]
);

header('Content-Type: application/json');
echo json_encode($user);

