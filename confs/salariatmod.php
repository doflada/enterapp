<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

  require_once 'phpmysqlcon.php';

  $info = json_decode(file_get_contents("php://input"));

  $ids = trim($conn->quote($info->ids),"'");
  $numes = trim($conn->quote($info->numes),"'");
  $prens = trim($conn->quote($info->prens),"'");
  $emails = trim($conn->quote($info->emails),"'");

  $datas = trim($conn->quote($info->datas),"'");
    if ($datas === "") {
      $datas = null;
    } else {
      $datas = date("Y-m-d", strtotime($datas));
    }

 $iddeps = trim($conn->quote($info->iddeps),"'");
    if ($iddeps === "") {
      $iddeps = null;
    }
  $idbirs = trim($conn->quote($info->idbirs),"'");
    if ($idbirs === "") {
      $idbirs = null;
    }
  $mans = $info->mans;


  if ( ($ids != "") && ($numes != "") && ($prens != "") && ($emails != "") ) {
      if ($numes === "STERGE") {
        $ids = intval($ids);
        $query = "DELETE FROM `salariati` WHERE `salariati`.`id` = ?";
        $sth = $conn->prepare($query);
        $sth->execute([$ids]);
        $sth->closeCursor();
      } else {
        if ($ids === "NEW") {
          $ids = null;
          $query = "INSERT INTO `salariati`
              (`nume`, `prenume`, `email`, `datanasterii`, `iddep`, `idbir`, `isman`, `id`)
              VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)";
        } else {
          $ids = intval($ids);
          $query = "UPDATE `salariati`
              SET `nume` = ?, `prenume` = ?, `email` = ?, `datanasterii` = ?, `iddep` = ?, `idbir` = ?, `isman` = ?
              WHERE `salariati`.`id` = ?";
        }
        $sth = $conn->prepare($query);
        $sth->execute([$numes, $prens, $emails, $datas, $iddeps, $idbirs, $mans, $ids]);
        $sth->closeCursor();
      }
  }

  $query = 'SELECT * FROM salariati';
  $sth = $conn->prepare($query);
  $sth->execute();

  $result = array();

  while ($row = $sth->fetch(PDO::FETCH_ASSOC)) {
    $result[] = $row;
  }

  echo json_encode($result);

  $sth->closeCursor();

?>
