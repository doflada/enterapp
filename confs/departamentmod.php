<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

  require_once 'phpmysqlcon.php';

  $info = json_decode(file_get_contents("php://input"));

  $numedepartament = trim($conn->quote($info->numed),"'");
  $iddepartament = trim($conn->quote($info->idd),"'");
  $birouriasociate = $info->birouriasociate;

  if ($numedepartament === "STERGE") {
    $iddepartament = intval($iddepartament);
    $query = "DELETE FROM `departamente` WHERE `departamente`.`id` = ?";
    $sth = $conn->prepare($query);
    $sth->execute([$iddepartament]);
    $sth->closeCursor();
  } else {
    if ($iddepartament === "NEW") {
      $iddepartament = null;
      $query = "INSERT INTO `departamente` (`numedepartament`, `id`) VALUES ( ?, ?)";
      $sth = $conn->prepare($query);
      $sth->execute([$numedepartament, $iddepartament]);
      $iddepartament = $conn->lastInsertId();
      $sth->closeCursor();
    } else {
      $iddepartament = intval($iddepartament);
      $query = "UPDATE `departamente` SET `numedepartament` = ? WHERE `departamente`.`id` = ?";
      $sth = $conn->prepare($query);
      $sth->execute([$numedepartament, $iddepartament]);
      $sth->closeCursor();
    }

    $query = "DELETE FROM `birouofdepartamente` WHERE `birouofdepartamente`.`iddep` = ?";
    $sth = $conn->prepare($query);
    $sth->execute([$iddepartament]);
    $sth->closeCursor();

    $DataArr = array();

    if ( count($birouriasociate) > 0 ) {
      foreach($birouriasociate as $value) {
          $fieldVal1 = $iddepartament;
          $fieldVal2 = $value;

          $DataArr[] = "('$fieldVal1', '$fieldVal2')";
      }

      $query = "INSERT INTO `birouofdepartamente` (`iddep`, `idbir`) VALUES ";
      $query .= implode(',', $DataArr);
      $sth = $conn->prepare($query);
      $sth->execute();
      $sth->closeCursor();
    }

  }


  $query = 'SELECT id, numedepartament FROM departamente';
  $sth = $conn->prepare($query);
  $sth->execute();

  $result = array();

  while ($row = $sth->fetch(PDO::FETCH_ASSOC)) {
    $result[] = $row;
  }

  echo json_encode($result);

  $sth->closeCursor();

?>
