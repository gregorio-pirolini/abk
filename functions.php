<?php 

function prettytitle($val) {
    $pretty = "";

    switch ($val) {
        case 'abk.php':
            $pretty = "Abkürzungen";
            break;
        case 'index.php':
            $pretty = "Home";
            break;
            case 'todo.php':
                $pretty = "to do...";
                break;
        case 'upload.php':
            $pretty = "Upload";
            break;
        case 'drop1.php':
            $pretty = "drop1";
            break;
        case 'drop2.php':
            $pretty = "drop2";
            break;
        default:
            $pretty = "ERROR!!";
            break;
    }

    return $pretty;
}

?>