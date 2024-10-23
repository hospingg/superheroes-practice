const { Superhero, Superpower, Picture } = require('../models');
// const Picture = require('../models/Picture');
const PictureController = require('./Picture.controller');

module.exports.createOne = async (req, res, next) => {
    try {
        const { nickName, realName, originDescription, catchPhrase, superpowers } = req.body;

        // Створюємо героя
        const superhero = await Superhero.create({
            nickName,
            realName,
            originDescription,
            catchPhrase,
        });

        // Додаємо всі суперсили, які передані масивом
        if (superpowers && superpowers.length > 0) {
            const powerInstances = await Superpower.findAll({
                where: {
                    id: superpowers,
                },
            });

            // Додаємо всі суперсили до героя
            await superhero.addSuperpowers(powerInstances);
        }

        res.status(201).send({ data: superhero });
    } catch (err) {
        console.log(err);
        res.status(400).send('Something went wrong');
    }
};

module.exports.getAll = async (req, res, next) => {
    try {
        const { page = 1, limit = 5 } = req.query; 
        const offset = (page - 1) * limit;

        const { count, rows: superheroes } = await Superhero.findAndCountAll({
            include: [
                {
                    model: Superpower,
                    through: { attributes: [] },
                    attributes: ['powerName'],
                }
            ],
            limit: Number(limit),
            offset: Number(offset),
            distinct: true
        });

        const totalPages = Math.ceil(count / limit);

        res.status(200).send({
            data: superheroes,
            meta: {
                totalPages,
                currentPage: Number(page),
                totalSuperheroes: count
            }
        });
    } catch (err) {
        res.status(400).send('Something goes wrong');
        console.log(err);
    }
};


module.exports.getOne = async (req, res, next) => {
    try {
        const { params: { id } } = req;
        const superhero = await Superhero.findByPk(id, {
            include: [
                {
                    model: Superpower,
                    through: { attributes: [] },
                    attributes: ['powerName'],
                },
            ],
        });
        if (!superhero) {
            res.status(404).send('This superhero does not exist');
        } else {
            res.status(200).send({data: superhero});
        }
    } catch (err) {
        res.status(400).send('Something goes wrong');
        console.log(err);
    }
};
module.exports.updateOne = async (req, res, next) => {
    try {
        const { body, params: { id } } = req;
        const { superpowers } = body; // Масив ідентифікаторів суперсил
        const { files } = req; // Масив файлів картинок

        const superhero = await Superhero.findByPk(id);
        if (!superhero) {
            return res.status(404).send('This superhero does not exist');
        }

        // Оновлення даних супергероя
        await superhero.update(body);

        // Оновлення суперсил
        if (superpowers?.length) {
            const powers = await Superpower.findAll({
                where: {
                    id: superpowers
                }
            });
            await superhero.setSuperpowers(powers); // Заміна існуючих суперсил
        }

        // Додавання нових картинок
        if (files?.length) {
            const pictures = files.map(file => ({ src: file.filename, superheroId: superhero.id }));
            await Picture.bulkCreate(pictures);
        }

        res.status(200).send({ updatedData: superhero });
    } catch (err) {
        res.status(400).send('Something goes wrong');
        console.log(err);
    }
};

module.exports.deleteOne = async(req, res, next) =>{
    try{
        const { params: {id} } = req;
        const foundHero = await Superhero.findByPk(id)
        if(!foundHero){
            res.status(404).send('This superhero does not exist')
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
module.exports.addPowerToHero = async(req, res, next) =>{
    try{
        const { params:{ heroId, powerId }  } = req;
        const powerInstanse = await Superpower.findByPk(Number(powerId))
        const heroInstanse = await Superhero.findByPk(Number(heroId))
        
        if (heroInstanse && powerInstanse){
            await heroInstanse.addSuperpower(powerInstanse)
            res.status(200).send({
                meta:{
                    powerAdded: powerId
                }
            })
        }
        else if(!heroInstanse || !powerInstanse){
            res.status(404).send('This superhero or power does not exist')
        }
    
    }catch(err){
        res.status(400).send('Something goes wrong')
        console.log(err)
    }
    
}

module.exports.deletePowerFromHero = async (req, res, next) => {
    try {
        const { heroId, powerId } = req.params;
        
        const hero = await Superhero.findByPk(heroId);
        const power = await Superpower.findByPk(powerId);

        if (!hero || !power) {
            return res.status(404).send('Superhero or Superpower not found');
        }
        await hero.removeSuperpower(power);

        res.status(200).send({
            message: `Power with id ${heroId} was deleted to superhero with id ${powerId}`
        });
    } catch (err) {
        res.status(400).send('Something goes wrong');
        console.log(err);
    }
}