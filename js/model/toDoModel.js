const knex = require('../../node_modules/knex')

const toDoModel = {
    async getToDos(req, res) {
        try {
            const values = await this.knex.select().from('to_dos')
            res.send(values)
        } catch(err) {
            console.error('error fetching to-dos', err)
            res.status(500).send('internal server error')
        }
    },
    
    async getToDo(req, res) {
        try {
            const value = await this.knex('to_dos').where('id', req.params.id).select()
            res.send(value)
        } catch(err) {
            console.error('Error fetching request', err)
            res.status(500).send('internal server error')
        }
    },
    
    async getCurrentToDos(req, res) {
        try {
            const value = await knex('to_dos').where('membership', req.params.id).select()
            res.send(value)
        } catch (err) {
            console.error('error fetching request', err)
            res.status(500).send('internal server error')
        }
    },
    
    async postNewToDo(req, res) {
        try {
            await knex('to_dos').insert( req.body )
            res.send(`inserted new to-do as ${req.body.title}`)
        } catch(err) {
            console.error('error posting new to-do', err)
            res.status(500).send('internal server error')
        }
    }
}

module.exports.toDoModel = toDoModel