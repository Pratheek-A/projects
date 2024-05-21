<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
    <title>MovFlix - Search Results By Collection Range</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 0;
            background-color: #f7f7f7;
        }

        h1 {
            color: #007bff;
            text-align: center;
        }

        h2 {
            color: #007bff;
            margin-top: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #007bff;
            color: #fff;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        tr:hover {
            background-color: #ddd;
        }

        p {
            text-align: center;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <h1>MovFlix - Search Results By Collection Range</h1>

    <c:if test="${not empty movies}">
        <h2>Search Results for Collection Range: ${minCollection} to ${maxCollection}</h2>
        <table border="1">
            <tr>
                <th>Movie ID</th>
                <th>Movie Name</th>
                <th>Collection</th>
            </tr>
            <c:forEach var="movie" items="${movies}">
                <tr>
                    <td>${movie.id}</td>
                    <td>${movie.name}</td>
                    <td>${movie.collection}</td>
                </tr>
            </c:forEach>
        </table>
    </c:if>

    
</body>
</html>
