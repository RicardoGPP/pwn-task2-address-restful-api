//Imports required dependencies.
const express = require('express');
const knexconfig = require('../knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(knexconfig);

//Creates a new route to be used by addresses.
const router = express.Router();

//Defines the address table name.
const table = 'endereco';

//Sets 'post address' middleware.
router.post('/', (req, res) => {
    knex(table)
        .insert(req.body)
        .then(ids => {
            return knex(table)
                .where({id: ids[0]})
                .first();
        })
        .then(address => res.status(201).json(address))
        .catch(error => res.status(500).send(`Error inserting address: ${error.message}.`))
});

//Sets 'get all address' middleware.
router.get('/', (_, res) => {
    knex(table)
        .select('*')
        .then(addresses => res.status(200).json(addresses))
        .catch(error => res.status(500).send(`Error getting addresses: ${error.message}.`))
});

//Sets 'get address by id' middleware.
router.get('/:id', (req, res) => {
    const id = req.params.id;

    knex(table)
        .select('*')
        .where({id})
        .first()
        .then(address => {
            if (!address) {
                res.status(404).send(`No address could be found with ID ${id}.`);
            } else {
                res.status(200).json(address);
            }
        })
        .catch(error => res.status(500).send(`Error getting address of ID ${id}: ${error.message}.`));
});

//Sets 'put address' middleware.
router.put('/:id', (req, res) => {
    const id = req.params.id;

    knex(table)
        .where({id})
        .update(req.body)
        .then(() => {
            return knex(table)
                .select('*')
                .where({id})
                .first();
        })
        .then(address => {
            if (!address) {
                res.status(404).send(`No address could be found with ID ${id}.`);
            } else {
                res.status(200).json(address)
            }
        })
        .catch(error => res.status(500).send(`Error updating address of ID ${id}: ${error.message}.`));
});

//Sets 'delete address' middleware.
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    knex(table)
        .select('*')
        .where({id})
        .first()
        .then(address => {
            if (!address) {
                return Promise.resolve(null);
            }
            return knex(table)
                    .where({id})
                    .delete()
                    .then(() => address);
        })
        .then(address => {
            if (!address) {
                res.status(404).send(`No address could be found with ID ${id}.`);
            } else {
                res.status(200).json(address)
            }
        })
        .catch(error => res.status(500).send(`Error deleting address of ID ${id}: ${error.message}.`));
});

//Exports router.
module.exports = router;