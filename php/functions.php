<?php

$random = time();


$themeLength = 100;
$subjectLength = 100;
$lengthLongName =  255;
$lengthShortName = 100 ;
$lengthDef = 60000;
$lengthLink = 500;
$lengthImage = 100;

function sanitizeAndTrim($val)
{
    $val = trim($val);
    return htmlspecialchars($val, ENT_QUOTES, 'UTF-8');
}
// Check if the string is not empty
function testNotEmpty($val)
{
    
    if (empty($val)) {
        return false;
    }
    return true;
}
// Check if the array is not empty
function moreThan0Length($arr)
{

    $answer = false  ;
    if(count($arr)>0) {
        $answer = true ;
    }
    return $answer;
}

function testLength($val, $length)
{
    if (strlen($val) > $length) {
        return false;
    }
    return true;
}

function prettytitle($val, $random)
{
    $result = [
        'pretty' => '',
        'script' => ''
    ];
    $start = 0;
    $questionPos = strpos($val, "?");

    if ($questionPos !== false) {
        $valShort = substr($val, $start, $questionPos);
    } else {
        $valShort = $val;
    }


    switch ($valShort) {
        case 'abk.php':
            $result['pretty'] = "Abkürzungen";
            $result['script'] = "<script src='js/script_abk.js?v=1." . $random . "' defer></script>";
            break;
        case 'index.php':
            $result['pretty'] = "Home";
            $result['script'] = "";
            break;
        case 'todo.php':
            $result['pretty'] = "to do...";
            $result['script'] = "";
            break;
        case 'upload.php':
            $result['pretty'] = "Upload";
            $result['script'] = "<script src='js/script_upload.js?v=1." . $random . "' defer></script>";
            break;
        case 'drop1.php':
            $result['pretty'] = "drop1";
            $result['script'] = "";
            break;
        case 'drop2.php':
            $result['pretty'] = "drop2";
            $result['script'] = "";
            break;
        case 'new.php':
            $result['pretty'] = "New";
            $result['script'] = "<script src='js/script_new.js?v=1." . $random . "' defer></script>";
            break;
        case 'test.php':
            $result['pretty'] = "Test";
            $result['script'] = "<script src='js/script_test.js?v=1." . $random . "' defer></script>";
            break;
        case 'login.php':
            $result['pretty'] = "Log in";
            $result['script'] = "";
            break;
        default:
            $result['pretty'] = "ERROR!!";
            $result['script'] = "ERROR!!";
            break;
    }


    return $result;
}
