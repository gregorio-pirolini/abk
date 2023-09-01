<?php
 include 'connect.php';
 
try {
    $query = "SELECT
        d.definition_text AS Definition, d.img, d.link, d.definition_id, d.stat,
        GROUP_CONCAT(DISTINCT s.short_name_text ORDER BY s.short_name_text SEPARATOR ', ') AS Short_Names,
        GROUP_CONCAT(DISTINCT l.long_name_text ORDER BY l.long_name_text SEPARATOR ', ') AS Long_Names,
        GROUP_CONCAT(DISTINCT t.theme_name ORDER BY t.theme_name SEPARATOR ', ') AS Themes,
        GROUP_CONCAT(DISTINCT sub.subject_name ORDER BY sub.subject_name SEPARATOR ', ') AS Subjects 
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
    LEFT JOIN
        theme t ON dt.theme_id = t.theme_id
    LEFT JOIN
        definition_subject dsu ON d.definition_id = dsu.definition_id
    LEFT JOIN
        subject sub ON dsu.subject_id = sub.subject_id
    where d.stat>0 
    -- and d.img='x'
    GROUP BY
        d.definition_id 
                        -- order by d.img ASC;
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
?>
