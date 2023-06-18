<?php

$response = json_decode(file_get_contents('php://input'), true);

$email = $response['email'];
$password_hash = password_hash($response['password'], PASSWORD_DEFAULT);


