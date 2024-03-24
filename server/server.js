import express from 'express'
import { getPlatesByUser, getUser } from './database'

const app = express()

// Get the plates by user
app.get("/api/getPlatesByUser/:userid", (req, res) => {
    const userid = req.params.userid
    const plates = getPlatesByUser(userid)
    res.send(plates)
})

// Get user
app.get("/api/getUser/:userid", (req, res) => {
    const userid = req.params.userid
    const user = getUser(userid)
    res.json(user)
})

// Debug info
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send('Something broke!')
})

// Port of the server, debug info
app.listen(5000, () => {
    console.log("Server starts on port 5000")
})