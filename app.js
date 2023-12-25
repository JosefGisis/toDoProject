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
        console.error(`error connecting to MySQL database, ${process.env.DB_NAME}`)
    } else {
        console.log(`connected to MySQL database, ${process.env.DB_NAME}`)
    }
})

app.get('/tables', (req, res) => {
    const query = 'SHOW TABLES'

    db.query(query, (err, results) => {
        if (err) {
            console.error('error executing query:', err)
            res.status(500).send('internal server error')
        } else {
            res(results)
        }
    })
})

// the callback function takes a request and a respnse
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users'

    db.query(query, (err, results) => {
        if (err) {
            console.error('error executing query', err)
            res.status(500).send('internal server error')
        } else {
            res(results)
        }
    })
})

// the callback function takes a request and a respnse
app.get('/lists', (req, res) => {
    const query = 'SELECT * FROM lists'

    db.query(query, (err, results) => {
        if (err) {
            console.error('error executing query', err)
            res.status(500).send('internal server error')
        } else {
            res(results)
        }
    })
})

// the callback function takes a request and a respnse
app.get('/to_dos', (req, res) => {
    const query = 'SELECT * FROM to_dos'

    db.query(query, (err, results) => {
        if (err) {
            console.error('error executing query', err)
            res.status(500).send('internal server error')
        } else {
            res(results)
        }
    })
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})