<?php
    include 'mySQL.php';
    $val = login('matt', 'wakaFlocka') ? 'true' : 'false';
    echo "<p>val: ".$val."</p>";
    $val = register('matte', 'wrong') ? 'true' : 'false';
    echo "<p>val: ".$val."</p>";
?>
