<?php
include 'connect.php';
include 'functions.php';

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["val"]) && isset($_POST["table"])) {
    $val = $_POST["val"];
    $table = $_POST["table"];
    $id = $table . "_id";
    $sanitizedVal = sanitizeAndTrim($val);

    $length = $table == "subject" ? $subjectLength : $themeLength;




    if (!testLength($sanitizedVal, $length)) {
        $response = ["success" => false, "message" => "$val is too long for $table, max length is $length"];
        header('Content-Type: application/json');
        echo json_encode($response);
        exit();
    }

    $sql = "INSERT INTO $table VALUES (null, ?)";
    $stmt = $conn->prepare($sql);
    try {
        $stmt->execute([$val]);


        // Fetch the maximum ID after the insert
        $sql2 = "SELECT MAX($id) AS max_id FROM $table";
        // echo $sql2;
        // return;
        $stmt2 = $conn->prepare($sql2);
        $stmt2->execute();
        $result = $stmt2->fetch();

        if ($result) {
            $max_id = $result->max_id;
            $response = [
                "success" => true,
                "message" => "$val was added to $table",
                "id" => $max_id
            ];
        } else {
            // Handle the case where the SELECT query didn't return a valid result
            $response = [
                "success" => false,
                "message" => "Failed to retrieve the ID after insertion",
            ];
        }

        header('Content-Type: application/json');
        echo json_encode($response);
    } catch (PDOException $e) {
        // Handle the database error without exposing undefined variables
        $errorMessage = "Database error: " . $e->getMessage();
        $response = ["success" => false, "message" => $errorMessage];
        header('Content-Type: application/json');
        echo json_encode($response);
        exit();
    }
} else {
    $response = ["success" => false, "message" => "Invalid request"];
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>