import React from 'react';
import styles from './Paginado.module.css';


export default function Paginado({recipesPerPage, allRecipes, paginado}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++) {
        pageNumbers.push(i)
    }
    
    return(
        <nav>
            {pageNumbers && pageNumbers.map(number => (
                <button className={styles.styleBtn} key={number} onClick= {() => paginado( number )}>{number}</button>
            ))}
           
        </nav>
    )
}