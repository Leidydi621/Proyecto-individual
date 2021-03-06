const axios = require('axios');
require('dotenv').config();
const {MY_APIKEY, API_URL,API_URL_ID} = process.env;
const {Diet, Recipe} = require('../db.js') // traigo los modelos/entidades de la db

// creo la funcion controladoras de Diets 




async function allDiets(req, res) {

  
    const allData = await axios.get(`${API_URL}/recipes/complexSearch?apiKey=${MY_APIKEY}&addRecipeInformation=true&number=100`);
    const allInfo = allData.data.results.map(el => el.diets)
    
    const dietList = allInfo.join(",").split(",");

    const arr = [];

    

    for (i = 0; i < dietList.length; i++) { 
        await Diet.findOrCreate({ 
          where: { 
            name: dietList[i], 
          }, 
        }); 
      } 
      const dietsTypes = await Diet.findAll();
     
      dietsTypes.forEach(el => {
          if(el.name.length !==0){
              arr.push(el)
          }
      })
  

    return arr;
};
    





module.exports = { allDiets}