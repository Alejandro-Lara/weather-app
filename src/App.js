import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import DayCard from './components/daycard.js';
import {config} from './config.js';



function App() {

  const [dayStats, setDayStats] = React.useState({
    isSet: false,
    dayArray: [],
  });

  //const {isShowing,toggle} = useModal(); //the state altering function and var for the Modal
  
  // isSet will determine if the weather cards should be shown
  //Current day will be at index 0, with subsequent day following

  const handleSubmit = (event) =>{
    event.preventDefault();
    const key =config.MY_KEY;
    navigator.geolocation.getCurrentPosition((position)=>{
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      
      
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=imperial&appid=${key}`)
        .then(
          function(response) {
            //console.log(response);
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }

            // Examine the text in the response
            response.json().then(function(data) {
              console.log(data);
              for(let i =0; i < 8; i++){
                data.daily[i].dt = new Date(data.daily[i].dt *1000);
              }
              //console.log(data.daily);
              setDayStats({isSet : true, dayArray: data.daily});
            });
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
      
    });
  };
  
  //This useEffect() runs only on first render thanks to second arg [], for some reason
  //The purpose of this effect is to retrieve the weather data automatically on intial page landing
  useEffect(()=>{
    handleSubmit(new Event("fake"));  
  },[]);
  

  let dayCards = null;
  if(dayStats.isSet){
    dayCards = dayStats.dayArray.map((day,index) =>
      <DayCard key = {index} className="daycard" dt={day.dt} temp ={day.temp} weather={day.weather} allData = {day}/>
    );
    
  }

  

  return (
    <div className="App">
      <header className="App-header">
        <h1>This week's weather</h1>
        <div className = "formContainer">
          <form onSubmit = {handleSubmit}>
            <button id="update"type = "submit"> Update </button>
          </form>
        </div>
        {/*<button onClick = {toggle}>Show Test Modal</button>*/}
        {/*<Modal isShowing = {isShowing} hide = {toggle} />*/}
      </header>
      {dayStats.isSet && dayCards}
      {!dayStats.isSet && <p>Click update for weather forecast</p>}

    </div>
  );
}

export default App;