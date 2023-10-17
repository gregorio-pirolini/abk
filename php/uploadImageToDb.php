<?php
include 'connect.php';
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES["image"])) {
    $uploadDirectory = "../img/"; // Specify the directory where you want to store uploaded images
    $uploadedFile = $_FILES["image"];

    // Check for errors during upload
    if ($uploadedFile["error"] === UPLOAD_ERR_OK) {
        // Check if the uploaded file is an image
        $imageInfo = getimagesize($uploadedFile["tmp_name"]);

        if ($imageInfo !== false) {
            $fileExtension = pathinfo($uploadedFile["name"], PATHINFO_EXTENSION);
            $filenameWithoutExtension = pathinfo($uploadedFile["name"], PATHINFO_FILENAME);
            $uniqueFileName = $filenameWithoutExtension . '_' . time() . '.' . $fileExtension;
            $destinationPath = $uploadDirectory . $uniqueFileName;

            if (move_uploaded_file($uploadedFile["tmp_name"], $destinationPath)) {
                echo json_encode([
                    "success" => true,
                    "message" => "Image uploaded successfully.",
                    "path" => substr($destinationPath, 3)
                ]);
            } else {
                echo json_encode(["success" => false, "message" => "Failed to move uploaded file."]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "File is not an image."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Upload error: " . $uploadedFile["error"]]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
}
?>