import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ScaleLoader  from "react-spinners/ScaleLoader";

function App() {
  const [cityName, setCityname] = useState('lagos');
  const [notFoundError, setNotFoundError] = useState(false)
  const [weatherApi, setWeatherApi] = useState();
  const [searcher, setsearcher] = useState(false);
  const [checkSlide, setCheckSlide] = useState(true);
  const [lagging, setLagging] = useState(false)
  let nameClass;
  // ./weather/
  let styles = {
    backgroundImage: weatherApi ? notFoundError ? '' : `url(/weather/${weatherApi.weather[0].main}.jpg)` : ''
  }
  nameClass = checkSlide ? 'hidden lg:inline' : ''

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=387f421853b5fa6b1316fd0aca340c28`)
      .then(res => res.json())
      .then(data => {
        if (data.cod === '404') {
          setNotFoundError(true)
          setLagging(true);
          setInterval(() => {
            setLagging(false)
          }, 3000);
        } else {
          setNotFoundError(false);
          setLagging(true);
          setInterval(() => {
            setLagging(false)
          }, 3000);
          setWeatherApi(data);
        }

      })

      .catch(err => console.log(err))

  }, [searcher]);
  function search(event) {
    let value = event.target.value
    value = value.trim()
    console.log(event.target.value);
    setCityname(value)
  }
  function searchApi() {
    setsearcher(prev => !prev)
  }
  function slideOut() {
    setCheckSlide(false)
  }
  console.log(notFoundError);
  console.log(weatherApi);
  return (
    <div style={styles} className=' bg-cover bg-center bg-slate-800 font-mono text-zinc-50 h-[100vh]'>
      <div className='container  h-[40vh] lg:h-[100vh] mb-16 lg:mb-0 mx-auto flex justify-between '>
        <main className='flex  flex-col space-y-60 lg:justify-between '>
          <p className='text-2xl text-gray-500'>UPhigh</p>
          {weatherApi ?lagging?<div className='hidden lg:block'><ScaleLoader   color="	#F5F5F5" /></div>  : notFoundError ? <p className='hidden lg:flex text-2xl'>invalid city</p> : <section className='hidden lg:flex flex-row items-end gap-5' id="cityInfo">
            <h1 className='text-5xl'>{Math.round(weatherApi.main.temp - 273.15)}<sup>o</sup>C</h1>
            <div>
              <p className='text-2xl'>{weatherApi.name}</p>
              <p></p>
            </div>
            <div className='flex flex-col text-sm' id='logo'><img className='w-10' src={`https://openweathermap.org/img/wn/${weatherApi.weather[0].icon}@2x.png`} alt="openweatherIcon" /><span>{weatherApi.weather[0].main}</span></div>
          </section> : ''
          }
        </main>
        <aside className='lg:bg-gray-400 lg:backdrop-blur-md lg:bg-opacity-0 lg:px-5 lg:w-[27vw] flex flex-col justify-between'>
          <div>
            <input className={`${nameClass}  mr-5 bg-transparent border-b`} id='location' onChange={search} type="text" placeholder='Another location' />
            <button className='float-right' onMouseOver={slideOut} onClick={searchApi} ><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
          </div>
          {weatherApi ? notFoundError ? '' : <div className='hidden lg:flex flex-col gap-10'>
            <h3 >Weather Details</h3>
            <div>
              <p className="flex flex-row justify-between ">Cloudy<span>{weatherApi.clouds.all}%</span></p>
              <p className="flex flex-row justify-between ">Humidity<span>{weatherApi.main.humidity}%</span></p>
              <p className="flex flex-row justify-between ">Wind<span>{Math.round(weatherApi.wind.speed)}km/h</span></p>
              <p className="flex flex-row justify-between ">Rain<span>{weatherApi.rain ? `${weatherApi.rain[`${1}h`]}` : '00'}mm</span></p>
            </div>
          </div> : ''}
        </aside>
      </div>

      {weatherApi ?lagging? <div className='lg:hidden justify-center flex container mx-auto'><ScaleLoader   color="	#F5F5F5" /></div>: notFoundError ? <p className='container mx-auto justify-center flex lg:hidden text-2xl'>invalid city</p> : 
        <section className='container mx-auto justify-center flex align-end lg:hidden text-center my-12 flex-row items-end gap-5' id="cityInfo">
          <h1 className='text-5xl'>{Math.round(weatherApi.main.temp - 273.15)}<sup>o</sup>C</h1>
          <div>
            <p className='text-2xl'>{weatherApi.name}</p>
            <p></p>
          </div>
          <div className='flex flex-col text-sm' id='logo'><img className='w-10' src={`https://openweathermap.org/img/wn/${weatherApi.weather[0].icon}@2x.png`} alt="openweatherIcon" /><span>{weatherApi.weather[0].main}</span></div>
        </section> : ''
      }
      {weatherApi ? notFoundError ? '' : <div className=' container mx-auto px-5 lg:hidden flex flex-col gap-10'>
        <h3 className='text-center'>Weather Details</h3>
        <div className='grid grid-cols-2 gap-10'>
          <p className="flex flex-row justify-between ">Cloudy<span>{weatherApi.clouds.all}%</span></p>
          <p className="flex flex-row justify-between ">Humidity<span>{weatherApi.main.humidity}%</span></p>
          <p className="flex flex-row justify-between ">Wind<span>{Math.round(weatherApi.wind.speed)}km/h</span></p>
          <p className="flex flex-row justify-between ">Rain<span>{weatherApi.rain ? `${weatherApi.rain[`${1}h`]}` : '00'}mm</span></p>
        </div>
      </div> : ''}
    </div>
  );
}

export default App;
