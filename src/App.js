import { children, useEffect, useState } from "react";

// const weatherData = [
//   {
//     cityId: "tt1375666",
//     Name: "London",
//     Temp: 37,
//     Description: "Sunny",
//   },
// ];

const KEY = "3bab8c719a204ddfc61a21dcd1f89512";

export default function App() {
  const [cities, setCities] = useState([]);
  const [query, setQuery] = useState("London");
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchWeather() {
        try {
          setError("");
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${KEY}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching city");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setCities(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error(err.message);
            setError(err.message);
          }
        } finally {
          // setIsLoading(false);
        }
      }

      fetchWeather();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <div className="container">
      <Header>
        <Search query={query} setQuery={setQuery} />
      </Header>
      <Weather cities={cities} />
    </div>
  );
}

function Header({ children }) {
  return (
    <div className="header">
      <h3>Weather App</h3>
      {children}
    </div>
  );
}

function Search({ query, setQuery }) {
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
        <div className="card">
          <p class="city">{city.main.temp}</p>
          {/* <p class="weather">{city.lat}</p> */}
          {/* <p class="temp">{city.main}</p> */}
        </div>
      ))}
    </div>
  );
}
