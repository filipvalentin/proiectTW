<?php

$response = json_decode(file_get_contents('php://input'), true);
// print_r($data);

$password_hash = password_hash($response['password'], PASSWORD_DEFAULT);

$db = new PDO("mysql:host=localhost;dbname=test", 'root', '');
