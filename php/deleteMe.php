<?php 
include 'connect.php';
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve the values from the POST data
    $dataId = $_POST["dataId"];

    // Update the database
    $stmt = $conn->prepare("UPDATE definition SET stat = ? WHERE definition_id = ?");
    $stmt->execute([0, $dataId]);

    // Prepare a response array
    $response = array("message" => "Entry deleted successfully.");

    // Return a JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    echo "Invalid request.";
}


?>
