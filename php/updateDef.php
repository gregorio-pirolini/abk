<?php
include 'connect.php';

// dataid: 489
// text: ""
// what: definition...
// or what "long Name"
// or what "link"
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve the values from the POST data
    $dataId = $_POST["dataId"];
    $text = $_POST["text"];
    $row = $_POST["what"];
    if (($row == "definition") || ($row == "link")) {
        if ($row == "definition") {
            $row = "definition_text";
        }
        // Update the database with the new text
        $stmt = $conn->prepare("UPDATE definition SET $row = :text WHERE definition_id = :dataId");
        $stmt->execute(array(":text" => $text, ":dataId" => $dataId));

        // Prepare a response array
        $response = array("message" => $row . " was updated.");

        // Return a JSON response
        header('Content-Type: application/json');
        echo json_encode($response);

    } else {
        echo "Invalid request.";
    }
}