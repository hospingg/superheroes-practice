const { Superpower } = require('../models')
module.exports.createOne = async(req, res, next) =>{
    try{
        const { body } = req;
        const superhero = await Superpower.create(body)
        res.status(201).send(superhero)
    }catch(err){
        res.status(400).send('Something goes wrong')
        console.log(err)
    }
}
module.exports.getAll = async(req, res, next) =>{
    try{
        const superpowers = await Superpower.findAll()
        res.status(200).send(superpowers)
    }catch(err){
        res.status(400).send('Something goes wrong')
        console.log(err)
    }
}
module.exports.getOne = async(req, res, next) =>{
    try{
        const { params: {id} } = req;
        const superpowers = await Superpower.findByPk(id)
        res.status(200).send(superpowers)
    }catch(err){
        res.status(400).send('Something goes wrong')
        console.log(err)
    }
}
module.exports.updateOne = async(req, res, next) =>{
    try{
        const { params: {id} } = req;
        const superpowers = await Superpower.update({
            where:{
                id: id
            }
        })
        res.status(200).send(superpowers)
    }catch(err){
        res.status(400).send('Something goes wrong')
        console.log(err)
    }
}
module.exports.deleteOne = async(req, res, next) =>{
    try{
        const { params: {id} } = req;
        const foundHero = await Superpower.findByPk(id)
        if(!foundHero){
            res.status(400).send('This superpower does not exist')
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