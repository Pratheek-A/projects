<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>MovFlix - Add Movie</title>
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

        form {
            width: 300px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            background-color: #fff;
        }

        label {
            display: block;
            margin-bottom: 5px;
            color: #555;
        }

        input[type="number"],
        input[type="text"] {
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        input[type="submit"] {
            background-color: #007bff;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        input[type="submit"]:hover {
            background-color: #0056b3;
        }

        p {
            text-align: center;
            margin: 20px 0;
        }

        a {
            display: block;
            margin-bottom: 10px;
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
    <h1>Add Movie</h1>
    <form action="/addMovie" method="post">
        <label for="id">Enter Movie ID:</label>
        <input type="number" id="id" name="id" required>
        <br><br>
        <label for="name">Enter Movie Name:</label>
        <input type="text" id="name" name="name" required>
        <br><br>
        <label for="collection">Enter Collection:</label>
        <input type="number" id="collection" name="collection" required>
        <br><br>
        <input type="submit" value="Submit">
    </form>
    <p>Click on the buttons below:</p>
    <a href="viewAllMovies">View All Movies</a>
    <a href="adminDashboard">Home Page</a>
</body>
</html>
