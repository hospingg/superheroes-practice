const { Superhero } = require('../models')
const { Op } = require('sequelize');
module.exports.createOne = async(req, res, next) =>{
    try{
        const { body } = req;
        const superhero = await Superhero.create(body)
        res.status(201).send(superhero)
    }catch(err){
        res.status(400).send('Something goes wrong')
        console.log(err)
    }
}
module.exports.getAll = async(req, res, next) =>{
    try{
        const superheroes = await Superhero.findAll()
        res.status(200).send(superheroes)
    }catch(err){
        res.status(400).send('Something goes wrong')
        console.log(err)
    }
}
module.exports.getOne = async(req, res, next) =>{
    try{
        const { params: {id} } = req;
        const superheroes = await Superhero.findByPk(id)
        res.status(200).send(superheroes)
    }catch(err){
        res.status(400).send('Something goes wrong')
        console.log(err)
    }
}
module.exports.updateOne = async(req, res, next) =>{
    try{
        const { params: {id} } = req;
        const superheroes = await Superhero.update({
            where:{
                id: id
            }
        })
        res.status(200).send(superheroes)
    }catch(err){
        res.status(400).send('Something goes wrong')
        console.log(err)
    }
}
module.exports.deleteOne = async(req, res, next) =>{
    try{
        const { params: {id} } = req;
        const foundHero = await Superhero.findByPk(id)
        if(!foundHero){
            res.status(400).send('Whit superhero does not exist')
        }
        else{
            const deleted = await foundHero.destroy()
            res.status(200).send({deletedData:deleted})
        }
        
    
    }catch(err){
        res.status(400).send('Something goes wrong')
        console.log(err)
    }
}
