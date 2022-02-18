import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeById } from '../actions';
import { useEffect } from 'react';
import { useParams } from "react-router";

import style from './Detail.module.css'


function Detail() {
    let { id } = useParams();
    const dispatch = useDispatch();
    const detail = useSelector((state) => state.detail);
    


    useEffect(() => {
        dispatch(getRecipeById(id));
    }, [dispatch, id]);

    const diets  = detail[0] ? detail[0].diets : detail.diets;
    
    
    return (
        <div className={style.details}>
        
             {detail &&(
            <div className={style.divimg}>
               
            <div className={style.texts} >{detail[0] ? detail[0].name : detail.name}</div>
            <img className={style.detailImg}src={detail[0] ? detail[0].image : detail.image} alt="" />
            <div className={style.texts}>Score: {detail[0] ? detail[0].score : detail.score}</div>
            <div className={style.texts}>Health Score: {detail[0] ? detail[0].healthScore : detail.healthScore} </div>
            <div className={style.ddsh}>
                <h2 className={style.texts}>Diet type:</h2>
                {diets?.map((e) => {
                    return (
                        <h5 className={style.texts} key={e}> {e.name ? e.name: e} </h5> 
                    )
                })} </div>
                <h2 className={style.texts}>Summary</h2>
            <div className={style.texts}> {detail[0] ?  detail[0].summary.replace(/<[^>]*>?/g, '') : detail.summary} </div>
                <h2 className={style.texts}>Instructions</h2>
            <div className={style.texts}> {detail[0] ? detail[0].instructions : detail.instructions} </div>
            
            
            </div>
            )}
             <Link to= '/home'>
                    <button className={style.backButton}>Go Home...</button>
                </Link>
        </div>
    )
}

export default Detail