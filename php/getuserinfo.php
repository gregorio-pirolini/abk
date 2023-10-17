<?php

session_start();

$data["id"] = $_SESSION["id"];
$data["user"] = $_SESSION["username"];



echo json_encode($data);