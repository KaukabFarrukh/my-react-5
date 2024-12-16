import { useState, useEffect } from "react";
import Axios from "axios";
import "../styles/products.css";


function Products() {
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
        .catch((err) => console.error("Error fetching Pokémon data:", err));
    }, []);

    const handleSearch = () => {
        const results = data.filter((item) =>
          search.toLowerCase() === "" ? item : item.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredData(results);
      };

  return (
    <div className="products-container">
        <div className="search-wrapper">
      <input
        className="input"
        type="text"
        placeholder="Search for a Pokémon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
      </div>
      <div className="pokemon-list">
        {filteredData.length > 0 ? (
          filteredData.map((pokemon, index) => (
            <ul key={index} className="pokemon-item">
              <li><strong>Name:</strong> {pokemon.name}</li>
              <li><strong>Height:</strong> {pokemon.height}</li>
              <li><strong>Weight:</strong> {pokemon.weight}</li>
            </ul>
          ))
        ) : (
          <div className="no-results">No Pokémon found. Try searching again!</div>
        )}
      </div>
    </div>
  );
}

export default Products;
