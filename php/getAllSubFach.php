<?php
include 'connect.php';
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve the values from the POST data
    $subFach = $_POST["subFach"];
    $name = $subFach . '_name';
    try {
        $query = "SELECT * FROM `$subFach` order by $name";
        $statement = $conn->query($query);
        $allSubFach = $statement->fetchAll(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');
        echo json_encode($allSubFach);
    } catch (PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }
}
?>