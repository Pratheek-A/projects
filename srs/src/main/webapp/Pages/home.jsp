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
	background-size: cover;
	background-repeat: no-repeat;
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
}
h1 {
	text-align: center;
	background-color:black;
	color:white;
}
a{
color:black;
}

</style>

</head>
<body>

<!-- <h1>Ship Reservation System</h1> -->
<a href="/welcomePage">Home</a>

	<form method="post" action="/login" style="max-width: 500px; margin: auto">


		<h3><b>ADMIN LOGIN</b></h3>
		<div class="input-container">
			<i class="fa fa-user icon"></i> <input class="input-field"
				type="text" placeholder="Username" name="userName" required>
		</div>

		<div class="input-container">
			<i class="fa fa-envelope icon"></i> <input class="input-field" minlength="8"
				type="password" placeholder="Password" name="userPassword" required>
		</div>

		<button type="submit" class="btn">Login</button>

		<h4>
		<a href="/registerPage">Don't have an account, Register Here</a>
		</h4>
	</form>

	<script type="text/javascript">
		var s = "${msg}";
		if (s.length != 0){
			alert(s)
		}
	</script>


</body>
</html>