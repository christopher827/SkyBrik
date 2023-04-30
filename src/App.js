import './App.css';
import React,{useState}from 'react'
import axios from "axios"//axios is a react library used for working with API's

function App() {
  const[data,setData]=useState({})
  const[location,setLocation]=useState('')//location of the user is empty at first
  
  /**The API key */ 
  /* NOTE:if you try using this particular api, it wouldn't work because it's unique*/
  /**To get your unique API key visit www.openweathermap.org to get yours */
  const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=5413c6e5afd69aa4d79769f4e1429241`
  
  /**This is the function that will be called when the user hits the Enter key after inputing a location.
  If the Enter key is pressed, the app makes a GET request to the API endpoint using Axios,
  and then sets the state of data to the response from the API. It also clears the location state so that the search bar is empty for the next search.
    */
  const searchLocation=(event)=>{
  if (event.key==='Enter') { //if user clicks the Enter button the data/information about that location appears
  axios.get(url).then((response)=>{//
  setData(response.data)//All the data from the openweatherAPI gets passed to the setData function
    })
  setLocation('')//set the input field back to be empty 
  }}
  
    return (
  <div className="app">
  <div className='search'>
  <input value={location} onChange={event=>setLocation(event.target.value)}
  onKeyPress={searchLocation}
  placeholder='Enter Location'
  type="text"
  />
        </div>
  <div className="container">
  <div className="top">
  <div className="location">
  <p>{data.name}</p>{/**Name of the location entered by the user */}
  </div>
  <div className="temp">
  {data.main?<h1>{data.main.temp.toFixed()}°F</h1>:null}
  </div>
  <div className="description">
      {/*Describing what the weather is like over there e.g CLEAR,RAINY,CLOUDY */}
    {data.weather ? <p>{data.weather[0].main}</p>:null}
  </div>
  </div>
  
  {/**The code here only renders when a valid city,state,region etc is entered.   */}
  {/**It won't render if an invalid location is entered or empty */}
  {
    data.name!=undefined &&
    <div className="bottom">
    <div className="feels">
  {/*Describing how the current location feels like in degree Fareinheit */}
    {data.main?<p className='bold'>{data.main.feels_like.toFixed()}°F</p>:null}{/*we first ask if the data is availabe? if it is we render,and if it isn't we render(show) null(nothing) */}
  <p>Feels Like</p>
    </div>
  
  <div className="humidity">
  {/**Describing the amount of HUMIDITY:amount of vapour(water) in the sky */}
  {data.main ? <p className='bold'>{data.main.humidity}%</p>:null}{/*we first ask if the data is availabe? if it is we render,and if it isn't we render(show) null(nothing) */}
  <p>Humidity</p>
    </div>
  
    <div className="wind">
  {/**Describing the speed of the wind in Meter Per Hour */}
  {data.main?<p className='bold'>{data.wind.speed.toFixed()}MPH</p>:null}{/*we first ask if the data is availabe? if it is we render,and if it isn't we render(show) null(nothing) */}
  <p>Wind Speed</p>
    </div>
  </div>
  
  }
  </div>
      </div>
    );
  }
  export default App;
