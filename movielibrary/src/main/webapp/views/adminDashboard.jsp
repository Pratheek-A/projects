<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>MovFlix - Admin Dashboard</title>
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

        ul {
            list-style-type: none;
            padding: 0;
        }

        li {
            margin-bottom: 10px;
        }

        a {
            display: block;
            padding: 10px 20px;
            color: #007bff;
            text-decoration: none;
            border: 1px solid #007bff;
            border-radius: 4px;
            text-align: center;
            background-color: #fff;
        }

        a:hover {
            background-color: #007bff;
            color: #fff;
        }
        
        
    </style>
</head>
<body>
	<a class="des" href="home">Home</a>
	
    <h1>Welcome to Admin Dashboard</h1>
    <ul>
        <li><a href="addMovie">Add Movie</a></li>
        <li><a href="modifyMovie">Modify Movie</a></li>
        <li><a href="viewAllMovies">View All Movies</a></li>
    </ul>
</body>
</html>
