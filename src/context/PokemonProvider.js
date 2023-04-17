import { createContext, useEffect, useState } from "react";

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [bunchPokemons, setBunchPokemons] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);

  //Get bunch of pokemons
  const getPokemons = async (page = 1, limit = 10) => {
    try {
      const newOffset = (page - 1) * limit;
      setLoading(true);
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${newOffset}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data from the API");
      }
      const data = await res.json();
      const promises = data.results.map(async (pokemon) => {
        const pokemonRes = await fetch(pokemon.url);
        if (!pokemonRes.ok) {
          throw new Error(`Failed to fetch data for ${pokemon.name}`);
        }
        const pokemonData = await pokemonRes.json();
        return pokemonData;
      });
      const results = await Promise.all(promises);
      setBunchPokemons(results);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPokemons(currentPage);
  }, [currentPage]);

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  return (
    <PokemonContext.Provider
      value={{
        bunchPokemons,

        goToNextPage,
        goToPrevPage,
        currentPage,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
