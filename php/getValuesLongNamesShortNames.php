<?php
include 'connect.php';
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve the values from the POST data
    $dataId = $_POST["dataId"];

    try {
        $query = "SELECT
    d.definition_id, 
    s.short_name_text  AS Short_Names,  s.short_name_id,
    l.long_name_text  AS Long_Names,  l.Long_name_id


   
FROM
    definition d
LEFT JOIN
    definition_short_name ds ON d.definition_id = ds.definition_id
LEFT JOIN
    short_name s ON ds.short_name_id = s.short_name_id
LEFT JOIN
    short_name_long_name sln ON s.short_name_id = sln.short_name_id
LEFT JOIN
    long_name l ON sln.long_name_id = l.long_name_id
LEFT JOIN
    definition_theme dt ON d.definition_id = dt.definition_id

where d.stat>0 and d.definition_id  = $dataId;

 
                    order by Short_Names ASC;
        ";



        $stmt = $conn->prepare($query);
        $stmt->execute();

        // Fetch the results into an associative array
        $myValues = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Convert the array to JSON and output it
        // var_dump($query);
        echo json_encode($myValues);

    } catch (PDOException $e) {
        echo "Error executing query: " . $e->getMessage();
    }
}
?>