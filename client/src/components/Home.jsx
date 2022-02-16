import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    getRecipes, 
    getDiets,
    filterRecipesByDiets,
    aplhabeticalSort, 
    scoreSort
} from '../actions';
import {Link} from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';


export default function Home() {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes) // me traigo todo lo que esta en el estado de recipes.
  
    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9) //seteo la cantidad de cartas que quiero que se muestre.
    const indexOfLastRecipe = currentPage * recipesPerPage // me muestra en la pagina actual 9 recetas
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage //
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)


    let diets = useSelector((state) => state.diets)

    const [order, setOrder] = useState('')
   

    //paginado por numero de paginas
    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber);
    }     

    useEffect(() => {                   //  el componente se ejecuta si tiene el dispatch.
        dispatch(getRecipes());
    },[dispatch])

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch])


    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
    }

    function handlefilterRecipesByDiets(e){
        e.preventDefault();
        dispatch(filterRecipesByDiets(e.target.value));
        setCurrentPage(1)
    }

    function handleAlphabeticalSort(e){
        e.preventDefault();                
        dispatch(aplhabeticalSort(e.target.value))
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`);
    }

    function handleScoreSort(e) {
        e.preventDefault();                
        dispatch(scoreSort(e.target.value));
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`);
    }

    


        // renderizo mis componentes
    return (
        <div>
            <Link to= '/recipe'>Create Recipe</Link>
            <h1>MY CUSINART RECIPES</h1>
            <button onClick={e=> {handleClick(e)}}>
                Charge all recipes
            </button>
            <div>
                <select onChange={e => handleScoreSort(e)}>
                    <option value= 'acs'>Ascendent</option>
                    <option value= 'desc'>Descendent</option>
                </select>
                <select onChange={handlefilterRecipesByDiets}>
                    <option value='diets'>All Diet</option>
                    {diets.map(e=> (
                        <option key={e}>{e}</option>
                    ))}
                </select>
                <select className="select" name="alphabetical" onChange={e => handleAlphabeticalSort(e)}>
                    <option disabled selected>Alphabetical</option>
                    <option value="atoz">A to Z</option>
                    <option value="ztoa">Z to A</option>
                </select>

                <SearchBar/>
                   
                <div>
                <Paginado 
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    paginado={paginado}
                />
                </div>

            {
                currentRecipes?.map(el=> {
                    return(
                        <Link to= {'/detail'+ el.id} key={el.id}>
                        <Card 
                            image={el.image? 
                                el.image : 'https://cdn.colombia.com/sdi/2019/01/29/5-recetas-para-preparar-en-menos-de-30-minutos-705865.jpg'
                            } 
                            name={el.name} 
                            diets={el.diets}/> 
                        </Link>
                    )
                })
            }

            </div>

        </div>
    )

}