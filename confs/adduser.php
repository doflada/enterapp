<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

  require_once 'phpmysqlcon.php';

  $info = json_decode(file_get_contents("php://input"));
  $infoarray = json_decode(file_get_contents("php://input"), true);

  $usern = trim($conn->quote($info->data->username),"'");
  $passw = trim($conn->quote($info->data->password),"'");

  if(count($infoarray["data"]) === 5) {

    $prenume = trim($conn->quote($info->data->prenume),"'");
    $nume = trim($conn->quote($info->data->nume),"'");
    $email = trim($conn->quote($info->data->email),"'");
    $username = trim($conn->quote($info->data->username),"'");
    $password = trim($conn->quote($info->data->password),"'");

    $query = "INSERT INTO utilizatori(prenume, nume, email, username, password)
                    VALUES (?, ?, ?, ?, ?)";

    $sth = $conn->prepare($query);
    $sth->execute([$prenume, $nume, $email, $username, $password]);
    $sth->closeCursor();

  }

  $query = 'SELECT prenume, nume, username, email FROM utilizatori where username = ? and password = ?';
  $sth = $conn->prepare($query);
  $sth->execute(array($usern, $passw));

  $result = array();

  while ($row = $sth->fetch(PDO::FETCH_ASSOC)) {
    $result[] = $row;
  }

  echo json_encode($result);

  $sth->closeCursor();

?>
