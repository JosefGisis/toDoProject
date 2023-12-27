require('dotenv').config()

const express = require('express')
const app = express()
app.use(express.json())

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

app.get('/api/users', async (req, res) => {
    try {
        const value = await knex.select().from('users').as('all_users')
        const otherValues = await knex.column('id', 'username').select().from('users').offset(4) 
        res.send(otherValues)
    } catch (error) {
        console.error('Error fetching users:', error)
        res.status(500).send('Internal Server Error')
    }
})

app.get('/api/to_dos', async (req, res) => {
    try {
        const value = await knex.select().from('to_dos')
        res.send(value)
    } catch (error) {
        console.error('error fetching request', error)
        res.status(500).send('Internal server error', error)
    }
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})