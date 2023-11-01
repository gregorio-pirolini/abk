<?php
$errorInfo=null;
$response = ["success" => false, "message" => "An unexpected error occurred."]; // Initialize $response
try {
    if (include_once 'connect.php') {
        if (include_once 'functions.php') {

          if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["val"]) && isset($_POST["table"])) {
  $rawVal = $_POST["val"];
$rawTable = $_POST["table"];
$table = sanitizeAndTrim($rawTable);
$id = $table . "_id";
$name = $table . "_name";
$val = sanitizeAndTrim($rawVal);

            $length = $table == "subject" ? $subjectLength : $themeLength;




            if (!testLength($val, $length)) {
                throw new Exception( "$val is too long");
            }


            //     // sql part?
                $conn->beginTransaction(); // Start the transaction
                // todo is it in table already?
                $sql = "SELECT  $id FROM $table WHERE $name = :val";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':val', $val, PDO::PARAM_STR);
                if (!$stmt->execute()) {
                    $errorInfo = $stmt->errorInfo();
                    throw new Exception("Error sql retrieving $val in $table " . $errorInfo[2]);
                }

                if ($stmt->rowCount() > 0) {
                    // At least one entry exists that matches the condition
                    $result = $stmt->fetch();
                    if (!$result) {
                        $errorInfo = $stmt->errorInfo();
                        throw new Exception("no result after finding value " . $errorInfo[2]);
                    }
                    $foundId = $result->$id;
                        $response = ["success" => true, "message" => $val .' already in db', "id" => $foundId ]; 
                 
                    

                } else { // no entry exists that matches the condition

                    $sql = "INSERT INTO $table VALUES (null, :val)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':val', $val, PDO::PARAM_STR);
                    if (!$stmt->execute()) {
                        $errorInfo = $stmt->errorInfo();
                        throw new Exception("Error inserting $val in $table " . $errorInfo[2]);
                    }
                    $sql2 = "SELECT MAX($id) AS max_id FROM $table";
                    $stmt = $conn->prepare($sql2);
                    if (!$stmt->execute()) {
                        $errorInfo = $stmt->errorInfo();
                        throw new Exception("cannot retrieve id " . $errorInfo[2]);

                    }

                    $result = $stmt->fetch();
                    if (!$result) {
                        $errorInfo = $stmt->errorInfo();
                        throw new Exception("no result after insertin " . $errorInfo[2]);
                    }
                        $max_id = $result->max_id;
                        $response = ["success" => true, "message" => $val .' added to db', "id" => $max_id]; 
                  }
              } else {
                
                throw new Exception("No values sent. ");
             }
        } else {
           
            throw new Exception("including 'functions.php' " . $errorInfo[2]);
        }
    } else {
        
        throw new Exception("including 'connect.php' " . $errorInfo[2]);
    }

} catch (Exception $e) {
    // Handle the error without exposing undefined variables
    $errorMessage = "Error " . $e->getMessage();
    if ($errorInfo !== null) {
        $errorMessage .= " SQL Error: " . $errorInfo[2];
    }
    $response = ["success" => false, "message" => $errorMessage];
} //try

header('Content-Type: application/json');
echo json_encode($response);
