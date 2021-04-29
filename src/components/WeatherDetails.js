import React from 'react';
import Table from 'react-bootstrap/Table';

// unicode for the degrees celcius symbol
const degreeCelciusSymbol = '\u2103';

// return an user input field, a submit button, and a table which is to be populated with info
// based on user input
const WeatherDeatails = (props) => {
  return (
    <div>
      <input id='city-input'></input>
      <button
        id='submit-city-btn'
        className='btn btn-danger btn-lg'
        onClick={props.getWeather}
      >Submit</button>
      <hr />
      <h1 id='city-name'>City: {props.cityName}</h1>
      <Table striped bordered hover variant="dark">
        <tbody>
          <tr>
            <td>
              <p id='cond-txt'>Conditions:</p>
            </td>
            <td>
              {props.weatherConditions}
              <img id='icon' src={props.icon} alt={''} />
            </td>
          </tr>
          <tr>
            <td>
              <p>Current Min Temp:</p>
              <p>{props.minTemp}{degreeCelciusSymbol}</p>
            </td>
            <td>
              <p>Current Max Temp:</p>
              <p>{props.maxTemp}{degreeCelciusSymbol}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Humidity:</p>
              <p>{props.humidity}%</p>
            </td>
            <td >
              <p>Wind Speed:</p>
              <p>{props.windSpeed}m/s</p>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default WeatherDeatails;