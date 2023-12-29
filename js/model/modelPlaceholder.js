require('dotenv').config()
const userModel = require('./userModel')
const listsModel = require('./listsModel')
const toDoModel = require('./toDoModel')

//const cors = require('cors')

const express = require('express')
const app = express()

app.use(express.json())
//app.use(cors())

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
})

const port = 3000

app.get('/api/users')

app.get('/api/users/:id')

app.get('/api/users/lists/:id')

app.get('/api/users/to_dos/:id')

app.get('/api/lists')

app.get('/api/lists/:id')

app.get('/api/to_dos')

app.get('/api/to_dos/:id')

app.get('/api/to_dos/current/:id')

app.post('/api/users')

app.post('/api/lists')

app.post('/api/to_dos')

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})

console.log(userModel, listsModel, toDoModel)