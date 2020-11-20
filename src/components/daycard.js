import React from 'react'
import Modal from './Modal.js';
import useModal from '../useModal.js'

export default function DayCard({dt,temp,weather,allData}){
    const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const dateString = `${dayNames[dt.getDay()]} ${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`;
    const {isShowing,toggle} = useModal();

    return(
        <button id = "daycard" className = {weather[0].main} onClick={toggle}>
            
            <h2>{dateString}</h2>
            <div>
                <p><span>Morning:</span> {temp.morn} °F</p>
                <p><span>Day:</span> {temp.day} °F</p>
                <p><span>Evening:</span> {temp.eve} °F</p>
                <p><span>Night:</span> {temp.night} °F</p>
                <p><span>Sky:</span> {weather[0].main}</p>
            </div>
            <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt={`${weather[0].icon}`}/>
            <Modal isShowing = {isShowing} hide = {toggle} dateString={dateString} allData={allData}/>

        </button>
    );

}