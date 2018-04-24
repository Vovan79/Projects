<?php 
	require_once 'login.php';
	$connection = new mysqli($hn, $un, $pw, $db);
	if($connection->connect_error)
		die($connection->connect_error);

	$salt1 = 'qm&h';
	$salt2 = 'pg!@';

	$username = 'user';
	$password = 'user';
	$token = hash('ripemd128', "$salt1$password$salt2");
	add_user($connection, $username, $token);

	$username = 'optic';
	$password = 'optic123';
	$token = hash('ripemd128', "$salt1$password$salt2");
	add_user($connection, $username, $token);

	$username = 'admin';
	$password = 'myProjects';
	$token = hash('ripemd128', "$salt1$password$salt2");
	add_user($connection, $username, $token);

	function add_user($connection, $un, $pw) {
		$query = "INSERT INTO users VALUES('$un', '$pw')";
		$result = $connection->query($query);
		if(!$result) 
			die($connection->error);
	}
?>