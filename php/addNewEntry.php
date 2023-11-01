<?php
$response = ["success" => false, "message" => "An unexpected error occurred."]; // Initialize $response
try {
    if (include_once 'connect.php') {
        if (include_once 'functions.php') {
            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                // Retrieve the values sent from JavaScript
                // Retrieve the JSON data from the request body
                $jsonData = file_get_contents('php://input');

                // Decode the JSON data into a PHP array
                $data = json_decode($jsonData, true);

                if ($data !== null && json_last_error() === JSON_ERROR_NONE) {
                    // Retrieve the JSON data from the request body
                
                    $rowLongName = $data["longName"];
                    $rowShortName = $data["shortName"];
                    $rowDef = $data["def"];
                    $rowLink = $data["link"];
                    $rowThemes = $data["selectedTheme"];
                    $rowSubjects = $data["selectedSubject"];
                    $img = $data["src"];

                    //sanitise and trim
                    $longName=sanitizeAndTrim($rowLongName);
                    $shortName=sanitizeAndTrim($rowShortName);
                    $definition=sanitizeAndTrim($rowDef);
                    $link=sanitizeAndTrim($rowLink);

                    // test length
                    $log = [];
                    //must not be empty array
                    $testNotEmptyThemes=moreThan0Length($rowThemes);
                    $testNotEmptySubjects=moreThan0Length($rowSubjects);

                    //must not be empty string
                    $testNotEmptyLongName = testNotEmpty($longName);
                    $testNotEmptyShortName = testNotEmpty($shortName);

                    //must be less than length referd in functions
                    $testLengthLongName = testLength($longName, $lengthLongName);
                    $testLengthShortName = testLength($shortName, $lengthShortName);
                    $testLengthDef = testLength($definition, $lengthDef);
                    $testLengthLink = testLength($link, $lengthLink);
                    $testLengthImage = testLength($img, $lengthImage);

                    //must not be empty array
                    if(!$testNotEmptyThemes) {
                        $smallLog = [
                            'id' => 'fieldAT',
                            'message' => 'pick one theme at least'
                        ];
                        array_push($log, $smallLog);
                    }
                    if(!$testNotEmptySubjects) {
                        $smallLog = [
                            'id' => 'fieldAS',
                            'message' => 'pick one subject at least'
                        ];
                        array_push($log, $smallLog);
                    }

                    //must not be empty string
                    if(!$testNotEmptyLongName) {
                        $smallLog = [
                            'id' => 'longName',
                            'message' => 'long came name cannot be empty'
                        ];
                        array_push($log, $smallLog);
                    }

                    if(!$testNotEmptyShortName) {
                        $smallLog = [
                            'id' => 'shortName',
                            'message' => 'short name cannot be empty'
                        ];
                        array_push($log, $smallLog);
                    }
                    //must be less than length referd in functions
                    if(!$testLengthLongName) {
                        $smallLog = [
                            'id' => 'longName',
                            'message' => 'long name too long max '. $lengthLongName
                        ];
                        array_push($log, $smallLog);
                    }
                    if(!$testLengthShortName) {
                        $smallLog = [
                            'id' => 'shortName',
                            'message' => 'short name too long max '. $lengthShortName
                        ];
                        array_push($log, $smallLog);
                    }
                    if(!$testLengthDef) {
                        $smallLog = [
                            'id' => 'def',
                            'message' => 'def too long max '. $lengthDef
                        ];
                        array_push($log, $smallLog);
                    }
                    if(!$testLengthLink) {
                        $smallLog = [
                            'id' => 'link',
                            'message' => 'link too long max '. $lengthLink
                        ];
                        array_push($log, $smallLog);
                    }
                    if(!$testLengthImage) {
                        $smallLog = [
                            'id' => 'image',
                            'message' => 'image too long max '. $lengthImage
                        ];
                        array_push($log, $smallLog);
                    }
                    if(count($log)<1) {
                        $conn->beginTransaction(); // Start the transaction
                        

                        // sql code

 // Check if the definition already exists in the database
if (!empty($definition)) {
 $sql = "SELECT definition_id FROM definition WHERE definition_text = ?";
 $stmt = $conn->prepare($sql);
$stmt->bindParam(1, $definition, PDO::PARAM_STR);
 if (!$stmt->execute()) {
     throw new Exception("Error retrieving sql definition_id");
    }
    $message = "was already in database";
    $response = ["success" => true, "message" => $message];
}else{

}



                        $conn->commit();
                        $tmpLog = "Transaction completed successfully";
                        $response = ["success" => true, "message" => $tmpLog];




                    } else {
                        throw new Exception(json_encode($log));
                    }
                } else {
                    throw new Exception("Error decoding JSON data: " . json_last_error_msg());
                }
            } else {
                throw new Exception("No data sent.");
            }
        } else {
            throw new Exception("Error including 'functions.php'");
        }
    } else {
        throw new Exception("Error including 'connect.php'");
    }
} catch (PDOException $e) {
    $conn->rollBack();
    // Handle database-related exceptions
    $errorMessage = "Error 1 PDOException" . $e->getMessage();
    $response = ["success" => false, "message" => $errorMessage];
} catch (Exception $e) {
   
    // Handle the error without exposing undefined variables
    $errorMessage = "Error 2 Exception" . $e->getMessage();
    $response = ["success" => false, "message" => $errorMessage];
}

header('Content-Type: application/json');
echo json_encode($response);
