<?php
include 'connect.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve the values from the POST data
    $dataId = $_POST["dataId"];
    $text = $_POST["text"];
    $oldText = $_POST["oldText"];
    $row = $_POST["what"];
    $longNamesIds = $_POST["longNamesIds"];
    $shortNamesIds = $_POST["shortNamesIds"];

    if ($row == "longName") {
        $table = "long_name";
        $row = "long_name_text";
        $id = "long_name_id";
        $idtoFind = array_map('intval', explode(", ", $longNamesIds));
    } else {
        $table = "short_name";
        $row = "short_name_text";
        $id = "short_name_id"; // Changed to short_name_id here
        $idtoFind = array_map('intval', explode(", ", $shortNamesIds));
    }
    // Create a comma-separated string of IDs
    $idtoFindString = implode(',', $idtoFind);

    // Update the database with the new text
    $stmt = $conn->prepare("UPDATE $table SET $row = :text WHERE $row = :oldText AND $id IN ($idtoFindString)");
    $stmt->execute(array(":text" => $text, ":oldText" => $oldText));

    // Prepare a response array
    $response = array("message" => $row . " was updated.");

    // Return a JSON response
    header('Content-Type: application/json');
    echo json_encode($response);

} else {
    echo "Invalid request.";
}