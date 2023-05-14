import { useEffect, useState } from "react";
import "./App.css";
import { useGeolocated } from "react-geolocated";

function App() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [weather, setWeather] = useState("");
  const handleGetWeather = () => {
    data();
  };
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
  useEffect(() => {
    if (coords) {
      data();
    }
  }, [coords]);

  const data = async () => {
    const response = await fetch(
      city !== ""
        ? `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
            import.meta.env.VITE_WEATHER_API_KEY
          }`
        : `https://api.openweathermap.org/data/2.5/weather?lat=${
            coords.latitude
          }&lon=${coords.longitude}&units=metric&appid=${
            import.meta.env.VITE_WEATHER_API_KEY
          }`
    );
    const data = await response.json();
    setTemperature(data.main.temp);
    console.log(data.main.temp);
    setWeather(data.weather[0].main);
  };

  return (
    <>
      <h1>Weather App</h1>
      <label htmlFor="">Enter City</label>
      <input
        type="text"
        onChange={(event) => {
          setCity(event.target.value);
        }}
        value={city}
      />
      <button onClick={handleGetWeather}>Get Weather</button>
      <div>
        <h2>City Name {city}</h2>
        <h2>Temperature {temperature} </h2>
        <h2>Weather {weather}</h2>
      </div>
    </>
  );
}

export default App;
