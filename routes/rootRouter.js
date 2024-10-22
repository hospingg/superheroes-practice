const express = require('express');
const superheroRouter = require('./superheroRouter')
const rootRouter = express.Router();

rootRouter.use('/superhero', superheroRouter)

module.exports = rootRouter;
