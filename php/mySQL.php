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

function returnAdvice($username) {
    //The $string is what we return at the end
    $string = '';

    //get strings for item and activity for the current day
    $database_item = "item";
    $resultItem = getRecord($username, $database_item);

    $database_activity = "activity";
    $resultActivity = getRecord($username, $database_activity);

    //Search for number of calories consumed for this day
    $cal_consumed = 0;
	if(mysql_num_rows($resultItem) > 0){
	    while($row = mysql_fetch_row($resultItem)){
			if ($row[4] == date('Y-m-d')){
				$cal_consumed += $row[3];
			}		
	    }
		echo "You consumed " . $cal_consumed . " calories today";
		echo "<br/>";
	} else {
		$string .= "<p>The database '" . $database_item . "' contains no table entries for this user.</p><p>";
        echo mysql_error();
	}

	//Search for number of calories burned for this day
	$cal_burned = 0;
	if(mysql_num_rows($resultActivity) > 0){
	    while($row = mysql_fetch_row($resultActivity)){
			if ($row[4] == date('Y-m-d')){
	    	$cal_burned += $row[3];
			}
	    }
		echo "You burnt " . $cal_burned . " calories today.";
		echo "<br/>";
	} else {
		$string .= "<p>The database '" . $database_activity . "' contains no table entries for this user.</p><p>";
        echo mysql_error();
	}

	//take the total calories and assign to a level 1, 2, 3, 4
	$cal_consumed_level = 0;
	if($cal_consumed > 0 & $cal_consumed <= 2499){
		$cal_consumed_level = -1;
	}
	elseif ($cal_consumed >= 2500 & $cal_consumed <= 2699) {
		$cal_consumed_level = 0;
	}
	elseif ($cal_consumed >= 2700 & $cal_consumed <= 2899) {
		$cal_consumed_level = 1;
	}
	elseif($cal_consumed >= 2900 & $cal_consumed <= 3099){
		$cal_consumed_level = 2;
	}
	elseif ($cal_consumed >= 3100) {
		$cal_consumed_level = 3;
	}
	elseif ($cal_consumed == 0){
		$cal_consumed_level = -2;
	}

	//Do the same for the cal_burned with their numbers
	$cal_burned_level = 0;
	if($cal_burned > 0 & $cal_burned <= 199){
		$cal_burned_level = 0;
	}
	elseif ($cal_burned >= 200 & $cal_burned <= 399) {
		$cal_burned_level = 1;
	}
	elseif ($cal_burned >= 400 & $cal_burned <= 699) {
		$cal_burned_level = 2;
	}
	elseif ($cal_burned >= 700) {
		$cal_burned_level = 3;
	}
	elseif ($cal_burned == 0) {
		$cal_burned_level = -2;
	}

	//Do a check if there were null entries detected
	$has_entries_activity = TRUE;
	$has_entries_item = TRUE;

	if($cal_burned_level == -2){
		$has_entries_activity = FALSE;
	}
	if($cal_consumed_level == -2){
		$has_entries_item = FALSE;
	}

	if(!$has_entries_item){
		$string .= "<p>You have no entries for your food items. To get accurate results, please enter at least 1 food item.</p><p>";
	}
	if(!$has_entries_activity){
		$string .= "<p>You have no entries for your activities. To get accurate results, please enter at least 1 activity.</p><p>";
	}

	//Do a comparison to find out the advice with other id conditions. have it export to a $string
	$total_level = $cal_burned_level - $cal_consumed_level;

	if($has_entries_activity & $has_entries_item){
		if ($total_level == -3) {
			$string = "<p>Warning Severe: You are not exercising enough and are facing a large intake number of calories. Severe weight gain can be a side effect at these levels.</p><p>";
		}
		elseif ($total_level == -2) {
			$string = "<p>Warning Moderate: You are not exercising and facing more than average intake number of calories. Moderate weight gain can be a possible side effect at this level.</p><p>";
		}
		elseif ($total_level == -1) {
			$string = "<p>Warning Mild: You are consuming slightly more calories than average. Mild weight gain can be a side effect at this level.</p><p>";
		}
		elseif ($total_level == 0) {
			$string = "<p>Warning None: You are doing everything perfectly, keep this progress!</p><p>";
		}
		elseif ($total_level == 1) {
			$string = "<p>Warning Mild: You are doing more sports, try to eat a little more to keep a  good balance.</p><p>";
		}
		elseif ($total_level == 2) {
			$string = "<p>Warning Moderate: You are doing more sports than average. To keep a healthy balance it is recommended you consume more calories.</p><p>";
		}
		elseif ($total_level == 3) {
			$string = "<p>Warning Severe: You are doing much more sports activities, eat more to keep up with your current vigorous activity standards.</p><p>";
		}
		elseif ($total_level == 4) {
			$string = "<p>Warning Extreme: You are not eating enough calories based on your current results, you need to consume more calories. Physical distress can be an effect at these levels.</p><p>";
		}
		//Do a check to see if there is a major surplus in calories after heavy workout and if there is a major decrease in calories after eating a lot
		//Major cal's
		elseif($cal_consumed_level == 3 & $cal_burned_level == 3 & ($cal_consumed_level - $cal_burned_level) > 2699){
			$string = "<p>Warning Moderate: You are at risk of gaining weight even this this excessive exercise. Try eating less to maintain a balance</p><p>";
		}
		//Major Sport
		elseif($cal_consumed_level == 3 & $cal_burned_level == 3 & ($cal_burned_level - $cal_consumed_level) > 700){
			$string = "<p>Warning Moderate: You are doing more sports than needed even though you are eating more. Try cutting back on the sports to stay within safe limits</p><p>";
		}
	}
	
	return $string;
}
	
function returnFoodHistory($username){
   $database = "item";
   $result = getRecord($username, $database);
   $string = '';
   if (mysql_num_rows($result) > 0) {
       $string .= "<div class=\"CSSTableGenerator\"><table ><tr><td>User</td><td>Item Name</td><td>Calories Gained</td><td>Date Gained</td><td>Date Added</td></tr></p><p>";
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

function writeData($username, $interval){
    $outFile = "../tmp/data.tsv";

    // Create entry for useable dates.
    $data = array();
    for ($i = 0; $i < $interval; $i++) {
        $date = date("m/d", strtotime("-$i day"));
        $data[$date] = array(0, 0);
    }
    // Retrieve data from database.
    $result = getRecord($username, "activity");
    if (mysql_num_rows($result) > 0) {
        while ($row = mysql_fetch_row($result)) {
            $date = date("m/d", strtotime($row[4]));
            if (array_key_exists($date, $data)) {
                $data[$date][1] += $row[3];
            }
            $string .= "$row[3]\t$date\n";
        }
    }
    $result = getRecord($username, "item");
    if (mysql_num_rows($result) > 0) {
        while ($row = mysql_fetch_row($result)) {
            $date = date("m/d", strtotime($row[4]));
            if (array_key_exists($date, $data)) {
                $data[$date][0] += $row[3];
            }
            $string .= "$row[3]\t$date\n";
        }
    }
    // Write data to file.
    $string = "date\tfood\tsport\n";
    foreach ($data as $date => $val) {
        $string .= "$date\t$val[0]\t$val[1]\n";
    }
    file_put_contents($outFile, $string);
    chmod($outFile, 0644);
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
    case 'returnAdvice':
        echo returnAdvice($_POST['username']);
        break;
    case 'writeData':
        writeData($_POST['username'], $_POST['interval']);
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
