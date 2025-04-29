<?php
$conn = new mysqli("sqlXXX.infinityfree.com", "epiz_XXXXXX", "password", "epiz_XXXXXX_db");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>