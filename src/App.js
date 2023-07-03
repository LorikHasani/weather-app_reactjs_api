import { useEffect, useState } from "react";

const KEY = "3bab8c719a204ddfc61a21dcd1f89512";

export default function App() {
  const [cities, setCities] = useState({});
  const [query, setQuery] = useState("London");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Set initial state to true

  useEffect(() => {
    const controller = new AbortController();

    async function fetchWeather() {
      try {
        setError("");
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${KEY}`);

        if (!res.ok) {
          throw new Error("Something went wrong with fetching city");
        }

        const data = await res.json();
        if (data.cod !== 200) {
          throw new Error("City not found");
        }

        setCities(data);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeather();

    return function () {
      controller.abort();
    };
  }, [query]);

  return (
    <div className="container">
      <Header>
        <Search query={query} setQuery={setQuery} />
      </Header>
      {isLoading || Object.keys(cities).length === 0 ? <Loader /> : <Weather cities={cities} />}

      {error && <ErrorMessage message={error} />}
    </div>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>❌</span> {message}
    </p>
  );
}

function Header({ children }) {
  return (
    <div className="header">
      <h4>Enter the city:</h4>
      {children}
    </div>
  );
}

function Search({ query, setQuery }) {
  return <input className="search" type="text" placeholder="Enter the city..." value={query} onChange={(e) => setQuery(e.target.value)} />;
}

function Weather({ cities }) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(function () {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return function () {
      document.title = "London";
    };
  }, []);

  return (
    <>
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      <div className="cardContainer">
        {isOpen && cities.main && (
          <div className="card">
            <p className="city">{cities.name}</p>
            <p className="city">{cities.main.temp} °F</p>
            <p className="weather">{cities.weather[0].description}</p>
          </div>
        )}
      </div>
    </>
  );
}
