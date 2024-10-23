const express = require('express');
const superheroRouter = express.Router();
const SuperheroController  = require('../controllers/Superhero.controller')
const multer = require('multer');
const path = require('path');

const STATIC_PATH = path.resolve(__dirname, '../public/images');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, STATIC_PATH);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}.${file.originalname}`);
    }
});

const upload = multer({ storage });

superheroRouter.post('/', upload.array('image', 10), SuperheroController.createOne); 
superheroRouter.put('/:id', upload.array('image', 10), SuperheroController.updateOne);
superheroRouter.get('/', SuperheroController.getAll);
superheroRouter.get('/:id', SuperheroController.getOne);
superheroRouter.delete('/:id', SuperheroController.deleteOne);

superheroRouter.put('addPower/:heroId/:powerId', SuperheroController.addPowerToHero);
superheroRouter.delete('deletePower/:heroId/:powerId', SuperheroController.deletePowerFromHero);

module.exports = superheroRouter;