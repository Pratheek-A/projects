<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>MovFlix - Search By Collection Range</title>
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

        input[type="number"] {
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
    </style>
</head>
<body>
    <h1>Search By Collection Range</h1>
    <form action="/searchByCollectionResult" method="post">
        <label for="minCollection">Enter Min Collection:</label>
        <input type="number" id="minCollection" name="minCollection" step="0.01" min="0" required>
        <br><br>
        <label for="maxCollection">Enter Max Collection:</label>
        <input type="number" id="maxCollection" name="maxCollection" step="0.01" min="0" required>
        <br><br>
        <input type="submit" value="Submit">
    </form>
</body>
</html>
