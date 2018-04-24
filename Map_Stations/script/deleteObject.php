<?php 
	session_start();

	if($_SESSION['login'] == 'user' || $_SESSION['login'] == 'optic')
		exit("You have no permission.");
	
	elseif($_SESSION['login'] == 'admin') {
		//connection to the data base
		require_once 'login.php';
		$conn = new mysqli($hn, $un, $pw, $db);
		if($conn->connect_error) {
			die($conn->connect_error);
		}

		//query for the table data
		if($_POST['data'] == "boxes") {
			$name = $_POST['name'];
			$nas = $_POST['nas'];
		
			$query = "DELETE FROM boxes WHERE (name='$name' && nas='$nas')";
		}
		elseif($_POST['data'] == "lines") {
			$name = $_POST['name'];
			$nas = $_POST['nas'];
		
			$query = "DELETE FROM opticlines WHERE (name='$name' && nas='$nas')";
		}
		elseif($_POST['data'] == "olts") {
			$nas = $_POST['nas'];
			$model = $_POST['model'];
		
			$query = "DELETE FROM olts WHERE (model='$model' && nas='$nas')";
		}
	
		$result = $conn->query($query);
		if(!$result) {
			die($conn->error);
		}
		else {
			echo 'The object was deleted from the data base.';		
		}

		//closing connection to the data base
		$conn->close();
	}
?>