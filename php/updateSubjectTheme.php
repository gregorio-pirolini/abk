<?php
include 'connect.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve the values from the POST data
    $id = $_POST["id"];
    $table = $_POST["table"];
    $checkedValues = $_POST["checkedValues"];
    if ($table == "sub") {
        $table = "definition_subject";
        $row = "subject_id";
    }
    if ($table == "theme") {
        $table = "definition_theme";
        $row = "theme_id";
    }

    // remove all tags or themes from this id
    $stmt = $conn->prepare("DELETE FROM $table WHERE definition_id = :id");
    $stmt->execute(array(":id" => $id));

    // add all new tags or themes to this id
    $allValues = explode(",", $checkedValues);

    foreach ($allValues as $key => $value) {
        $stmt2 = $conn->prepare("INSERT INTO $table (definition_id, $row) VALUES (?, ?)");
        try {
            $stmt2->execute([$id, $value]);
        } catch (PDOException $e) {
            // Handle any database errors here
            echo "Database error: " . $e->getMessage();
            exit();
        }
    }

    // Prepare a response array
    $response = array("message" => $table . " was all reset.");

    // Return a JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    echo "Invalid request.";
}