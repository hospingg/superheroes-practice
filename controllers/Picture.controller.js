const { Picture } = require('../models');
const Superhero = require('../models/Superhero');
module.exports.createOne = async(req, res, next) =>{
    try{
        const { superheroId } = req.params;
        const { filename } = req.file;
        const picture = await Picture.create({ superheroId, src: filename });
        res.status(201).send({data: picture})
    }catch(err){
        res.status(400).send('Something goes wrong')
        console.log(err)
    }
}
module.exports.getAll = async(req, res, next) =>{
    try{
        const pictures = await Picture.findAll()
        res.status(200).send(pictures)
    }catch(err){
        res.status(400).send('Something goes wrong')
        console.log(err)
    }
}
module.exports.getOne = async(req, res, next) =>{
    try{
        const { params: {id} } = req;
        const picture = await Picture.findByPk(id)
        if(!picture){
            res.status(400).send('This picture does not exist')
        }
        else{
            res.status(200).send({data: picture})
        }
    }catch(err){
        res.status(400).send('Something goes wrong')
        console.log(err)
    }
}
module.exports.deleteOne = async(req, res, next) =>{
    try{
        const { params: {id} } = req;
        const foundPicture = await Picture.findByPk(id)
        if(!foundPicture){
            res.status(400).send('This picture does not exist')
        }
        else{
            const deleted = await foundPicture.destroy()
            res.status(200).send({deletedData:deleted})
        }
        
    
    }catch(err){
        res.status(400).send('Something goes wrong')
        console.log(err)
    }
}