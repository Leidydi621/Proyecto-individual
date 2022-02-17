import React from 'react';
import {Link} from 'react-router-dom';

let prevId = 1;
export default function Card(data){

    return (

        <div >
        <div >
            <div>
                <div >
                <div >{data.name}</div>
                <div >⛧⛧{data.spoonacularScore}⛧⛧</div>
                </div>
            <Link to = {`/details/${data.id}`}>
                
            </Link>
                <img src={data.image} alt="" />
                
                <div >{data.diets?.map((e) => {
        
                    return (
                        
                        <p key={e}> {e.name ? e.name : e} </p>
                        
                    )
                   
                })} </div> 
                
            </div>
        </div>
        </div>
        
    )  
        // <div >
        //     <div id="card">
        //         <div>
        //             <img  src = {image} alt= "img not found" width= "150px" height= "150px"/>
        //         </div>
        //         <div>
        //             <h4 >{name}</h4>
        //         </div>
        //         <div>
        //             <span><h5>Type of Diet: {diets}</h5></span>
        //         </div>
        //     </div>
        // </div>
    

}
