import React from 'react';

let prevId = 1;
export default function Card({image, name, diets}){

    return (
        <div >
            <div id="card">
                <div>
                    <img  src = {image} alt= "img not found" width= "150px" height= "150px"/>
                </div>
                <div>
                    <h4 >{name}</h4>
                </div>
                <div>
                    {diets?.map(el => {
                        return(
                            <h5 key={prevId++}>{el}</h5>
                        )
                    })
                        
                    }
                </div>
            </div>
        </div>
    );

}
