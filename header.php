<?php
$currentURL = $_SERVER['REQUEST_URI'];
$filename = basename($currentURL);

// if isyt not login redirect to login
$userId = 0;
 if($filename !="login.php"){
  session_start();
  
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}
 $userId = $_SESSION['id'];
 
}
?><!DOCTYPE html> 
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

   
    <!-- favicon -->
    <?php include 'favicons.php'; ?>
    <?php include 'functions.php'; ?>
    <!-- css -->
    <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
    crossorigin="anonymous"
  />
  <?php
    $random = time() ;
    echo
    "<script src='js/script.js?v=1.".$random."' defer></script>
    <link rel='stylesheet' href='sass/style.css?v=1.".$random."' />
    ";
    ?>
    
   
 
    <title>
      
   <?php  echo prettytitle($filename) ?>
    </title>
  </head>
  <body>
    <div class="container">
          <!-- nav -->
    <?php include 'nav.php'; ?>