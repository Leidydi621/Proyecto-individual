const axios = require('axios');
require('dotenv').config();
const {MY_APIKEY, API_URL,API_URL_ID} = process.env;
const {Diet, Recipe} = require('../db.js') // traigo los modelos/entidades de la db

// creo las funciones controladoras que traeran la info de la api y de la db
// funcion para la api

const getApiInfo = async () => {
    
    const apiUrl = await axios.get(`${API_URL}/recipes/complexSearch?apiKey=${MY_APIKEY}&addRecipeInformation=true&number=100`);
    const allData = await Promise.all(apiUrl.data.results)
    

    const allRecipes = await allData.map(el => {
        return {
            id: el.id,
            name: el.title,
            score: el.spoonacularScore,
            healthScore: el.healthScore,
            image: el.image, 
            dishTypes:el.dishTypes,
            diets: el.diets.map(el => el), 
            summary: el.summary, // 
            steps: el.analyzedInstructions.map(el => { //realice la busqueda de step dentro del array analyzed 
                return el.steps?.map(el =>{ //dentro de step realice otro mapeo para que trajera lo que necesitaba.
                    return{
                        number: el.number,
                        step: el.step,
                    }
                })
            }),
            
        }
    })
    
    return allRecipes;
}

// funcion para la db

const getDbInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes : []
            }
        } 
    })
}

// uno la info de ambas funciones para la api y la db

const allRecipes = async()=> {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allDataInfo = [...dbInfo, ...apiInfo]; // concateno la información esto es lo mismo que dbInfo.concat(apiInfo)
    return allDataInfo;
}

//funcion para la busqueda por id a la Db y la Api


const getDbById = async (id) => {
    return await Recipe.findByPk(id, {
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
}

const getRecipeId = async (req, res) => {
    const {id} = req.params;
    const recipeArr = [];
    if (id ) {
        const recipeById = await axios.get(`${API_URL_ID}${id}/information?apiKey=${MY_APIKEY}&addRecipeInformation=true&number=100`)
        const recipe = await recipeById.data;
        recipeArr.push(recipe);

        const recipeId = recipeArr.map(el => {
            return{
                id: el.id,
                name:el.title,
                score: el.spoonacularScore,
                healthScore: el.healthScore,
                image: el.image, 
                dishTypes:el.dishTypes,
                diets: el.diets.map(el => el), 
                summary: el.summary,  
                steps: el.analyzedInstructions.map(el => { 
                    return{
                        steps: el.steps?.map(el =>{ 
                            return{
                                number: el.number,
                                step: el.step,
                                ingredients:el.ingredients?.map(el => el.name) 
                            }
                        })
                    }
                }),
       
            }
        
        })

        res.send(recipeId);      
    } else {
        let dbRecipesById = await getDbById(id);            
        return res.status(200).json(dbRecipesById)
    }

}



    




module.exports = { getApiInfo, getDbInfo, allRecipes, getRecipeId}