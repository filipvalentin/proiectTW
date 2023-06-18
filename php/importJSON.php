<?php

include("authorization_logic.php");

$decoded = getDecodedJWT();

if ($decoded == null) {
    http_response_code(401);
    die();
}

$decoded_array = (array) $decoded;

$user_id = $decoded_array['sub'];

$response = json_decode(file_get_contents('php://input'), true);

$description = $response['description'];
$title = $response['title'];
$difficulty = $response['difficulty'];
$tags = $response['tags'];


if ($description == '' || $title == '' || $difficulty == '' || $tags == '') {
    http_response_code(404);
    return;
} else {
    $db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
    $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stm = $db->prepare("INSERT INTO teacher_problems (description, tags, status, teacher_id, difficulty, post_date, title) values (?, ?, 'PENDING', ?, ?, NOW(), ?)");
    $stm->bindValue(1, $description);
    $stm->bindValue(2, $tags);
    $stm->bindValue(3, $user_id);
    $stm->bindValue(4, $difficulty);
    $stm->bindValue(5, $title);

    $res = $stm->execute();

    http_response_code(200);
}