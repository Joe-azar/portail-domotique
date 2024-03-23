import mysql from "mysql2/promise"

// Create the connection to database
const pool = mysql.createPool({
    host: 'so143978-001.eu.clouddb.ovh.net',
    user: 'Picaro',
    password: 'Picaro2000',
    port: 35991,
    database: 'bddPortail',
})

const result = await pool.query("SELECT * FROM plaques")
console.log(result)