const ShowCountryInfo = ({name=null, capital=null, area=null, languages={}, flag=null, temperature=null, windSpeed=null, weatherIcon=null} = {}) => {
  // console.log(name, capital, area, languages, flag)
  const lang = []
  for (let [key, value] of Object.entries(languages)) {
    lang.push(value)
  }

  const getWeatherIcon = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  return (
    <>
      <h1>{name}</h1>
      <p style={{ margin: "0px" }}>Capital {capital}</p>
      <p style={{ margin: "0px" }}>Area {area}</p>
      <h2 style={{  marginBottom: "0px" }}>Languages</h2>
      <ul style={{  marginBottom: "8px", marginTop: "8px"}}>
        {lang.map(x => (
          <li key={x}>{x}</li>
        ))}
      </ul>
      <img src={flag} width="300" height="300"/>
      <h1 style={{ margin: "10px" }}>Weather in {capital}</h1>
      <p>Temperature {temperature} Celcius </p>
      <img src={getWeatherIcon} />
      <p>Wind {windSpeed} m/s</p>
    </>
  )
}

export default ShowCountryInfo