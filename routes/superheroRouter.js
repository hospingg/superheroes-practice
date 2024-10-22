const express = require('express');
const superheroRouter = express.Router();
const SuperheroController  = require('../controllers/Superhero.controller')


superheroRouter.post('/', SuperheroController.createOne);
superheroRouter.get('/', SuperheroController.getAll);
superheroRouter.get('/:id', SuperheroController.getOne);
superheroRouter.put('/:id', SuperheroController.updateOne);
superheroRouter.delete('/:id', SuperheroController.deleteOne);


module.exports = superheroRouter;