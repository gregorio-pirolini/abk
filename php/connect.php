<?php
$servername = "localhost";
$username = "root";
$password = "greg2023";
$connname = "abk";

try {
  $conn = new PDO("mysql:host=$servername;dbname=$connname;charset=utf8mb4", $username, $password);
  // Set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  // Optionally, set the default fetch mode to objects for a more consistent result format
  $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
  // Optionally, set the character set for the connection (adjust if necessary)
  $conn->exec("SET NAMES utf8mb4");
  // echo "Connected successfully";
} catch(PDOException $e) {
  // Log the error for your reference (e.g., in a log file or database)
  error_log("Connection failed: " . $e->getMessage());
  // Display a user-friendly error message to the end-users
  echo "Oops! Something went wrong. Please try again later.";
}
?>
 
