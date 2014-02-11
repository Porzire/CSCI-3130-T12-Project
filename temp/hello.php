<?php
    // Get Variables
    $dbusername = "geofit";
    $dbpass = "charizard";
    $dbhost = "localhost";
    $dbname = "geofit";

    // Build connection with database.
    $connection = mysql_connect($dbhost, $dbusername, $dbpass);
    if (!$connection) {
        die('Could not connect: ' . mysql_error());
    }
    // Select a MySQL database.
    $dbcheck = mysql_select_db($dbname);
    if (!$dbcheck) {
        die(mysql_error());
    }

    echo "<p>Connected to the database!<p>";

    // Example: get password based on the given username
    $username = "Matte";
    echo "<pre>SELECT password FROM login where username='".$username."'</pre>";
    $result = mysql_query(
            "SELECT password FROM login where username='".$username."'"
        );
    if (mysql_num_rows($result) > 0) {
        $res = mysql_fetch_array($result);
        echo $res[0];
    } else {
        // If the user does not exists, the query will return no result, but no error occurs.
        // Therefore, mysql_error() will return empty string, mysql_errno() will return 0.
        echo "Cannot find user ".$username;
    }

    // Add a new user with username and password
    $username = "Jie";
    $password = "pwd";
    echo "<pre>INSERT INTO login VALUES ('".$username."', '".$password."')</pre>";
    $result = mysql_query(
            "INSERT INTO login VALUES ('".$username."', '".$password."')"
        );
    if ($result) {
        echo "Success!";
    } else {
        echo mysql_errno().":".mysql_error();
    }
    //echo 

    // Check tables
    //$sql = "SHOW TABLES FROM `$database`";
    //$result = mysql_query($sql);

    //if (mysql_num_rows($result) > 0) {
    //    echo "<p>Available tables:</p>\n";
    //    //echo $result;
    //    echo "<pre>\n";
    //    while ($row = mysql_fetch_row($result)) {
    //        echo "row[0]"."{$row[0]}\n";
    //    }
    //    echo "</pre>\n";
    //} else {
    //    echo "<p>The database '" . $database . "' contains no tables.</p>\n";
    //    echo mysql_error();
    //}
?>
