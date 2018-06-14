<?php 
	if(isset($_POST['login']))
		$login = fix_string($_POST['login']);
	if(isset($_POST['password']))
		$password = fix_string($_POST['password']);

	require_once 'login.php';
	$connection = new mysqli($hn, $un, $pw, $db);
	if($connection->connect_error)
		die($connection->connect_error);

	$query = "SELECT * FROM users WHERE username='$login'";
	$result = $connection->query($query);
	if(!$result) 
		die($connection->error);
	elseif($result->num_rows) {
		$row = $result->fetch_array(MYSQLI_NUM);
		$result->close();
			
		$salt1 = 'qm&h';
		$salt2 = 'pg!@';
		$token = hash('ripemd128', "$salt1$password$salt2");
		if($token == $row[1]) {
			session_start();
			$_SESSION['login'] = $login;
			$_SESSION['password'] = $password;
 
			echo $_SESSION['login'];
		}
		else
			die("Bad combination.");
	}
	else
		die("Bad username or password.");

	$connection->close();	

//==========================================================================================================================================

	function fix_string($string) {
		if(get_magic_quotes_gpc()) $string = stripcslashes($string);
		return htmlentities($string);
	}
?>