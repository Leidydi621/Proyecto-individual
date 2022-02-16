const { Router } = require('express');
const {Recipe, Diet} = require('../db.js')

const router = Router();

// realizo la ruta para traer todas las recetas.


router.post('/', async (req, res) => {
    
    let{
        name, 
        diets,
        summary,
    } = req.body
    
    if(!name || !summary){
        return res.status(500).send("Upss! Incomplete data, please try again.");
    } else {
        let recipeCreate = await Recipe.create({ 
            name : req.body.name,
            img: req.body.img,
            summary : req.body.summary,
            score : Number(req.body.score),
            healthScore: Number(req.body.healthScore),
            steps : req.body.steps,
        })
        let dietDB = await Diet.findAll({ 
            where: {name: diets}
        })

        recipeCreate.addDiet(dietDB);
        res.send('Succesfull');
    }


})


module.exports = router;
