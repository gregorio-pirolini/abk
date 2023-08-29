<?php 
include 'connect.php';
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve the values from the POST data
    $dataId = $_POST["dataId"];
    $fileName = $_POST["fileName"];
    
    // You can now use $dataId and $fileName in your script
    // For example, you might want to save them to a database or perform other operations
    
    // Send a response back to the client
  

    $stmt = $conn->prepare("UPDATE definition SET img = ? WHERE definition_id = ?");
    $stmt->execute([$fileName,$dataId ]);
    echo "picture was updated";

} else {
    echo "Invalid request.";
}



?>
