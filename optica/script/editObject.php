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

			if($_POST['trspl']) {
				$trspl = $_POST['trspl'];
				$query = "UPDATE boxes SET trSpl='$trspl' WHERE name='$name'&&nas='$nas';";
				
				$result = $conn->query($query);
				if(!$result) {
					die($conn->error);
				}
				else {
					echo 'The value trSpl was edited in the data base.'.PHP_EOL;		
				}
			}
			if($_POST['sbspl']) {
				$sbspl = $_POST['sbspl'];
				$query = "UPDATE boxes SET sbSpl='$sbspl' WHERE name='$name'&&nas='$nas';";
				
				$result = $conn->query($query);
				if(!$result) {
					die($conn->error);
				}
				else {
					echo 'The value sbSpl was edited in the data base.'.PHP_EOL;		
				}
			}	
			if($_POST['addr']) {
				$addr = $_POST['addr'];
				$query = "UPDATE boxes SET addr='$addr' WHERE name='$name'&&nas='$nas';";
				
				$result = $conn->query($query);
				if(!$result) {
					die($conn->error);
				}
				else {
					echo 'The value addr was edited in the data base.'.PHP_EOL;		
				}
			}	
			if(isset($_POST['lat'])) {
				$lat = $_POST['lat'];
				$query = "UPDATE boxes SET lat='$lat' WHERE name='$name'&&nas='$nas';";
				
				$result = $conn->query($query);
				if(!$result) {
					die($conn->error);
				}
				else {
					echo 'The value lat was edited in the data base.'.PHP_EOL;		
				}
			}
			if(isset($_POST['lng'])) {
				$lng = $_POST['lng'];
				$query = "UPDATE boxes SET lng='$lng' WHERE name='$name'&&nas='$nas';";
				
				$result = $conn->query($query);
				if(!$result) {
					die($conn->error);
				}
				else {
					echo 'The value lng was edited in the data base.';		
				}
			}	
		}
		
		//=====================================================================================================================
		if($_POST['data'] == "lines") {
			$name = $_POST['name'];
			$nas = $_POST['nas'];

			if($_POST['startbox']) {
				$startbox = $_POST['startbox'];
				$query = "UPDATE opticlines SET startbox='$startbox' WHERE name='$name'&&nas='$nas';";
				
				$result = $conn->query($query);
				if(!$result) {
					die($conn->error);
				}
				else {
					echo 'The value startbox was edited in the data base.'.PHP_EOL;		
				}
			}
			if($_POST['endbox']) {
				$endbox = $_POST['endbox'];
				$query = "UPDATE opticlines SET endbox='$endbox' WHERE name='$name'&&nas='$nas';";
				
				$result = $conn->query($query);
				if(!$result) {
					die($conn->error);
				}
				else {
					echo 'The value endbox was edited in the data base.'.PHP_EOL;		
				}
			}	
			if($_POST['fibernum']) {
				$fibernum = $_POST['fibernum'];
				$query = "UPDATE opticlines SET fibernum='$fibernum' WHERE name='$name'&&nas='$nas';";
				
				$result = $conn->query($query);
				if(!$result) {
					die($conn->error);
				}
				else {
					echo 'The value fibernum was edited in the data base.'.PHP_EOL;		
				}
			}	
			if($_POST['length']) {
				$length = $_POST['length'];
				$query = "UPDATE opticlines SET length='$length' WHERE name='$name'&&nas='$nas';";
				
				$result = $conn->query($query);
				if(!$result) {
					die($conn->error);
				}
				else {
					echo 'The value length was edited in the data base.';		
				}
			}	
		}

		//closing connection to the data base
		$conn->close();
	}
?>