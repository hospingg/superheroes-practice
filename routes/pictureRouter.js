const express = require('express');
const multer = require('multer');
const superheroPictureRouter = express.Router();
const PictureController  = require('../controllers/Picture.controller')
superheroPictureRouter.get('/', PictureController.getAll);
superheroPictureRouter.get('/:id', PictureController.getOne);
superheroPictureRouter.delete('/:id', PictureController.deleteOne);


module.exports = superheroPictureRouter;