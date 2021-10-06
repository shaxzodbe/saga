import './App.css';
import {useState} from "react";

function App() {

    const API_KEY = `08725cdff6e44246c54fc26f734ffd5e`
    const [weatherData, setWeatherData] = useState([{}])
    const [city, setCity] = useState("")

    const getWeather = (e) => {
        if (e.key == 'Enter') {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperia&APPID=${API_KEY}`).then(
                response => response.json()
            ).then(
                data => {
                    setWeatherData(data)
                    setCity("")
                }
            )
        }
    }
    return (
        <div className="container">
            <input type="text"
                   className="input"
                   placeholder="Enter City..."
                   onChange={(e) => setCity(e.target.value)}
                   value={city}
                   onKeyPress={getWeather}
            />

            {typeof weatherData.main === 'undefined' ? (
                <div>
                    <p className="welcome">Welcome to the weather app! Enter in a city to get the weather of.</p>
                </div>
            ) : (
                <div className="weather-data">
                    <p className="city">{weatherData.name}</p>
                    <p className="temp">{Math.round(weatherData.main.temp - 273)}&deg;C</p>
                    <p className="weather">{weatherData.weather[0].main}</p>
                </div>
            )}

            {weatherData.cod === '404' ? (
                <p className="not-found">City not found</p>
            ) : (
                <>
                </>
            )}

        </div>
    );
}

export default App;
