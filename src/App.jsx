import { useState } from 'react'
// import './App.css'
import axios from 'axios'
function App() {
  const [data, setData] = useState({})
  // const [temp, setTemp] = useState(null)
  const [location, setLocation] = useState('')
  const [unit, setUnit] = useState('F')
  const [change, setChange] = useState('C')
  // var temp=0;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=e3704d41022d18b840a73790fb52775a`
  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      await axios.get(url).then((response) => {
        setData(response.data)
        // temp=data.main.temp;
        console.log(response.data)
      })
      setLocation('')
      setUnit('F');
    setChange('C');
    }
  }
  const handleClick = ()=> {
    if (unit==='F'){
      setUnit('C');
    setChange('F');
    // setTemp((temp-32)*5/9);
    document.getElementById("temperature").innerHTML = ((data.main.temp-32)*5/9).toFixed();
    
    }
    else{
      setUnit('F');
    setChange('C');
    // setTemp((temp*9/5)+32);
    document.getElementById("temperature").innerHTML = data.main.temp.toFixed();
    }
    
    console.log("Hello");
  }
  return (
    <div className="app">
      <div className="search">
        <input value={location} onChange={event=>setLocation(event.target.value)} onKeyDown={searchLocation} placeholder='Enter Location' type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
          {data.main ? <span ><h1 ><h1 id='temperature'>{data.main.temp.toFixed()}</h1>°{unit}|</h1><h3 onClick={handleClick}>°{change}</h3></span>  : null}
          </div>
          <div className="description">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        { data.name !== undefined &&<div className="bottom">
          <div className="feels">
          {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
          {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
          {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default App
