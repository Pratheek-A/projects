<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Ship Reservation System</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
body {
	font-family: Arial, Helvetica, sans-serif;
}

* {
	box-sizing: border-box;
}

.input-container {
	display: -ms-flexbox; /* IE10 */
	display: flex;
	width: 100%;
	margin-bottom: 15px;
}

.icon {
	padding: 10px;
	background: dodgerblue;
	color: white;
	min-width: 50px;
	text-align: center;
}

.input-field {
	width: 100%;
	padding: 10px;
	outline: none;
}

.input-field:focus {
	border: 2px solid dodgerblue;
}

/* Set a style for the submit button */
.btn {
	background-color: dodgerblue;
	color: white;
	padding: 15px 20px;
	border: none;
	cursor: pointer;
	width: 100%;
	opacity: 0.9;
}

.btn:hover {
	opacity: 1;
}

h3 {
	text-align: center;
	margin-top:50px;
}

</style>


</head>
<body>
		<!-- <h2>
			<a href="home"><input type="submit" value="Back"></a>
		</h2> -->

	<form method="post" action="/register" style="max-width: 500px; margin: auto">
		<h3><b>ADMIN REGISTER</b></h3>
		<div class="input-container">
			<i class="fa fa-user icon"></i> <input class="input-field" type="text" placeholder="Username" name="userName">
		</div>

		<div class="input-container">
			<i class="fa fa-envelope icon"></i> <input class="input-field" minlength="8" type="password" placeholder="Password" name="userPassword">
		</div>

		<button type="submit" class="btn">Register</button>	
		</form>

	<script type="text/javascript">
		var s = "${msg}";
		if (s.length != 0)
			alert(s)
	</script>


</body>
</html>