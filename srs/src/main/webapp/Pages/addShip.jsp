<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Ship Reservation System</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css">
<style>
 input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 100%;
  background-color: DimGray;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: DarkGray;
}

div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>


</head>

<body>
	<a href="/backMenu" class="btn btn-outline-dark">Back</a>

		<h2 style="text-align:center;"><b>ADD SHIP</b></h2>
		
		<div>
		<form method="post" action="/addShip/add">
		<label>Ship Id</label>
		<input type="text" name="shipId" placeholder="Ship Id" required ><br>
		<label>Ship Name</label>
		<input type="text" name="shipName" pattern="[A-Za-z]+" required ><br>
		<label>Ship Model</label>
		<input type="text" name="shipModel" min=0 required ><br>
		<label>Ship Capacity</label>
		<input type="text" name="shipCapacity" min=0 required><br>
		<label>Ship Reservation Capacity</label>
		<input type="text" name="reservationCapacity" min=0 required><br>
		<label>Ship Speed Per Km</label>
		<input type="text" name="perKm" min=0 required><br>
		<input type="submit" value="Add">
		</form>
		</div>
		
	<script type="text/javascript">
		var s = "${msg}";
		if (s.length != 0) {
			alert(s)
			s = "";
		}
	</script>


</body>
</html>