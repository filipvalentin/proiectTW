<?php

$db = new PDO("mysql:host=localhost;dbname=project", 'root', '');
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$username = $_GET['username'];

$result = $db->prepare('SELECT COUNT(username) FROM users WHERE username = :username' );
$result->execute([$username]);

echo $result->fetchColumn();