const express = require('express');
const multer = require('multer');
const superheroPictureRouter = express.Router();
const PictureController  = require('../controllers/Picture.controller')
const path = require('path')

const STATIC_PATH = path.resolve(__dirname, '../public/images')

const storage = multer.diskStorage(
    {
        destination: function(req, file, cb){
            cb(null, STATIC_PATH)
        },
        filename: function(req, file, cb){
            cb(null, `${Date.now()}.${file.originalname}`)
        }
    }
)

const upload = multer({ storage })

superheroPictureRouter.post('/:superheroId/image', upload.single('image'), PictureController.createOne);
superheroPictureRouter.get('/', PictureController.getAll);
superheroPictureRouter.get('/:id', PictureController.getOne);
superheroPictureRouter.delete('/:id', PictureController.deleteOne);


module.exports = superheroPictureRouter;