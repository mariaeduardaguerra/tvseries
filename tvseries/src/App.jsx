import React, { useEffect, useState } from 'react';

function App() {
  const [series, setSeries] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    // Função para atualizar as séries com base no gênero selecionado
    const updateSeriesByGenre = (genre) => {
      if (!apiData) return;

      const filteredSeries = apiData.series.filter(
        (serie) => serie.generos.includes(genre)
      );
      setSeries(filteredSeries);
    };

    // Carrega os dados da API
    fetch('https://raw.githubusercontent.com/mariaeduardaguerra/framework-series-2023/main/series-favorites.json')
      .then((response) => response.json())
      .then((data) => {
        setApiData(data);
        updateSeriesByGenre(selectedGenre);
      })
      .catch((error) => console.error('Erro ao carregar os dados da API:', error));
  }, [selectedGenre]);

  // Manipula o evento de seleção de gênero
  const handleGenreChange = (e) => {
    const genre = e.target.value;
    setSelectedGenre(genre);
  };

  return (
    <div className="App">
      <h1>séries</h1>
      <div>
        <label htmlFor="genreSelect">selecione um gênero:</label>
        <select
          id="genreSelect"
          onChange={handleGenreChange} // Adiciona o evento onChange
          value={selectedGenre} // Define o valor selecionado
        >
          <option value="">Selecione um gênero</option>
          {apiData &&
            apiData.series.map((serie) =>
              serie.generos.map((genero) => (
                <option key={genero} value={genero}>
                  {genero}
                </option>
              ))
            )}
        </select>
      </div>
      <div className="series-list">
        {series.map((serie, index) => (
          <div key={index} className="serie">
            <h2>{serie.nome}</h2>
            <p>{serie.descricao}</p>
            {serie.poster && (
              <img src={serie.poster} alt={`${serie.nome} Poster`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
