<?php 
include 'connect.php';
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve the values from the POST data
    $dataId = $_POST["dataId"];
    $text = $_POST["text"];
    
    // Update the database with the new text
    $stmt = $conn->prepare("UPDATE definition SET definition_text = :text WHERE definition_id = :dataId");
    $stmt->execute(array(":text" => $text, ":dataId" => $dataId));
    
    // Prepare a response array
    $response = array("message" => "Definition was updated.");
   
    // Return a JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    echo "Invalid request.";
}
?>


