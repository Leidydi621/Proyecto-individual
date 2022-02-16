const { Router } = require('express');

//importo las funciones del controlador
const { allDiets } = require('../controller/diet')


const router = Router();

// Creo las rutas a /types

router.get('/', async (req, res)=> {
    const dbDiets = await allDiets();
    res.status(200).send(dbDiets)
});



module.exports = router;