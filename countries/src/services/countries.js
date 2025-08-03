import axios from 'axios';
const getCountries = "https://studies.cs.helsinki.fi/restcountries/api/all";
const API_KEY = import.meta.env.VITE_API_KEY;


const getCountriesNames = () => {
    const result = axios.get(getCountries);
    return result.then(response => response.data);
}

const getCountry = (name) => {
    // console.log("inside service", name)
    const result = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`);
    return result.then(response => response.data)
}

const getWeather = (city_name) => {
    const result = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}&units=metric`);
    return result.then(response => response.data)
}

export {getCountriesNames, getCountry, getWeather}