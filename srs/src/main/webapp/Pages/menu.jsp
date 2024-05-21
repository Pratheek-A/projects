<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Ship Reservation System</title>
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css">
<style type="text/css">
h2 {
	color: white;
}

h1 {
	margin-top: 20px;
	text-align: center;
}

th {
	text-align: center;
}

tr {
	border-color: black;
}

body {
	background-color:;
}
</style>
</head>

<body>
	<nav class="navbar bg-dark" data-bs-theme="dark">
		<nav class="navbar navbar-expand-lg bg-body-tertiary">
			<div class="container-fluid">
				<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div class="navbar-nav">
						<a class="nav-link" href="/login/addShip">Add Ship</a>
						<a class="nav-link" href="/login/viewBookingPage">Booking Details</a> 
						<a class="nav-link" href="/changePasswordPage">Change Password</a> 
						<a style="position: relative; left: 950px;" class="nav-link" href="/logout">Logout</a>
					</div>
				</div>
			</div>
		</nav>
	</nav>

	<c:if test="${list.size()>0}">
		<h1>
			<b>SHIP DETAILS</b>
		</h1>
		<table class="table table-bordered table-striped">
			<tr>
				<th>Ship Id</th>
				<th>Ship Name</th>
				<th>Ship Model</th>
				<th>Ship Capacity</th>
				<th>Reservation Capacity</th>
				<th>Ship Speed per Hour</th>
				<th colspan="3">Actions</th>
			</tr>

			<c:forEach items="${list}" var="ship">
				<tr>
					<td>${ship.shipId}</td>
					<td>${ship.shipName}</td>
					<td>${ship.shipModel}</td>
					<td>${ship.shipCapacity}</td>
					<td>${ship.reservationCapacity}</td>
					<td>${ship.perKm}</td>
					<td><a href="/login/viewShip?id=${ship.shipId}" class="btn btn-primary">View</a></td>
					<td><a href="/delete?id=${ship.shipId}" class="btn btn-danger">Delete</a></td>
					<td><a href="/login/updatePage?id=${ship.shipId}&name=${ship.shipName}&model=${ship.shipModel}
					&capacity=${ship.shipCapacity}&reserve=${ship.reservationCapacity}&km=${ship.perKm}"
						class="btn btn-success">Update</a></td>
				</tr>
			</c:forEach>
		</table>
	</c:if>

	<script type="text/javascript">
		var s = "${msg}";
		if (s.length != 0) {
			alert(s)
			s = "";
		}
	</script>
</body>
</html>