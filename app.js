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
        const values = await knex.select().from('users') 
        res.send(values)
    } catch (error) {
        console.error('Error fetching users:', error)
        res.status(500).send('Internal Server Error')
    }
})

app.get('/api/users/:id', async (req, res) => {
    try {
        const value = await knex('users').where('id', req.params.id).select()
        res.send(value)
    } catch (error) {
        console.error('Error fetching users:', error)
        res.status(500).send('Internal Server Error')
    }
})

app.get('/api/users/lists/:id', async (req, res) => {
    try {
        const value = await knex('lists').where('users_id', req.params.id).select()
        res.send(value)
    } catch(err) {
        console.error('Error fetching request', err)
        res.status(500).send('internal server error')
    }
})

app.get('/api/users/to_dos/:id', async (req, res) => {
    try {
        const value = await knex('to_dos').where('users_id', req.params.id).select()
        res.send(value)
    } catch(err) {
        console.error('Error fetching request', err)
        res.status(500).send('internal server error')
    }
})

app.get('/api/lists', async (req, res) => {
    try {
        const values = await knex.select().from('lists')
        res.send(values)
    } catch(err) {
        console.error('error fetching request', err)
        res.status(500).send('internal server error')
    }
})

app.get('/api/lists/:id', async (req, res) => {
    try {
        const value = await knex('lists').where('id', req.params.id).select()
        res.send(value)
    } catch(err) {
        console.error('error fetching request', err)
        res.status(500).send('internal server error')
    }
})

app.get('/api/to_dos', async (req, res) => {
    try {
        const value = await knex.select().from('to_dos')
        res.send(value)
    } catch (error) {
        console.error('error fetching request', error)
        res.status(500).send('Internal server error')
    }
})

app.get('/api/to_dos/:id', async (req, res) => {
    try {
        const value = await knex('to_dos').where('id', req.params.id).select()
        res.send(value)
    } catch(err) {
        console.error('Error fetching request', err)
        res.status(500).send('internal server error')
    }
})

app.get('/api/to_dos/current/:id', async (req, res) => {
    try {
        const value = await knex('to_dos').where('membership', req.params.id).select()
        res.send(value)
    } catch (err) {
        console.error('error fetching request', err)
        res.status(500).send('internal server error')
    }
})


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})