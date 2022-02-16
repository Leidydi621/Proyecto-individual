import React from "react";
import {Link} from 'react-router-dom';

import style from './LandingPage.module.css';



export default function LandingPage() {
    return(
        <div className={style.bkg}>
            <h1>Welcome to My Cusinart Page</h1>
            <Link to='/home'>
                <button className={style.btn}>Start</button>
            </Link>
        </div>

    )
} 

