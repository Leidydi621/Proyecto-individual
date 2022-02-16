import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES'
export const FILTER_BY_DIETS = 'FILTER_BY_DIETS'
export const GET_DIETS = 'GET_DIETS'
export const SEARCH_RECIPE = 'SEARCH_RECIPE'
export const CREATE_RECIPE = 'CREATE_RECIPE'
export const GET_RECIPE_DETAIL = 'GET_RECIPE_DETAIL'
export const ALPHABETICAL_SORT = 'ALPHABETICAL_SORT'
export const SCORE_SORT = 'SCORE_SORT'



export function getRecipes(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/recipes'); 
        
        return dispatch({
            type: GET_RECIPES,
            payload: json.data
        })
    }
    
}

export function getDiets(){
    return async function(dispatch){
        try {
            let info = await axios.get('http://localhost:3001/diet/'); 
            
            return dispatch({
                type: GET_DIETS,
                payload: info.data.map(d => d.name) 
            })
        } catch (error) {
            console.error(error)
        }

    }
}

export function getRecipesByName(payload){
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/recipes?name=${payload}`);
            return dispatch({
                type: SEARCH_RECIPE,
                payload: response.data 
            })
            
        } catch (error) {
            return alert ('Recipe Not Found')
        }


    }
}


export function createRecipe (payload){
    return async function(dispatch){
        try {
            const response = await axios.post('http://localhost:3001/recipe', payload);
            
            return dispatch({
            type: CREATE_RECIPE,
            payload :response
        })


        } catch (e) {
            console.log(e)
        }
    }
}

export function getDetails(payload){
    return async function (dispatch){
        try {
            const response = await axios.post(`http://localhost:3001/recipes/${payload}`);
            
            return dispatch({
            type: GET_RECIPE_DETAIL,
            payload :response
            })
            
        } catch (e) {
            console.log(e)
        }
    }
}



export function filterRecipesByDiets(payload){
    return {
        type: FILTER_BY_DIETS,
        payload
    }
}

export function aplhabeticalSort(payload) {
    return {
        type: ALPHABETICAL_SORT,
        payload
    }
};

export function scoreSort(payload) {
    return {
        type: SCORE_SORT,
        payload
    }
}
