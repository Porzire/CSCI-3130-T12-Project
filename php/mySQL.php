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
function removeUser($username) {
    return mysql_query(
        'DELETE FROM login WHERE username=\''.$username.'\'');
}

/*
 * Try get mySQL data with SELECT query.
 *
 * @param String $username The user name.
 * @param String $username The table name.
 *
 * @return object The mySQL data retrieved by given query.
 */
function getRecord($username, $table) {
    $sql = 'SELECT * FROM '.$table.' WHERE username=\''.$username.'\'';
    return mysql_query($sql);
}

/*
 * Return string representation of the records.
 * This function is used for testing.
 *
 * @param String $username The user name.
 * @param String $username The table name.
 *
 * @return String Return string representation of the records.
 */
function returnRecords($username, $table) {
    $result = getRecord($username, $table);
    $string = '';
    while ($row = mysql_fetch_row($result)) {
        foreach ($row as $val) {
            $string .= $val . ' ';
        }
        $string .= "\n";
    }
    return $string;
}

/**
 * Try to return the history of all entries in the added food section.
 * NOTE FOR LATER: Be sure that if there are no entries check and return a display message and that the table querey is correct
 */
function returnFoodHistory($username){
   $database = "item";
   $result = getRecord($username, $database);
   $string = '';
   if (mysql_num_rows($result) > 0) {
       $string .= "<div class=\"CSSTableGenerator\"><table ><tr><td>User</td><td>Item Name</td><td>Calories Consumed</td><td>Date Consumed</td><td>Date Added</td></tr></p><p>";
       while ($row = mysql_fetch_row($result)) {
           $string .= "<tr><td>{$row[1]}</td><td>{$row[2]}</td><td>{$row[3]}</td><td>{$row[4]}</td><td>{$row[5]}</td></tr></p><p>";
        }
       $string .= "</table></p><p>";
    } else {
       $string .= "<p>The database '" . $database . "' contains no table entries for this user.</p><p>";
       echo mysql_error();
    }
    return $string;
}

/**
 * Try to return the history of all entries in the added sport section.
 * NOTE FOR LATER: be sure that if there are no entries, it will return a message and that the table querey is correct
 */
function returnSportHistory($username){
    $database = "activity";
    $result = getRecord($username, $database);
    $string = '';
    if (mysql_num_rows($result) > 0) {
        $string .= "<div class=\"CSSTableGenerator\"><table ><tr><td>User</td><td>Activity Name</td><td>Calories Burned</td><td>Date Burned</td><td>Date Added</td></tr></p><p>";
        while ($row = mysql_fetch_row($result)) {
            $string .= "<tr><td>{$row[1]}</td><td>{$row[2]}</td><td>{$row[3]}</td><td>{$row[4]}</td><td>{$row[5]}</td></tr></p><p>";
        }
        $string .= "</table></p><p>";
    } else {
        $string .= "<p>The database '" . $database . "' contains no table entries for this user.</p><p>";
        echo mysql_error();
    }
    return $string;
}

/*
 * Try to add food record.
 *
 * @param String $username The user name.
 * @param String $foodname The food name.
 * @param String $calories The number of calories contained in the food.
 * @param String $date     The eating date.
 *
 * @return boolean True if the food record have been successfully added
 *                 to the item table.
 */
function addFood($username, $foodname, $calories, $date) {
    return mysql_query(
            'INSERT INTO item (`username`, `item_name`, `cal_consumed`, `date_consumed`, `date_added`)'.
            ' VALUES (\''.$username.'\', \''.$foodname.'\', \''.$calories.'\', \''.$date.'\', NOW())');
}

/*
 * Try to add sport record.
 *
 * @param String $username  The user name.
 * @param String $sportname The sport name.
 * @param String $calories  The number of calories contained in the food.
 * @param String $date      The eating date.
 *
 * @return boolean True if the food record have been successfully added
 *                 to the item table.
 */
function addSport($username, $sportname, $calories, $date) {
    return mysql_query(
            'INSERT INTO activity (`username`, `activity_name`, `cal_burned`, `date_burned`, `date_added`)'.
            ' VALUES (\''.$username.'\', \''.$sportname.'\', \''.$calories.'\', \''.$date.'\', NOW())');
}

/*
 * Try to get the last record on the table.
 * This function is used for testing.
 *
 * @param String $username The table name.
 *
 * @return String Return string representation of the records.
 */
function getLastRecord($table) {
    $sql = 'SELECT * FROM '.$table.' WHERE id = (SELECT max(id) FROM '.$table.')';
    $result = mysql_fetch_row(mysql_query($sql));
    $display = '';
    foreach ($result as $val) {
        $display .= $val . ' ';
    }
    echo $display;
}

/*
 * Try to remove the last record from the table.
 * This function is used for testing.
 *
 * @param String $username The table name.
 *
 * @return String Return string representation of the records.
 */
function removeLastRecord($table) {
    return mysql_query(
        'DELETE FROM '.$table.' WHERE id = (SELECT maxid FROM (SELECT max(id) AS maxid FROM '.$table.') AS tmp)'
    );
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
 * This statement is used for responsing ajax request.
 */
switch ($_POST['func']) {
    case 'login': 
        echo $ajaxResponce[
                login($_POST['username'], $_POST['password'])];
        break;
    case 'register': 
        echo $ajaxResponce[
                register($_POST['username'], $_POST['password'])];
        break;
    case 'addFood':
        echo $ajaxResponce[
                addFood($_POST['username'], $_POST['foodname'], $_POST['calories'], $_POST['date'])];
        break;
    case 'addSport':
        echo $ajaxResponce[
                addSport($_POST['username'], $_POST['foodname'], $_POST['calories'], $_POST['date'])];
        break;
    case 'returnFoodHistory':
        echo returnFoodHistory($_POST['username']);
        break;
    case 'returnSportHistory':
        echo returnSportHistory($_POST['username']);
        break;
}

/*
 * This statement is also used for responsing ajax request, but used for
 * responce ajax request.
 */
switch ($_POST['test']) {
    case 'removeUser':
        echo $ajaxResponce[
                removeUser($_POST['username'])];
        break;
    case 'removeLastRecord':
        echo $ajaxResponce[
                removeLastRecord($_POST['table'])];
        break;
    case 'returnRecords': 
        echo returnRecords($_POST['username'], $_POST['table']);
        break;
    case 'getLastRecord': 
        echo getLastRecord($_POST['table']);
        break;
}
?>
