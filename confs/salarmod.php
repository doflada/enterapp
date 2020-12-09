<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

  require_once 'phpmysqlcon.php';

  $info = json_decode(file_get_contents("php://input"));

  $id = trim($conn->quote($info->id),"'");
  $ids = trim($conn->quote($info->ids),"'");
  $ids = intval($ids);
  $anul = trim($conn->quote($info->anul),"'");
  $anul = intval($anul);
  $luna = trim($conn->quote($info->luna),"'");
  $luna = intval($luna);
  $brut = trim($conn->quote($info->brut),"'");
  $brut = floatval($brut);
  $net = trim($conn->quote($info->net),"'");
  $net = floatval($net);

    if ($id === "NEW") {
      $id = null;
      $query = "INSERT INTO `salarii` (`idsal`, `anul`, `luna`, `brut`, `net`, `id`) VALUES ( ?, ?, ?, ?, ?, ?)";
    } else {
      $id = intval($id);
      $query = "UPDATE `salarii`
        SET `idsal` = ?, `anul` = ?, `luna` = ?, `brut` = ?, `net` = ?
        WHERE `salarii`.`id` = ?";
    }
    $sth = $conn->prepare($query);
    $sth->execute([$ids, $anul, $luna, $brut, $net, $id]);
    $sth->closeCursor();

    $query = "SELECT salarii.id, salarii.anul, salarii.luna, salarii.brut, salarii.net FROM salarii \n"

      . "WHERE salarii.idsal = ?";

    $sth = $conn->prepare($query);
    $sth->execute(array($ids));

    $result = array();

    while ($row = $sth->fetch(PDO::FETCH_ASSOC)) {
      $result[] = $row;
    }

    echo json_encode($result);

    $sth->closeCursor();

?>
