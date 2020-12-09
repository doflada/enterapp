<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

  require_once 'phpmysqlcon.php';

  $info = json_decode(file_get_contents("php://input"));

  $iddep = trim($conn->quote($info->idd),"'");

  $iddep = intval($iddep);

  $query = "SELECT birouri.id, birouri.numebirou FROM birouri \n"

    . "LEFT JOIN birouofdepartamente ON birouri.id = birouofdepartamente.idbir\n"

    . "WHERE birouofdepartamente.iddep = ?";

  $sth = $conn->prepare($query);
  $sth->execute(array($iddep));

  $result = array();

  while ($row = $sth->fetch(PDO::FETCH_ASSOC)) {
    $result[] = $row;
  }

  echo json_encode($result);

  $sth->closeCursor();

?>
