const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipes = require('./recipes.js');
const diets = require('./diet.js');
const createRecipe = require('./createRecipe');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/', recipes); // rutas getByName, getById. 
router.use('/diet', diets); // ruta /types la cambie por diets
router.use('/recipe', createRecipe); // ruta post


module.exports = router;
