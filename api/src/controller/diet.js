const axios = require('axios');
require('dotenv').config();
const {MY_APIKEY, API_URL,API_URL_ID} = process.env;
const {Diet, Recipe} = require('../db.js') // traigo los modelos/entidades de la db
const {allRecipes} = require('../controller/recipes')

// creo la funcion controladoras de Diets 




async function allDiets(req, res) {

    const infoApi = await allRecipes(); // uso la funcion que trae las recetas 
    const allDiets = await infoApi.map(el =>
        el.diets.map(el => el)                  // me traigo los arrays de dietas
    )
    const results = [];
    allDiets.map(el => {
        for (var i = 0; i < allDiets.length; i++) {     // entro a cada array con el map e itero cada uno  
                                                        //para ser llevado al nuevo array results
         results.push(el[i]);
            
    }})
    

    //return results;

const dataArr = new Set(results)    //seteo results porque me llegan repetidos y los guardo en result
let result = [...dataArr]

 result.forEach(one => {
    if (one){
        Diet.findOrCreate({
            where: { name: one}
        });
    }
});
    
const diets = await Diet.findAll();
 return diets

};

    





module.exports = { allDiets}