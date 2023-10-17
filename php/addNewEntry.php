<?php
include 'connect.php';
include 'functions.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data, true); // Convert JSON to a PHP associative array



    $response = ["success" => false, "message" => "Invalid JSON data"];
    header('Content-Type: application/json');
    echo json_encode($response);
    if ($data !== null) {

        $longName = $data["longName"];
        $shortName = $data["shortName"];
        $def = $data["def"];
        $link = $data["def"];
        $themes = $data["themes"];
        $sujects = $data["sujects"];
        $image = $data["image"];

        // $response = ["success" => true, "message" => "Data received and processed."];
        // header('Content-Type: application/json');
        // echo json_encode($response);



    } else {
        // Handle the case where JSON data couldn't be decoded
        $response = ["success" => false, "message" => "Invalid JSON data"];
        header('Content-Type: application/json');
        echo json_encode($response);
    }
} else {
    $response = ["success" => false, "message" => "Invalid request"];
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>