<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix='c' uri="jakarta.tags.core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Ship Reservation System</title>
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css">
<style type="text/css">
h2 {
	margin-top: 10px;
	text-align: center;
}

th {
	text-align: center;
}

tr {
	border-color: black;
}
</style>

</head>
<body>

	<a href="/backMenu" class="btn btn-outline-dark">Back</a>

	<c:if test="${list.size()>0}">
		<h2>
			<b>BOOKING LIST</b>
		</h2>
		<table class="table table-bordered table-striped">

			<tr>
				<th >Ship Id</th>
				<th >Ship Name</th>
				<th >Passenger Name</th>
				<th >Source</th>
				<th >Destination</th>
				<th >Date</th>
			</tr>

			<c:forEach items="${list}" var="book">
				<tr>
					<td >${book.sId.shipId.shipId}</td>
					<td >${book.sId.shipId.shipName}</td>
					<td >${book.passId.passName}</td>
					<td >${book.sId.routeId.source}</td>
					<td >${book.sId.routeId.destination}</td>
					<td >${book.sId.journeyDate}</td>
				</tr>

			</c:forEach>
		</table>
	</c:if>
</body>
</html>