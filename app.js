require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'to_do_app'
})

db.connect((err) => {
    if (err) {
        console.error('error connecting to MySQL:', err)
    } else {
        console.log('connected to MySQL database')
    }
})

app.get('/data', (req, res) => {
    const query = 'SHOW TABLES'

    db.query(query, (err, results) => {
        if (err) {
            console.error('error executing query:', err)
            res.status(500).send('internal server error')
        } else {
            res.json(results)
        }
    })
})

app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users'

    db.query(query, (err, results) => {
        if (err) {
            console.error('error executing query', err)
            res.status(500).send('internal server error')
        } else {
            res.json(results)
        }
    })
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})