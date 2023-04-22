import { createContext, useEffect, useState } from "react";
import useForm from "../hook/useForm";

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [bunchPokemons, setBunchPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const { valueSearch, onInputChange, onResetForm } = useForm({
    valueSearch: "",
  });
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

  //get all pokemons
  const getAllPokemons = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data from the API");
      }
      const data = await res.json();

      // In this case, many ERR_INSUFFICIENT_RESOURCES errors occur, but the app works fine.
      /*  const promises = data.results.map(async (pokemon) => {
        const pokemonRes = await fetch(pokemon.url);
        if (!pokemonRes.ok) {
          throw new Error(`Failed to fetch data for ${pokemon.name}`);
        }
        const pokemonData = await pokemonRes.json();
        return pokemonData;
      });
      const results = await Promise.all(promises); 
      */  
      const results = [];

      for (const pokemon of data.results) {
        const pokemonRes = await fetch(pokemon.url);

        if (!pokemonRes.ok) {
          throw new Error(`Failed to fetch data for ${pokemon.name}`);
        }
        const pokemonData = await pokemonRes.json();
        results.push(pokemonData);
        console.log(pokemonData);
      }
      const resData = await Promise.all(results);
      setAllPokemons(resData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //get pokemon by name
  const getPokemonByName = async (name) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAllPokemons();
  }, [currentPage]);

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
        valueSearch,
        onResetForm,
        onInputChange,
        allPokemons,
        bunchPokemons,
        getPokemonByName,
        loading,
        setLoading,
        goToNextPage,
        goToPrevPage,
        currentPage,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

/*
useEffect(() => {
  const getSearchPokemon = async () => {
    try {
      const getData = await getAllPokemons();
      const data = getData.results.filter((pokemon) =>
        pokemon.name.includes(valueSearch)
      );
      const promises = data.map(async (pokemon) => {
        const pokemonRes = await fetch(pokemon.url);
        if (!pokemonRes.ok) {
          throw new Error(`Failed to fetch data for ${pokemon.name}`);
        }
        const pokemonData = await pokemonRes.json();
        return pokemonData;
      });
      const results = await Promise.all(promises);
      setAllPokemons(results);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchData = async () => {
    await getSearchPokemon();
  };
  fetchData();
  */