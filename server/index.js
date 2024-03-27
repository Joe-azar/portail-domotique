require('dotenv').config();
const mysql = require('mysql');

// Create a connection object with your database configuration
const connection = mysql.createConnection({
  host     : process.env.MYSQL_HOST,
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD,
  database : process.env.MYSQL_DATABASE,
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }

  console.log('Connected as id ' + connection.threadId);
});

connection.query('SELECT * FROM user', (error, results, fields) => {
  if (error) throw error;
  // Process your results here
  console.log(results);
});

// Don't forget to close the connection when done
connection.end();

