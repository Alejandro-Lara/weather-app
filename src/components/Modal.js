import React from 'react';
import ReactDOM from 'react-dom';
import {Line} from "react-chartjs-2";

const labelArray = ["morn","day","eve","night"];

const Modal = ({isShowing,hide,dateString,allData}) => isShowing ? ReactDOM.createPortal(
    //createPortal() allows components to render in a part of DOM
    // seperate from the parent component. so we can go right into document.body
    <React.Fragment>
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="modal">
            <div className="modal-header">
            <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <h1>{dateString}</h1>
            <p>Pressure: {allData.pressure}</p>
            <p>Humidity: {allData.humidity}%</p>
            <p>Wind Speed: {allData.wind_speed}</p>
            <p>Cloudiness: {allData.clouds}%</p>
            <p>Rain Prop: {allData.pop}</p>
            <img src={`http://openweathermap.org/img/wn/${allData.weather[0].icon}@2x.png`} alt={`${allData.weather[0].icon}`}/>
            <Line data = {{labels: labelArray, datasets:[{label:"Temp. Farenheit" ,data:[allData.temp.morn,allData.temp.day,allData.temp.eve,allData.temp.night]}]}} />

        
        </div>
        </div>
    </React.Fragment>,document.body
    ) : null;
//if isShowing==true, then createPortal by mounting it 
// to the document.body in DOM(?) and return that html, otherwise Modal is null

export default Modal;