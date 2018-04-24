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
		if($_POST['data'] == "cores") {
			$name = $_POST['name'];
			$router = $_POST['router'];
			$addr = $_POST['addr'];
			$lat = $_POST['lat'];
			$lng = $_POST['lng'];

			$query = "INSERT INTO cores(name,router,addr,lat,lng) VALUES('$name','$router','$addr','$lat','$lng')";
			$conn->query($query);
			$query = "SELECT * FROM cores WHERE name='$name'";
		}
		elseif($_POST['data'] == "boxes") {
			$name = $_POST['name'];
			$nas = $_POST['nas'];
			$addr = $_POST['addr'];
			$lat = $_POST['lat'];
			$lng = $_POST['lng'];		
			$trspl = $_POST['trspl'];
			$sbspl = $_POST['sbspl'];

			$query = "INSERT INTO boxes(name,nas,addr,lat,lng,trspl,sbspl) VALUES('$name','$nas','$addr','$lat','$lng','$trspl','$sbspl')";
			$conn->query($query);
			$query = "SELECT * FROM boxes WHERE name='$name'";		
		}
		elseif($_POST['data'] == "lines") {
			$name = $_POST['name'];
			$nas = $_POST['nas'];
			$startbox = $_POST['startbox'];
			$endbox = $_POST['endbox'];
			$fibernum = $_POST['fibernum'];		
			$length = $_POST['length'];

			$query = "INSERT INTO opticlines(name,nas,startbox,endbox,fibernum,length) VALUES('$name','$nas','$startbox','$endbox','$fibernum','$length')";
			$conn->query($query);
			$query = "SELECT * FROM opticlines WHERE name='$name'";		
		}
		elseif($_POST['data'] == "olts") {
			$nas = $_POST['nas'];
			$model = $_POST['model'];
			
			$query = "INSERT INTO olts(nas,model) VALUES('$nas','$model')";
			$conn->query($query);
			$query = "SELECT * FROM olts WHERE nas='$nas'";		
		}
		
		$result = $conn->query($query);
		if(!$result) {
			die($conn->error);
		}
		else {
			echo 'The object was added to the data base.';		
		}

		//closing connection to the data base
		$result->close();
		$conn->close();
	}
?>