<?php
require 'vendor/autoload.php';

$mongoClient = new MongoDB\Client("mongodb+srv://Aghalya:progLikeFrog@useraccountinfo.ccdikk5.mongodb.net/");
$database = $mongoClient->userAccountInfo;
$collection = $database->users;

$email = $_POST['email'];
$password = $_POST['password'];

// find the user with the email
$user = $collection->findOne([
    'email' => $email
]);

// if the user exists/verify the password
if ($user && password_verify($password, $user['password'])) {
    echo 'Login successful';
} else {
    echo 'Invalid email or password';
}

?>