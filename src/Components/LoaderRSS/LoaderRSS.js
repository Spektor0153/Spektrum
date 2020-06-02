import React from "react";
import './loaderRSS.css';

export const LoaderRSS = (props)=> {
    return <div className='roller_container'>
        <div className='lds-roller'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <p className="lds-text">Идёт загрузка..</p>
    </div>
}
