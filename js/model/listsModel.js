const knex = require('../../node_modules/knex')

const listModel = {
    async getLists(req, res) {
        try {
            const values = await knex.select().from('lists')
            res.send(values)
        } catch(err) {
            console.error('error fetching lists', err)
            res.status(500).send('internal server error')
        }
    },
    
    async getList(req, res) {
        try {
            const value = await knex('lists').where('id', req.params.id).select()
            res.send(value)
        } catch(err) {
            console.error('error fetching list', err)
            res.status(500).send('internal server error')
        }
    },
    
    async postNewList (req, res) {
        try {
            await knex('lists').insert( req.body )
            res.send(`inserted new list as ${ req.body.title }`)
        } catch(err) {
            console.error('error posting new list', err)
            res.status(500).send('internal server error')
        }
    },
}

module.exports.listModel = listModel