<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

  require_once 'phpmysqlcon.php';

  $info = json_decode(file_get_contents("php://input"));

  $username = trim($conn->quote($info->data->username),"'");

  $query = 'SELECT prenume, nume, username, email FROM utilizatori where username = ?';
  $sth = $conn->prepare($query);
  $sth->execute(array($username));

  $result = array();

  while ($row = $sth->fetch(PDO::FETCH_ASSOC)) {
    $result[] = $row;
  }

  echo json_encode($result);

  $sth->closeCursor();

?>
