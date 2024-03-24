import mysql from "mysql2"
import dotenv from "dotenv"

// Load les variables d'environnement
dotenv.config()

// Create the connection to database
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    connectTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
}).promise()

// Debug info, connection  to database ok or notok
pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!
    console.log("Connected!")
});

/**
 * PLAQUES SQL Schema: <immatriculation>, <userid> linked to real user id
 */
// Récupère les plaques en fonction des utilisateurs
export async function getPlatesByUser(userid) {
    const [rows] = await pool.query(`
    SELECT *
    from plaques
    where userid = ?
    `, [userid])

    return rows
}

export async function getUser(userid) {
    const [rows] = await pool.query(`
    SELECT *
    from Utilisateur
    where userid = ?
    `, [userid])

    // One element to return
    return rows[0]
}