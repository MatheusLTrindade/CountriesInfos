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
        <div>
          <h2>{countryData.name.common}</h2>
          <img src={countryData.flags.png} alt={`Bandeira do ${countryData.flags.alt}`}/>
          <p>Capital: {countryData.capital}</p>
          <p>Idioma: {Object.values(countryData.languages).join(', ')}</p>
          <p>Moeda: {Object.values(countryData.currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ')}</p>
          <p>Area: {countryData.area} km²</p>
          <button>
            <a href={countryData.maps.googleMaps} target='_blank'>Google maps</a>
          </button>
          <p>Sigla: {countryData.flag}</p>
          <p>Região: {countryData.region}</p>
          <p>Fronteiras: {countryData.borders ? countryData.borders.join(', ') : 'Nenhum'}</p>
        </div>
      )}
    </div>
  );
}

export default App;
