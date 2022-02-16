import {
    GET_RECIPES, 
    GET_DIETS, 
    FILTER_BY_DIETS, 
    SEARCH_RECIPE, 
    CREATE_RECIPE, 
    GET_RECIPE_DETAIL, 
    ALPHABETICAL_SORT,
    SCORE_SORT

} from '../actions'

const initialState = {
    recipes : [],
    allRecipes: [],
    diets : [],

}



function rootReducer (state = initialState, action){
    switch (action.type) {

        case GET_RECIPES:
            return{
                ...state,
                recipes : action.payload,
                allRecipes : action.payload
            }

            
        case FILTER_BY_DIETS:
            const allRecipes= state.allRecipes
            const statusFiltered =  allRecipes.filter(r => r.diets?.some(d => d.toLowerCase() === action.payload.toLowerCase())) 
            
            return{
                ...state,
                recipes : statusFiltered
            }

            case ALPHABETICAL_SORT:   
            let sortedRecipes = [...state.recipes]       
            sortedRecipes = action.payload === 'atoz' ?
            state.recipes.sort(function(a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              return 0;
            }) :
            state.recipes.sort(function(a, b) {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              return 0;
            });          
            return {
              ...state,
              recipes: sortedRecipes
            };
  
          case SCORE_SORT:
            let sortedRecipesByScore = [...state.recipes] 
            sortedRecipesByScore = action.payload === 'asc' ?
            state.recipes.sort(function(a, b) {
              if (a.score > b.score) return 1;
              if (a.score < b.score) return -1;
              return 0;
            }) :
            state.recipes.sort(function(a, b) {
              if (a.score < b.score) return 1;
              if (a.score > b.score) return -1;
              return 0;
            });
            return {
              ...state,
              recipes: sortedRecipesByScore
            };
  
            
        case SEARCH_RECIPE:
            return{
                ...state,
                recipes : action.payload
            }
            
        case GET_DIETS:
            return{
                ...state,
                diets: action.payload
            }
              
        case GET_RECIPE_DETAIL:
            return {
              ...state,
              recipeDetails: action.payload,
            };

        case CREATE_RECIPE:
            return {
              ...state,
            }     

            
            default:
                return state;
    }
}


export default rootReducer;