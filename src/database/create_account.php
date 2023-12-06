<?php
require 'vendor/autoload.php';

$mongoClient = new MongoDB\Client("mongodb+srv://Aghalya:progLikeFrog@useraccountinfo.ccdikk5.mongodb.net/");
$database = $mongoClient->userAccountInfo;
$collection = $database->users;

// get the data from the form
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$password = $_POST['password'], PASSWORD_BCRYPT;

// insert data into the database
$insertResult = $collection->insertOne([
    'firstName' => $firstName,
    'lastName' => $lastName,
    'email' => $email,
    'password' => $password
]);

if ($insertResult->getInsertedCount() > 0) {
    echo 'Account created successfully';
} else {
    echo 'Error creating account';
}
?>