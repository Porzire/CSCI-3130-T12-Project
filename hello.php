<?php
          // Get Variables
         $dbname = "geofit";
         $database = "geofit";
         $dbusername = "geofit";
         $dbpass = "charizard";
         $dbhost = "localhost";

       //    $connection = mysql_connect("$dbhost", "$dbusername", "$dbpass");
         
          $connection = mysql_connect("localhost", "geofit", "charizard");
          if (!$connection) {
              die('Could not connect: ' . mysql_error());
          } else {
              echo "Connected";

            //  $dbcheck = mysql_select_db("$dbname");
             
              $dbcheck = mysql_select_db("geofit");
            if (!$dbcheck) {
                  echo mysql_error();
              } else {
                  echo "<p>Successfully connected to the database '" . $database . "'</p>\n";
          // Check tables
                  $sql = "SHOW TABLES FROM `$database`";
                  $result = mysql_query($sql);
                  if (mysql_num_rows($result) > 0) {
                    echo "<p>Available tables:</p>\n";
                    echo "<pre>\n";
                    while ($row = mysql_fetch_row($result)) {
                      echo "{$row[0]}\n";
                    }
                    echo "</pre>\n";
                  } else {
                    echo "<p>The database '" . $database . "' contains no tables.</p>\n";
                    echo mysql_error();
                  }
              }
          }
        ?>