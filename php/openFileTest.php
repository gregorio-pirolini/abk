<?php
 include 'connect.php';
//  $location = $_POST['location'];
 $location = 'upload/abkuerzungenShortTest.xlsx';
 $myValues = [];
 //functions
 try {
    // Prepare and execute the DELETE queries
    $conn->exec("DELETE FROM definition_subject;");
    $conn->exec("DELETE FROM definition_theme;");
    $conn->exec("DELETE FROM short_name_long_name;");
    $conn->exec("DELETE FROM definition_short_name;");
    $conn->exec("DELETE FROM long_name;");
    $conn->exec("DELETE FROM definition;");
    $conn->exec("DELETE FROM short_name;");
    $conn->exec("DELETE FROM theme;");
    $conn->exec("DELETE FROM subject;");

    echo "DELETE statements executed successfully.";
} catch (PDOException $e) {
    echo "Error executing DELETE statements: " . $e->getMessage();
}
   $myValues = [
    [
        'definition' => 'def1',
        'short name' => 'sn1, sn2',
        'long name' => 'ln1,ln2',
        'theme' => 'theme 1,theme 2',
        'subject' => 'subject 1, subject 2',
        'img' => 'img ',
        'link' => 'link ',
    ],
    [
        'definition' => 'def2',
        'short name' => 'sn3, sn4',
        'long name' => 'ln3,ln4',
        'theme' => 'theme 3,theme 4',
        'subject' => 'subject 3, subject 4',
         'img' => 'img ',
        'link' => 'link ',
    ],
//  Add more entries as needed
];


 
  $statusArray = [];

foreach ($myValues as $value) {
    // Check if the definition already exists in the database
    $definition = $value['definition'];
    $link = $value['link'];
    $img = $value['img'];
    $stmt = $conn->prepare("SELECT definition_id FROM definition WHERE definition_text = ?");
    $stmt->execute([$definition]);
    $definition_id_result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($definition_id_result !== false) {
        // Definition exists, skip inserting it again
        $statusArray[] = ['definition' => $definition, 'status' => 'Skipped (Already Exists)'];
        continue;
    }

    
    // Insert data into Theme
    $themes = array_map('trim', explode(',', $value['theme']));
    foreach ($themes as $theme) {
        // Check if the theme already exists in the database

    $stmt = $conn->prepare("SELECT theme_id FROM theme WHERE theme_name = ?");
    $stmt->execute([$theme]);
    $theme_id_result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($theme_id_result !== false) {
        // Subject exists, fetch the ID
        
    } else {
     
        // Subject does not exist, insert it into the database
      $stmt = $conn->prepare("INSERT INTO theme (theme_name) VALUES (?)");
      $stmt->execute([$theme]);
  }

}
    
    // Insert data into subject
    $subjects = array_map('trim', explode(',', $value['subject']));
    foreach ($subjects as $subject) {
        // Check if the subject already exists in the database

    $stmt = $conn->prepare("SELECT subject_id FROM subject WHERE subject_name = ?");
    $stmt->execute([$subject]);
    $subject_id_result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($subject_id_result !== false) {
        // Subject exists, fetch the ID
        
    } else {
     
        // Subject does not exist, insert it into the database
      $stmt = $conn->prepare("INSERT INTO subject (subject_name) VALUES (?)");
      $stmt->execute([$subject]);
  }

}
    // Insert data into short_name
    $shortNames = array_map('trim', explode(',', $value['short name']));
    foreach ($shortNames as $shortName) {
        $stmt = $conn->prepare("INSERT INTO short_name (short_name_text) VALUES (?)");
        $stmt->execute([$shortName]);
    }

// Insert data into long_name
$longNames = array_map('trim', explode(',', $value['long name']));
foreach ($longNames as $longName) {
    $stmt = $conn->prepare("INSERT INTO long_name (long_name_text) VALUES (?)");
    $stmt->execute([$longName]);
}
    // Insert data into long_name
    // $longName = $value['long name'];
    // $stmt = $conn->prepare("INSERT INTO long_name (long_name_text) VALUES (?)");
    // $stmt->execute([$longName]);
    // $long_name_id = $conn->lastInsertId();

    // Insert data into definition
    $stmt = $conn->prepare("INSERT INTO definition (definition_text,img,link) VALUES (?,?,?)");
    $stmt->execute([$definition,$img,$link]);
    $definition_id = $conn->lastInsertId();

    // Associate the theme, subject, and short names with the definition

    foreach ($themes as $theme) {
        $stmt = $conn->prepare("SELECT theme_id FROM theme WHERE theme_name = ?");
        $stmt->execute([$theme]);
        $theme_name_id_result = $stmt->fetch(PDO::FETCH_ASSOC);

        $theme_id = $theme_name_id_result['theme_id'];

        $stmt = $conn->prepare("INSERT INTO definition_theme (definition_id, theme_id) VALUES (?, ?)");
        $stmt->execute([$definition_id, $theme_id]);
        

    }

    foreach ($subjects as $subject) {
        $stmt = $conn->prepare("SELECT subject_id FROM subject WHERE subject_name = ?");
        $stmt->execute([$subject]);
        $subject_name_id_result = $stmt->fetch(PDO::FETCH_ASSOC);

        $subject_id = $subject_name_id_result['subject_id'];

        $stmt = $conn->prepare("INSERT INTO definition_subject (definition_id, subject_id) VALUES (?, ?)");
        $stmt->execute([$definition_id, $subject_id]);
        

    }

  

    foreach ($shortNames as $shortName) {
        $stmt = $conn->prepare("SELECT short_name_id FROM short_name WHERE short_name_text = ?");
        $stmt->execute([$shortName]);
        $short_name_id_result = $stmt->fetch(PDO::FETCH_ASSOC);

        $short_name_id = $short_name_id_result['short_name_id'];


        foreach ($longNames as $longName) {
            $stmt = $conn->prepare("SELECT long_name_id FROM long_name WHERE long_name_text = ?");
            $stmt->execute([$longName]);
            $long_name_id_result = $stmt->fetch(PDO::FETCH_ASSOC);
    
            $long_name_id = $long_name_id_result['long_name_id'];
        // Associate the long name with the short name
        $stmt = $conn->prepare("INSERT INTO short_name_long_name (short_name_id, long_name_id) VALUES (?, ?)");
        $stmt->execute([$short_name_id, $long_name_id]);
    }
        $stmt = $conn->prepare("INSERT INTO definition_short_name (short_name_id, definition_id) VALUES (?, ?)");
        $stmt->execute([$short_name_id, $definition_id]);

    
    }

    // Entry successfully added
    $statusArray[] = ['definition' => $definition, 'status' => 'Inserted'];
}

// Return the status array as a JSON response
echo json_encode($statusArray);
?>
