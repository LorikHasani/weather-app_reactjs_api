import { children, useEffect, useState } from "react";

const weatherData = [
  {
    cityId: "tt1375666",
    Name: "London",
    Temp: 37,
    Description: "Sunny",
  },
];

const KEY = "3bab8c719a204ddfc61a21dcd1f89512";

export default function App() {
  const [cities, setCities] = useState(weatherData);

  return (
    <div className="container">
      <Header>
        <Search />
      </Header>
      <Weather cities={cities} />
    </div>
  );
}

useEffect(function () {
  async function fetchWeather() {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${KEY}`
    );

    const data = await res.json();
  }

  fetchWeather();
});

function Header({ children }) {
  return (
    <div className="header">
      <h3>Weather App</h3>
      {children}
    </div>
  );
}

function Search() {
  const [query, setQuery] = useState("");

  return (
    <input
      className="search"
      type="text"
      placeholder="Enter the city..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function Weather({ cities }) {
  return (
    <div className="cardContainer">
      {cities?.map((city) => (
        <div className="card" key={city.cityId}>
          <p class="city">{city.Name}</p>
          <p class="weather">{city.Description}</p>
          <p class="temp">32°</p>
        </div>
      ))}
    </div>
  );
}
