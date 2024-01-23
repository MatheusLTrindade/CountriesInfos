import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [countryName, setCountryName] = useState('');
  const [countryData, setCountryData] = useState(null);

  async function handleSearch() {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
      setCountryData(response.data[0]);
    } catch (error) {
      alert('Erro ao obter dados do país:', error);
      setCountryData(null);
    }
  };

  return (
    <div className="App">
      <h1>Informações do País</h1>
      <label htmlFor='inputCountryName'>
        Digite o nome do país:
        <input type="text" value={countryName} id="inputCountryName" onChange={(e) => setCountryName(e.target.value)}/>
      </label>
      <button onClick={handleSearch}>Pesquisar</button>
      {countryData && (
        <div className='country'>
          <h2>{countryData.name.common}</h2>
          <div className="flag">
            <img src={countryData.flags.png} alt={`Bandeira do ${countryData.flags.alt}`}/>
          </div>
          <p><span>Capital:</span> {countryData.capital}</p>
          <p><span>Idioma:</span> {Object.values(countryData.languages).join(', ')}</p>
          <p><span>Moeda:</span> {Object.values(countryData.currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ')}</p>
          <p><span>Area:</span> {countryData.area} km²</p>
          <p><span>Sigla:</span> {countryData.altSpellings[0]}</p>
          <p><span>Região:</span> {countryData.region}</p>
          <p><span>Fronteiras:</span> {countryData.borders ? countryData.borders.join(', ') : 'Nenhum'}</p>
          <button>
            <a href={countryData.maps.googleMaps} target='_blank'>Google maps</a>
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
