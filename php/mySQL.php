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

/*
 * Try to register with given username and password.
 *
 * @param String $username The user name.
 * @param String $password The password.
 *
 * @return boolean True if the username and password have been successfully
 *                 inserted into the login table.
 */
function register($username, $password) {
    return mysql_query(
            'INSERT INTO login VALUES (\''.$username.'\', \''.$password.'\')');
}

/*
 * Try to remove the account with given username.
 *
 * @param String $username The user name.
 *
 * @return boolean True if the user record have been successfully removed
 *                 from the login table.
 */
function remove($username) {
    return mysql_query(
            'DELETE FROM login WHERE username=\''.$username.'\'');
}

/*
* Try to return the histroy of all entries in the added food section.
*
*/
function returnFoodHistory(){
    $sql = "SELECT * FROM geofit.item";
    $result = mysql_query($sql);
    $string = '';
    if (mysql_num_rows($result) > 0) {
        $string .= "<div class=\"CSSTableGenerator\"><table ><tr><td>User</td><td>Item Name</td><td>Calories Consumed</td><td>Date Consumed</td><td>Date Added</td></tr></p><p>";
        while ($row = mysql_fetch_row($result)) {
            $string .= "<tr><td>{$row[0]}</td><td>{$row[1]}</td><td>{$row[2]}</td><td>{$row[3]}</td><td>{$row[4]}</td></tr></p><p>";
            }
        $string .= "</table></p><p>";
    } else {
        $string .= "<p>The database '" . $database . "' contains no tables.</p><p>";
        echo mysql_error();
            }
    return $string;
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
        break;
    case 'returnFoodHistory':
        echo returnFoodHistory();
}

?>
