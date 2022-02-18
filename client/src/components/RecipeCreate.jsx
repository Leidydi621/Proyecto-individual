import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import {createRecipe, getDiets} from '../actions'

import styles from './RecipeCreate.module.css';


// funcion controladora
function validate(input) {
    const errors = {};
    if (!input.name) errors.name = 'Please complete with a recipe name';
    if (!input.summary) errors.summary = 'Please add some comments about your recipe';
    if (input.score < 1 || input.score > 100) errors.score = 'The score must be a number between 1 and 100';
    if (input.healthScore < 1 || input.healthScore > 100) errors.healthScore = 'The score must be a number between 1 and 100';
    if (!input.steps.length) errors.steps = 'Please detail the steps for your recipe';
    if (!input.diets.length) errors.diets = 'You must select at least one diet type';
    return errors;
};

export default function CreateRecipe() {
    const dispatch = useDispatch();
    const diets = useSelector(state => state.diets);
    const history = useHistory();
    const [errors, setErrors] = useState({})
    
    const [input, setInput] = useState({
        name: ''  ,
        summary: '',
        score: '',
        healthScore: '',
        steps: '',
        diets: []
    })
    
    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);


    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]:e.target.value
        }))
      
      
    }

    
    function handleCheckBox(e) {
       
        let newArray = input.diets;
        let find = newArray.indexOf(e.target.value);
        
        if (find >= 0) {
            newArray.splice(find, 1)
        } else {
            newArray.push(e.target.value)
        }
        
        setInput({
            ...input,
            diets: newArray
        });
        const validations = validate(input);
        setErrors(validations)
        
    }
    
    function handleSubmit(e){
        e.preventDefault();
        if (Object.values(errors).length > 0) {
            alert("Please complete the information required");
        } else if (
           input.name === '' && 
           input.summary === '' && 
           input.score === '' &&
           input.healthScore === '' &&
           input.steps === '' &&
           !input.diets.length) {
           alert("Please complete the form");}
       else {
         dispatch(createRecipe(input))
        alert("Recipe Created!")
        setInput({
            name:"",
            summary: "", 
            score: "",
            healthScore: "",
            steps: "",
            diets: [],     
        })}
    
        history.push('/home')
    }


    
    
    return (
        <div className={styles.create}>
            <h1 className={styles.msg}>Create your own recipe!</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div className={styles.form}>
                    <div className={styles.prettierForm}>
                        <div className={styles.nameInput}>
                            <label className={styles.msgs}>Name:</label>
                            <input className={styles.inputs} name="name" type="text" value={input.name} onChange={e => handleChange(e)}/>
                            {errors.name && (
                                <span className={styles.errors}>{errors.name}</span>
                            )}
                        </div>
                        <div className={styles.nameInput}>
                            <label className={styles.msgs}>Summary:</label>
                            <textarea name="summary" type="text" rows="4" cols="30" value={input.summary} onChange={e => handleChange(e)}/>
                            {errors.summary && (
                                <span className="errors">{errors.summary}</span>
                            )}
                        </div>
                        <div className={styles.nameInput}>
                            <label className={styles.msgs}>Score:</label>
                            <input name="score" type="number" value={input.score} onChange={e => handleChange(e)}/>
                            {errors.score && (
                                <span className={styles.errors}>{errors.score}</span>
                            )}
                        </div>
                        <div className={styles.nameInput}>
                            <label className={styles.msgs}>Health Score:</label>
                            <input name="healthScore" type="number" value={input.healthScore} onChange={e => handleChange(e)}/>
                            {errors.healthScore && (
                                <span className={styles.errors}>{errors.healthScore}</span>
                            )}
                        </div>
                        <div className={styles.nameInput}>
                            <label className={styles.msgs}>Steps:</label>
                            <textarea name="steps" type="text" rows="4" cols="40" value={input.steps} onChange={e => handleChange(e)}/>
                            {errors.steps && (
                                <span className={styles.errors}>{errors.steps}</span>
                            )}
                        </div>
                    </div>
                    <div className={styles.checkSelect}>
                        <label className={styles.msgs}>Diet Types:</label>
                        {diets.map(d =>{
                            
                            return (
                                <div key={d} className={styles.checks}>
                                    <label className={styles.diets}>{d}</label>
                                    <input className={styles.checks} type="checkbox" name={d} value={d} select={input.diets.includes(d)} onChange={e => handleCheckBox(e)}/>
                                </div>
                            )
                        })}
                        {errors.diets && (
                            <span className={styles.errors}>{errors.diets}</span>
                        )}
                    </div>
                </div>
                <button className={styles.submitButton} type="submit">Submit Recipe</button>
                <Link to="/home"><button className={styles.goBackButton}>Go back</button></Link>
            </form>
        </div>



    )

};
