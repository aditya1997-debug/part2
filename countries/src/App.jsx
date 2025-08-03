import { useState, useEffect } from "react";
import ShowCountryInfo from './components/ShowCountryInfo';
import { getCountriesNames, getCountry, getWeather } from "./services/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [content, setContent] = useState(null);

  useEffect(() => {
    getCountriesNames()
      .then(data => setCountries(data.map(x => x.name.common)));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const showBtnClick = (name) => {
    setSearchTerm(name.toLowerCase());
  };

  const filteredCountries = countries.filter(x =>
    x.toLowerCase().includes(searchTerm)
  );

  const singleCountry = filteredCountries.length === 1 ? filteredCountries[0] : null;

  useEffect(() => {
    if (singleCountry) {
      setContent(null); 

      let countryData = null;

      
      getCountry(singleCountry)
        .then(data => {
          // console.log("data ===>", data)
          
          countryData = {
            name: data.name.common,
            capital: data.capital,
            area: data.area,
            languages: data.languages,
            flag: data.flags.svg
          };

          return getWeather(countryData.capital);
        })
        .then((x) => {
          const temperature =  x.main.temp;
          const windSpeed = x.wind.speed;
          const weatherIcon = x.weather[0].icon;

          // console.log("=====>", x)
          setContent({
            ...countryData,
            temperature: temperature,
            windSpeed: windSpeed,
            weatherIcon: weatherIcon
          })

          // console.log("content", content)
        })
      
    } else {
      setContent(null);
    }
  }, [singleCountry]);

return (
  <div>
    find Countries: <input value={searchTerm} onChange={handleSearch} />

    {(() => {
      if (singleCountry && content) {
        return <ShowCountryInfo {...content} />;
      }

      if (searchTerm && filteredCountries.length > 10) {
        return <p>Too many matches, specify another filter</p>;
      }

      if (filteredCountries.length < 10 && filteredCountries.length > 1) {
        return filteredCountries.map(x => (
          <div key={x} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {x} <button onClick={() => showBtnClick(x)}>show</button>
          </div>
        ));
      }

      return null;
    })()}
  </div>
)};

export default App;
