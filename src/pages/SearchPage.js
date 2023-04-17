import React, { useContext } from "react";
import { PokemonContext } from "../context/PokemonProvider";
import { useLocation } from "react-router-dom";
import CardPokemon from "../components/CardPokemon";
import Loader from "../components/Loader";

const SearchPage = () => {
  const location = useLocation();

  const { allPokemons, loading } = useContext(PokemonContext);

  const filteredPokemons = allPokemons.filter((pokemon) =>
    pokemon.name.includes(location.state)
  );

  return (
    <div className="container">
      <p className="p-search">
        <span>{filteredPokemons.length}</span> Pokemon found
      </p>
      {loading ? (
        <Loader />
      ) : (
        <div className="card-list-pokemon container">
          {filteredPokemons.map((pokemon) => (
            <CardPokemon pokemon={pokemon} key={pokemon.name} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
