<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
    <%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Ship Reservation System</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css">
<style type="text/css">
h2{
margin-top:10px;
text-align:center;
}
th{
text-align:center;
color: black;
}
tr{
border-color:black;
}
td{
text-align:center;
}
</style>
</head>

<body>

<a href="/backMenu" class="btn btn-outline-dark">Back</a>


		<h2><b>SHIP LIST</b></h2>
		<table class="table table-bordered table-striped">
			<tr>
				<th>Ship Id</th>
				<th>Ship Name</th>
				<th>Ship Model</th>
				<th>Ship Capacity</th>
				<th>Reservation Capacity</th>
				<th>Ship Speed per Hour</th>
			</tr>

			<c:forEach items="${detail}" var="ship">
				<tr>
					<td>${ship.shipId}</td>
					<td>${ship.shipName}</td>
					<td>${ship.shipModel}</td>
					<td>${ship.shipCapacity}</td>
					<td>${ship.reservationCapacity}</td>
					<td>${ship.perKm}</td>
				</tr>
			</c:forEach>
		</table>
	

</body>
</html>