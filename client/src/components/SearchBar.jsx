import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipesByName } from '../actions';

import style from './SearchBar.module.css';

export default function SearchBar(){
    const dispatch = useDispatch()
    const [input, setInput] = useState('');

    function handleChange(e){
        e.preventDefault();
        setInput(e.target.value);
    };

    function handleSubmit(e){
        try {
            dispatch(getRecipesByName(input));
        } catch (e) {
            return e;
        }
        setInput('')
    }


    return(
    <div className={style.search}>
            <input className={style.searchInput} type="text" placeholder="Search recipe by name" value={input} onChange={e => handleChange(e)}/>
            <button className={style.searchButton} type="submit" onClick={e => handleSubmit(e)}>Search</button>
        </div>
    )
}