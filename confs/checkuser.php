<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

  require_once 'phpmysqlcon.php';

  $info = json_decode(file_get_contents("php://input"));

  $username = trim($conn->quote($info->data->username),"'");
  $password = trim($conn->quote($info->data->password),"'");

  $query = 'SELECT prenume, nume, username, email FROM utilizatori where username = ? and password = ?';
  $sth = $conn->prepare($query);
  $sth->execute(array($username, $password));

  $result = array();

  while ($row = $sth->fetch(PDO::FETCH_ASSOC)) {
    $result[] = $row;
  }

  echo json_encode($result);

  $sth->closeCursor();

?>
