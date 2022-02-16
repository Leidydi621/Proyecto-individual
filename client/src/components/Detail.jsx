import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions';
import { useEffect } from 'react';



function Detail(props) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
        
    }, [dispatch]);

    const myRecipe  = useSelector((state) => state.detail);
 
    

    
  return (
    <div>
        {
            myRecipe?
                    <div className='detailContainer'>
                        <div className='detailCard'>

                            <h1>{myRecipe[0].name}</h1>
                            <img className='img' src={myRecipe[0].image} alt='' width='450px' height='400px' />
                            <h3>Health Score: {myRecipe[0].healthScore} </h3>
                            <h3>Score: {myRecipe[0].score}</h3>
                            <h3>Summary: </h3><p><b>{myRecipe[0].summary}</b></p>
                            <h3>Diets: </h3> <b>{myRecipe[0].diets.map(el => el.name + ' ') } </b>
                            <h3>Steps: </h3> <b>{myRecipe[0].steps} </b>

                        </div>
                    </div>
                    : <p>Loading...</p>
            }
            <Link to='/home'><button className='btnDetail'>Back   </button></Link>
    </div>
  )
}

export default Detail