<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

  require_once 'phpmysqlcon.php';

  $info = json_decode(file_get_contents("php://input"));

  $idsal = trim($conn->quote($info->ids),"'");

  $idsal = intval($idsal);

  $query = "SELECT salarii.id, salarii.anul, salarii.luna, salarii.brut, salarii.net FROM salarii \n"

    . "WHERE salarii.idsal = ?";

  $sth = $conn->prepare($query);
  $sth->execute(array($idsal));

  $result = array();

  while ($row = $sth->fetch(PDO::FETCH_ASSOC)) {
    $result[] = $row;
  }

  echo json_encode($result);

  $sth->closeCursor();

?>
