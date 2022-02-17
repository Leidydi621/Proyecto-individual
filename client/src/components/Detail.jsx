import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeById } from '../actions';
import { useEffect } from 'react';
import { useParams } from "react-router";



function Detail() {
    let { id } = useParams();
    const dispatch = useDispatch();
    const detail = useSelector((state) => state.detail);
    


    useEffect(() => {
        dispatch(getRecipeById(id));
    }, [dispatch, id]);

    const diets  = detail[0] ? detail[0].diets : detail.diets;
    
    
    return (
        <div >
        
             {detail &&(
            <div >
               
            <div  >{detail[0] ? detail[0].name : detail.name}</div>
            <img src={detail[0] ? detail[0].image : detail.image} alt="" />
            <div  >⛧⛧{detail[0] ? detail[0].spoonacularScore : detail.spoonacularScore}⛧⛧</div>
            <div >Health Score: {detail[0] ? detail[0].healthScore : detail.healthScore} </div>
            <div >{diets?.map((e) => {
                    return (
                        <h5 key={e}> {e.name ? e.name: e} </h5> 
                    )
                })} </div>
                <h2 >Summary</h2>
            <div > {detail[0] ?  detail[0].summary.replace(/<[^>]*>?/g, '') : detail.summary} </div>
                <h2 >Instructions</h2>
            <div > {detail[0] ? detail[0].instructions : detail.instructions} </div>
            
            
            </div>
            )}
             <Link to= '/home'>
                    <button >Go Home...</button>
                </Link>
        </div>
    )
}

export default Detail