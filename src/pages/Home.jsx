import { useState, useEffect } from "react";
import Axios from "axios";
import "../styles/Home.css";

function Home() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    Axios.get("https://pokeapi.co/api/v2/pokemon?limit=50")
      .then((res) => {
        const promises = res.data.results.map((pokemon) =>
          Axios.get(pokemon.url).then((response) => response.data)
        );

        Promise.all(promises).then((details) => {
          setData(details);
          setFilteredData(details);
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = () => {
    const results = data.filter((item) =>
      search.toLowerCase() === "" ? item : item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(results);
  };

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <input
          className="search-field"
          type="text"
          placeholder="Enter Pokémon name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="suggestions">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
          <ul key={index}>
            <li>Name: {item.name}</li>
            <li>Height: {item.height}</li>
            <li>Weight: {item.weight}</li>
          </ul>
        ))
      ) : (
        <div className="no-results">No Pokémon found. Try searching again!</div>
      )}
      </div>
    </div>
  );
}

export default Home;