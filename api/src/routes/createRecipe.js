const { Router } = require('express');
const {Recipe, Diet} = require('../db.js')

const router = Router();

// realizo la ruta para traer todas las recetas.


router.post('/', async (req, res) => {
    
    let{
        name,
        summary,
        score,
        healthScore,
        steps,
        createdInDb,
        diets   
    } = req.body
    
    if(!name || !summary){
        return res.status(500).send("Upss! Incomplete data, please try again.");
    } else {
        let recipeCreate = await Recipe.create({ 
            name,
            summary,
            score,
            healthScore,
            steps,
            createdInDb
        })
        let dietDB = await Diet.findAll({ 
            where: {name: diets}
        })

        recipeCreate.addDiet(dietDB);
        res.send('Succesfull');
    }

})


module.exports = router;
