const knex = require('./knexConnection.js') 

const users = {
    async getUsers (req, res) {
        try {
            const values = await knex.select().from('users') 
            res.send(values)
        } catch(err) {
            console.error('error fetching users', err)
            res.status(500).send('internal server error')
        }
    },
    
    async getUser (req, res) {
        try {
            const value = await knex('users').where('id', req.params.id).select()
            res.send(value)
        } catch(err) {
            console.error('error fetching user', err)
            res.status(500).send('internal server error')
        }
    },
    
    async getUserLists (req, res) {
        try {
            const values = await knex('lists').where('users_id', req.params.id).select()
            res.send(values)
        } catch(err) {
            console.error('error fetching request', err)
            res.status(500).send('internal server error')
        }
    },
    
    async getUserToDos(req, res) {
        try {
            const values = await knex('to_dos').where('users_id', req.params.id).select()
            res.send(values)
        } catch(err) {
            console.error('error fetching request', err)
            res.status(500).send('internal server error')
        }
    },
    
    async postNewUser(req, res) {
        try {
            await knex('users').insert( req.body )
            res.send(`inserted new user as ${ req.body.username }`)
        } catch(err) {
            console.error('error posting new user', err)
            res.status(500).send('internal server error')
        }
    }
}

module.exports.users = users