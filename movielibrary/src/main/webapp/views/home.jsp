<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>MovFlix - Online Movie Library</title>
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

        a {
            display: block;
            margin-bottom: 10px;
            color: #007bff;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        p {
            margin: 10px 0;
        }

        h2 {
            color: #555;
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <h1>Welcome to MovFlix - Online Movie Library</h1>
	
    <a href="adminLogin">Admin Section</a>
    
    <h2>Movie Details</h2>
    <p>Click on any of the links below to find movie details:</p>

    <a href="searchByid">By Movie ID</a>

    <a href="searchByname">By Movie Name</a>

    <a href="searchByCollectionRange">By Collection Range</a>
</body>
</html>
