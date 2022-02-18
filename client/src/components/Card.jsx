import React from 'react';
import {Link} from 'react-router-dom';

import styles from './Card.module.css';




export default function Card(data){

    return (

        <div className={styles.card}>
        <div >
            <div>
                <div >
                <div className={styles.name}>{data.name}</div>
                <div >{data.score}</div>
                </div>
            <Link to = {`/details/${data.id}`}>
                
            </Link>
                <img className={styles.img}src={data.image} alt= "img not found" width= "150px" height= "150px" />
                
                <div >{data.diets?.map((e) => {
        
                    return (
                        
                        <p className={styles.diet} key={e}> {e.name ? e.name : e} </p>
                        
                    )
                   
                })} </div> 
                
            </div>
        </div>
        </div>
        
    )  

}
