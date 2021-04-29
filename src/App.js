import React from 'react';
import 'isomorphic-fetch';
import './App.css';
import WeatherDetails from './components/WeatherDetails';

// add this line so that React can pick up on the .env file.
// IMPORTANT: Make sure to run npm install "dotenv", otherwise this won't work
require('dotenv').config();

class App extends React.Component {

  state = {
    error: null,
    isLoaded: false,
    cityName: '',
    weatherConditions: '',
    minTemp: '-',
    maxTemp: '-',
    humidity: '-',
    windSpeed: '-',
    icon: ''
  }

  componentDidMount() {
    this.setState({ isLoaded: true });
  }

  getWeather = () => {
    let city = document.getElementById('city-input').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          // If the call to the server does NOT return any errors (such as a 404 or 401 for example), AND the
          // value the user entered is Not A Number (this prevents the user from tying to enter a postal code
          // for example), then set the new state.
          // If the user entered an invalid city name or a number display an error message
          if (result.cod === 200 && isNaN(city)) {
            this.setState({
              cityName: result.name,
              weatherConditions: this.capitalizeFirstLetter(result.weather[0].description),
              minTemp: this.convertKelvinToCelcius(result.main.temp_min),
              maxTemp: this.convertKelvinToCelcius(result.main.temp_max),
              humidity: result.main.humidity,
              windSpeed: result.wind.speed,
              icon: 'http://openweathermap.org/img/wn/' + result.weather[0].icon + '@2x.png'
            });
          } else {
            this.setState({
              cityName: 'Invalid city name...',
              weatherConditions: '',
              minTemp: '-',
              maxTemp: '-',
              humidity: '-',
              windSpeed: '-',
              icon: ''
            });
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        });
  }

  // capitalize the first letter of a string
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // convert the temp in Kelvin (as returned by the api call) to degrees celcius, and round to the nearest
  // whole number
  convertKelvinToCelcius = (temp) => {
    return Math.round(temp - 273.15);
  }

  render() {
    const {
      error,
      isLoaded,
      cityName,
      weatherConditions,
      minTemp, maxTemp,
      humidity,
      windSpeed,
      icon } = this.state;
    
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="App" >
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
          />
          <div className="App-header">
            <h1>Enter the name of a city for a weather report...</h1>
            <WeatherDetails
              getWeather={this.getWeather}
              cityName={cityName}
              weatherConditions={weatherConditions}
              minTemp={minTemp}
              maxTemp={maxTemp}
              humidity={humidity}
              windSpeed={windSpeed}
              icon={icon}
            />
          </div>
        </div>
      );
    }
  }
}

export default App;