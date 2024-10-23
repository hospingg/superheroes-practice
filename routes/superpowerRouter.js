const express = require('express');
const superpowerRouter = express.Router();
const SuperpowerController  = require('../controllers/Superpower.controller')


superpowerRouter.post('/', SuperpowerController.createOne);
superpowerRouter.get('/', SuperpowerController.getAll);
superpowerRouter.get('/:id', SuperpowerController.getOne);
superpowerRouter.put('/:id', SuperpowerController.updateOne);
superpowerRouter.delete('/:id', SuperpowerController.deleteOne);


module.exports = superpowerRouter;