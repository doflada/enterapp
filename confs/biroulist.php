<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

  require_once 'phpmysqlcon.php';

  $query = 'SELECT id, numebirou FROM birouri';
  $sth = $conn->prepare($query);
  $sth->execute();

  $result = array();

  while ($row = $sth->fetch(PDO::FETCH_ASSOC)) {
    $result[] = $row;
  }

  echo json_encode($result);

  $sth->closeCursor();

?>
