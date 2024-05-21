<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Welcome Page</title>
<style>
body {
    font-family: Arial, sans-serif;
    background-image: url('https://thepointsguy.freetls.fastly.net/us/originals/2022/03/Cruise_Stock_Royal-Caribbean-Wonder-of-the-Seas-3.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    padding-bottom: 50px;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px;
    text-align: center;
    color: white;
}

h1 {
    font-size: 36px;
    margin-bottom: 20px;
}

p {
    font-size: 18px;
    margin-bottom: 30px;
}

.footer {
    position: fixed;
    bottom: -30px;
    left: 0;
    width: 100%;
    background-color: #333;
    color: white;
    padding: 10px;
    text-align: center;
}

.footer a {
    color: white;
    text-decoration: none;
}

</style>
</head>
<body>
<div class="container">
    <h1>Welcome to the Ship Reservation System</h1>
    <a href="/home">Proceed</a>
</div>

<div class="footer">
    <p>&copy; 2023 Ship Reservation System. All rights reserved.</p>
</div>

<script type="text/javascript">
		var s = "${msg}";
		if (s.length != 0){
			alert(s)
		}
	</script>
</body>
</html>
