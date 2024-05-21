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
	<a href="/backMenu" class="btn btn-outline-dark">Back</a>
	

	<form method="post" action="/changePassword" style="max-width: 500px; margin: auto">
		<h3>CHANGE PASSWORD</h3>
		<div class="input-container">
			<i class="fa fa-user icon"></i> <input class="input-field" type="text" placeholder="Username" name="userName" required>
		</div>

		<div class="input-container">
			<i class="fa fa-envelope icon"></i> <input class="input-field" minlength="8" type="password" placeholder="Old Password" name="oldPassword" required>
		</div>
		
		<div class="input-container">
			<i class="fa fa-envelope icon"></i> <input class="input-field" minlength="8" type="password" placeholder="New Password" name="newPassword" required>
		</div>

		<button type="submit" class="btn">Submit</button>	
		</form>

	<script type="text/javascript">
		var s = "${msg}";
		if (s.length != 0)
			alert(s)
	</script>

</body>
</html>