<?php
include 'connect.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve the values from the POST data
    $dataId = $_POST["dataId"];
    $oldText = $_POST["oldText"];
    $row = $_POST["what"];
    $longNamesIds = $_POST["longNamesIds"];
    $shortNamesIds = $_POST["shortNamesIds"];

    if ($row == "longName") {
        $table = "long_name";
        $row = "long_name_text";
        $id = "long_name_id";
        $idtoFind = array_map('intval', explode("; ", $longNamesIds));
        $idtoFindShort = array_map('intval', explode("; ", $shortNamesIds));
    } else {
        $table = "short_name";
        $row = "short_name_text";
        $id = "short_name_id"; // Changed to short_name_id here
        $idtoFind = array_map('intval', explode("; ", $shortNamesIds));
    }
    $idtoFindString = implode(',', $idtoFind);
    $idtoFindShortString = implode(',', $idtoFindShort);
    // find the id

    // Prepare a SQL query to retrieve the IDs
    $sqlid = "SELECT $id FROM $table WHERE $row = :oldText AND $id IN ($idtoFindString)";

    $stmtid = $conn->prepare($sqlid);
    $stmtid->bindParam(':oldText', $oldText, PDO::PARAM_STR);
    // No need to bind :idtoFindString because it's a part of the SQL query directly
    $stmtid->execute();

    // Fetch the IDs into an array
    $foundIds = $stmtid->fetchAll(PDO::FETCH_COLUMN);

    // You can now use $foundIds to access the IDs that match your criteria
    // For example, you can loop through $foundIds to perform further operations
    $myId = "";
    foreach ($foundIds as $foundId) {
        // Do something with $foundId
        $myId = $foundId;

    }

    $sqlDelete1 = "delete from short_name_long_name where $id = :myId AND short_name_id IN ($idtoFindShortString)";
    $stmtDelete1 = $conn->prepare($sqlDelete1);
    $stmtDelete1->bindParam(':myId', $myId, PDO::PARAM_INT);
    // No need to bind :idtoFindString because it's a part of the SQL query directly
    $stmtDelete1->execute();



    // Prepare a response array
    $response = array("message" => $row . " was updated.");

    // Return a JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
    // remove from long name where id is 
// remove from short name long name where long name id = id
}