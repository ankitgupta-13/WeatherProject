import { useEffect, useState } from "react";
import "./App.css";
import { useGeolocated } from "react-geolocated";
import Search from "../src/assets/search.png";
import Location from "../src/assets/gps.png";

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
      setBackground();
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
    setTemperature(Math.round(data.main.temp));
    setWeather(data.weather[0].main);
    setBackground(data.weather[0].main);
  };
  const setBackground = (weather) => {
    if (weather === "Haze") {
      const video = document.createElement("video");
      video.setAttribute("autoplay", "");
      video.setAttribute("loop", "");
      video.muted = true;
      video.style.position = "fixed";
      video.style.top = "50%";
      video.style.left = "50%";
      video.style.minWidth = "100%";
      video.style.minHeight = "100%";
      video.style.width = "auto";
      video.style.height = "auto";
      video.style.zIndex = "-1";
      video.style.transform = "translate(-50%, -50%)";
      const source = document.createElement("source");
      source.setAttribute("src", "haze.mp4");
      video.appendChild(source);
      document.body.appendChild(video);
    } else if (weather === "Clear") {
      const video = document.createElement("video");
      video.setAttribute("autoplay", "");
      video.setAttribute("loop", "");
      video.muted = true;
      video.style.position = "fixed";
      video.style.top = "10%";
      video.style.left = "50%";
      video.style.minWidth = "100%";
      video.style.minHeight = "100%";
      video.style.width = "auto";
      video.style.height = "auto";
      video.style.zIndex = "-1";
      video.style.transform = "translate(-50%, -50%)";
      const source = document.createElement("source");
      source.setAttribute("src", "clear.mp4");
      video.appendChild(source);
      document.body.appendChild(video);
    } else if (weather === "Clouds") {
      const video = document.createElement("video");
      video.loop = true;
      video.autoplay = true;
      video.muted = true;
      video.style.position = "fixed";
      video.style.top = "50%";
      video.style.left = "50%";
      video.style.minWidth = "100%";
      video.style.minHeight = "100%";
      video.style.width = "auto";
      video.style.height = "auto";
      video.style.zIndex = "-1";
      video.style.transform = "translate(-50%, -50%)";
      const source = document.createElement("source");
      source.setAttribute("src", "clouds.mp4");
      video.appendChild(source);
      document.body.appendChild(video);
    } else if (weather === "Rain") {
      const video = document.createElement("video");
      video.setAttribute("autoplay", "");
      video.setAttribute("loop", "");
      video.muted = true;
      video.style.position = "fixed";
      video.style.top = "50%";
      video.style.left = "50%";
      video.style.minWidth = "100%";
      video.style.minHeight = "100%";
      video.style.width = "auto";
      video.style.height = "auto";
      video.style.zIndex = "-1";
      video.style.transform = "translate(-50%, -50%)";
      const source = document.createElement("source");
      source.setAttribute("src", "rain.mp4");
      video.appendChild(source);
      document.body.appendChild(video);
    } else if (weather === "Snow") {
      const video = document.createElement("video");
      video.setAttribute("autoplay", "");
      video.setAttribute("loop", "");
      video.muted = true;
      video.style.position = "fixed";
      video.style.top = "50%";
      video.style.left = "50%";
      video.style.minWidth = "100%";
      video.style.minHeight = "100%";
      video.style.width = "auto";
      video.style.height = "auto";
      video.style.zIndex = "-1";
      video.style.transform = "translate(-50%, -50%)";
      const source = document.createElement("source");
      source.setAttribute("src", "snow.mp4");
      video.appendChild(source);
      document.body.appendChild(video);
    }
  };
  return (
    <div className="container">
      <h1>Weather App</h1>
      <div className="input">
        <img src={Location} alt="" className="locationIcon" />
        <input
          type="text"
          placeholder="Enter City Name"
          onChange={(event) => {
            setCity(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleGetWeather();
            }
          }}
          value={city}
        />
        <img src={Search} alt="Not found" className="searchIcon" />
      </div>
      <div className="output">
        <div>Temperature : {temperature}°C </div>
        <div>Weather : {weather}</div>
      </div>
    </div>
  );
}

export default App;
