import {
    GET_RECIPES, 
    GET_DIETS, 
    FILTER_BY_DIETS, 
    SEARCH_RECIPE, 
    CREATE_RECIPE, 
    GET_RECIPE_ID, 
    ALPHABETICAL_SORT,
    SCORE_SORT,

} from '../actions'


const initialState = {
    recipes : [],
    allRecipes: [],
    diets : [],
    detail: [],
    
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
          const allRecipes = state.recipes

          let dietFilter = action.payload === 'ALL' ? state.recipes : allRecipes.filter((i) => i.diets.includes(action.payload));
          return {
              ...state,
              recipes: dietFilter
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
            let totalScore = action.payload === 'Minor'?
            state.allRecipes.sort(function(a,b){
                if (a.score > b.score){
                    return 1
                }
                if (b.score > a.score){
                    return -1
                }
                return 0
            }):
            state.recipes.sort(function(a,b){
                if (a.score > b.score){
                    return -1
                }
                if (b.score > a.score){
                    return 1
                }
                return 0
            })
            return {
                ...state,
                recipes: totalScore
            }  
            
        case SEARCH_RECIPE:
            if (action.payload.length <1){
                alert("Recipe not found")
            } else{

                return{
                    ...state,
                    recipes : action.payload
                }
            }
            
        case GET_DIETS:
          
            return{
                ...state,
                diets: action.payload
            }
          
              
        case GET_RECIPE_ID:
        return {
          ...state,
          detail: action.payload, 
        
        }

        case CREATE_RECIPE:
            return {
              ...state,
            }     
            
            
            default:
                return state;
    }
}


export default rootReducer;