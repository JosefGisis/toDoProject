const express = require('express')
const router = express.Router()

const knex = require('./knexConnection')

router.get('/', async (req, res) => {
    try {
        const values = await knex.select().from('lists')
        res.send(values)
    } catch(err) {
        console.error('error fetching lists', err)
        res.status(500).send('internal server error')
    }
})

router.get('/:id', async (req, res) => {
    try {
        const value = await knex('lists').where('id', req.params.id).select()
        res.send(value)
    } catch(err) {
        console.error('error fetching list', err)
        res.status(500).send('internal server error')
    }
})

router.post('/', async (req, res) => {
    try {
        await knex('lists').insert( req.body )
        res.send(`inserted ${ req.body }`)
    } catch(err) {
        console.error('error posting new list', err)
        res.status(500).send('internal server error')
    }
})

module.exports = router