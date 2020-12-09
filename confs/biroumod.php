<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

  require_once 'phpmysqlcon.php';

  $info = json_decode(file_get_contents("php://input"));

  $numebirou = trim($conn->quote($info->numeb),"'");
  $idbirou = trim($conn->quote($info->idb),"'");

  if ($numebirou === "STERGE") {
    $idbirou = intval($idbirou);
    $query = "DELETE FROM `birouri` WHERE `birouri`.`id` = ?";
    $sth = $conn->prepare($query);
    $sth->execute([$idbirou]);
    $sth->closeCursor();
  } else {
    if ($idbirou === "NEW") {
      $idbirou = null;
      $query = "INSERT INTO `birouri` (`numebirou`, `id`) VALUES ( ?, ?)";
    } else {
      $idbirou = intval($idbirou);
      $query = "UPDATE `birouri` SET `numebirou` = ? WHERE `birouri`.`id` = ?";
    }
    $sth = $conn->prepare($query);
    $sth->execute([$numebirou, $idbirou]);
    $sth->closeCursor();
  }


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
