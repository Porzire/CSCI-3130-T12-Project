<?php

/**
 * This program communicates with mySQL database. It provides functions to
 * responce mySQL queries.
 *
 * @version 1.0
 */

/*
 * The username we used to access mySQL database system.
 *
 * @var string
 * @access private
 */
$dbusername = 'geofit';

/*
 * The password we used to access mySQL database system.
 *
 * @var string
 * @access private
 */
$dbpass = 'charizard';

/*
 * The host of database we connected.
 *
 * @var string
 * @access private
 */
$dbhost = 'localhost';

/*
 * The name of database we connected.
 *
 * @var string
 * @access private
 */
$dbname = 'geofit';

/*
 * The connection attempt with mySQL database system.
 *
 * @var boolean
 * @access private
 */
$connection = mysql_connect($dbhost, $dbusername, $dbpass);
if (!$connection) {
    die('Could not connect: ' . mysql_error());
}

/*
 * The connection attempt with database.
 *
 * @var boolean
 * @access private
 */
$dbcheck = mysql_select_db($dbname);
if (!$dbcheck) {
    die(mysql_error());
}

/*
 * The connection attempt with database.
 *
 * @var boolean
 * @access private
 */
$ajaxResponce = Array(
        true => 'success',
        false => 'fail'
    );

/*
 * This statement is used for responce ajax request.
 */
switch ($_POST['func']) {
    case 'login': 
        echo $ajaxResponce[login($_POST['username'], $_POST['password'])];
        break;
    case 'register': 
        echo $ajaxResponce[register($_POST['username'], $_POST['password'])];
        break;
    case 'remove':
        echo $ajaxResponce[remove($_POST['username'])];
}

//Connect with database
$connection = mysql_connect($dbhost, $dbname, $dbpass);
if (!$connection) {
    die('Could not connect: ' . mysql_error());
} else {
    echo "Connected";

//select from database
$dbcheck = mysql_select_db("$dbname");            
if (!$dbcheck) {
    echo mysql_error();
} else {
    echo "<p>Successfully connected to the database '" . $database . "'</p>\n";

// Check tables
$sql = "SELECT * FROM geofit.item";
$result = mysql_query($sql);
if (mysql_num_rows($result) > 0) {
    echo "<p>Here are the current entries:</p>\n";
    echo "<pre>\n";
    echo "User\titem name\tcalories consumed\tdate consumed\tdate added\n";
    while ($row = mysql_fetch_row($result)) {
        echo "{$row[0]}\t\t{$row[1]}\t{$row[2]}\t{$row[3]}\t{$row[4]}\n";
        }
    echo "</pre>\n";
} else {
    echo "<p>The database '" . $database . "' contains no tables.</p>\n";
    echo mysql_error();
        }
    }
}

?>