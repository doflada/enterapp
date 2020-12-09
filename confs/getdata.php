<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

  require_once 'phpmysqlcon.php';

  $sql = 'SELECT prenume, nume, username FROM utilizatori';
  foreach ($conn->query($sql) as $row) {
      print $row['prenume'] . "\t";
      print $row['nume'] . "\t";
      print $row['username'] . "\n";
  }
?>
