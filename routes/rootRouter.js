const express = require('express');
const superheroRouter = require('./superheroRouter')
const superpowerRouter = require('./superpowerRouter')
const pictureRouter = require('./pictureRouter')
const rootRouter = express.Router();

rootRouter.use('/superhero', superheroRouter)
rootRouter.use('/superpower', superpowerRouter)
rootRouter.use('/picture', pictureRouter)

module.exports = rootRouter;
