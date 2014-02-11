<?php
    $dbusername = 'geofit';
    $dbpass = 'charizard';
    $dbhost = 'localhost';
    $dbname = 'geofit';

    $connection = mysql_connect($dbhost, $dbusername, $dbpass);
    if (!$connection) {
        die('Could not connect: ' . mysql_error());
    }
    $dbcheck = mysql_select_db($dbname);
    if (!$dbcheck) {
        die(mysql_error());
    }

    /**
     * Try to login with given username and password.
     *
     * @param String $username The user name.
     * @param String $password The password.
     *
     * @return boolean True if the username and password exist in the login
     *                 table in the database.
     */
    function login($username, $password) {
        $qRes = mysql_query(
                'SELECT password FROM login where username=\''.$username.'\'');
        if (mysql_num_rows($qRes) > 0) {
            $res = mysql_fetch_array($qRes);
            if ($res[0] == $password) {
                return true;
            }
        }
        return false;
    }

    /**
     * Try to register with given username and password.
     *
     * @param String $username The user name.
     * @param String $password The password.
     *
     * @return boolean True if the username and password have been successfully
     *                 inserted into the loin table.
     */
    function register($username, $password) {
        return mysql_query(
                'INSERT INTO login VALUES (\''.$username.'\', \''.$password.'\')');
    }

    $ajaxResponce = Array(
            true => 'success',
            false => 'fail'
        );

    switch ($_POST['func']) {
        case 'login': 
            echo $ajaxResponce[login($_POST['username'], $_POST['password'])];
            break;
        case 'register': 
            echo $ajaxResponce[register($_POST['username'], $_POST['password'])];
            break;
        case 'test':
            echo 'test pass';
    }
?>
