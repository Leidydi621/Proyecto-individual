const { Router } = require('express');

//importo las funciones del controlador
const { allRecipes, getRecipeById} = require('../controller/recipes');


const router = Router();

// Creo las rutas a /recipes

// GET /recipes?name="...":

router.get('/recipes', async (req, res) => {
    const name = req.query.name;
    let recipesTotal = await allRecipes();
    if (name){
        let RecipeName = await recipesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        RecipeName ?
        res.send(RecipeName)  :
        res.status(404).send("This recipe doesn't exist")
    } else {
        res.send(recipesTotal)
    }
})

//GET /recipes/{idReceta}:

router.get('/recipes/:id', getRecipeById)

// GET /types




module.exports = router;
