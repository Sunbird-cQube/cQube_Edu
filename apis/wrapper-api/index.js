const express = require("express"); // Import express module
const { Client } = require("pg"); // Import the 'pg' module for interacting with a PostgreSQL database
const cors = require("cors");

const app = express(); // Initialize an Express app
const port = 3005; // Set the port for the app to listen on

app.use(cors());

const client = new Client({
  user: "postgres", // Replace with your PostgreSQL username
  host: "localhost", // Replace with the hostname of your PostgreSQL server
  database: "cqube", // Replace with the name of your database
  password: "postgres", // Replace with your password
  port: 5432, // Replace with the port of your PostgreSQL server (usually 5432)
});

// Connect to the PostgreSQL server
client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database.");

    // Create a route for the API
    app.get("/api/query", (req, res) => {
      // Get the SQL query from the query string
      const sql = req.query.sql;

      // Run the SQL query and send the result as a response
      client.query(sql, (err, result) => {
        if (err) {
          // If there was an error, send an error message as the response
          res.status(500).send("Error running SQL query: " + err.message);
        } else {
          // Otherwise, send the result as the response
          res.send(result);
        }
      });
    });

    // Start the app
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((err) => {
    // If there was an error connecting to the database, print it to the console
    console.error("Error connecting to PostgreSQL database:", err.stack);
  });
