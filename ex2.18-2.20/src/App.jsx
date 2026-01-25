import React, { useEffect, useState } from "react";

function App() {
  const [countryData, setCountryData] = useState([]);
  const [term, setTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  // console.log(filteredData)

  // console.log(
  //   weatherData
  // )

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          "https://studies.cs.helsinki.fi/restcountries/api/all",
        );
        if (!res.ok) throw new Error("unable to connect");
        const data = await res.json();
        setCountryData(data);
        setFilteredData(data);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

  const handleSearch = (e) => {
    setTerm(e.target.value);
    setFilteredData(
      countryData.filter((c) =>
        c.name.common.toLowerCase().includes(e.target.value.toLowerCase()),
      ),
    );
  };

  useEffect(() => {
    if (filteredData.length !== 1) return;
    async function getWeather(capital) {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`,
        );
        if (!res.ok) throw new Error("unable to connect");
        const data = await res.json();
        setWeatherData(data);
      } catch (err) {
        console.log(err);
      }
    }

    getWeather(filteredData[0].capital);
  }, [filteredData.length]);
  return (
    <div>
      <div>
        find countries
        <input
          type="text"
          name="country"
          id="country"
          value={term}
          onChange={handleSearch}
        />
      </div>

      {term &&
        filteredData.length > 1 &&
        filteredData.map((c) => (
          <div key={c.name.common}>
            <p>{c.name.common}</p>
            <button onClick={() => setFilteredData([c])}>show</button>
          </div>
        ))}

      {filteredData.length === 1 && (
        <>
          <p>{filteredData[0].name?.common}</p>
          {filteredData[0].capital?.map((c) => (
            <p key={c}>Capital {c}</p>
          ))}
          <p>Area {filteredData[0].area}</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(filteredData[0]?.languages)?.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>

          <img
            src={filteredData[0].flags.png}
            alt={filteredData[0].flags.png}
          />
        </>
      )}

      <h2>weather in {filteredData[0]?.capital}</h2>

      <p>Temperature in {weatherData?.main?.temp} celsisus</p>

      <p>Wind {weatherData?.wind?.speed} m/s</p>

      {weatherData && (
        <img
          src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
          alt={"weather data"}
        />
      )}
    </div>
  );
}

export default App;
