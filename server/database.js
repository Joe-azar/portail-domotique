import mysql from "mysql2"

// Create the connection to database
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    connectTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
})


pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!
    console.log("Connected!")
});