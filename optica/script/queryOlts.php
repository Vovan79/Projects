<?php 
	session_start();
	//echo $_SESSION['login'];
	if($_SESSION['login'] == 'user') {
		exit($_SESSION['login']);
	}
	elseif($_SESSION['login'] == 'optic' || $_SESSION['login'] == 'admin') {
		//connection to the data base
		require_once 'login.php';
		$conn = new mysqli($hn, $un, $pw, $db);
		if($conn->connect_error) {
			die($conn->connect_error);
		}

		//query for the table data
		$query = "SELECT model FROM olts WHERE nas='" . $_POST['data'] . "'";
		$result = $conn->query($query);
		if(!$result) {
			die($conn->error);
		}

		//working with results of the query
		$rows = $result->num_rows;
		for($i = 0; $i < $rows; $i++) {
			$result->data_seek($i);
			$row = $result->fetch_assoc();
			echo json_encode($row) . ' &sep ';
		}

		//closing connection to the data base
		$result->close();
		$conn->close();
	}
?>