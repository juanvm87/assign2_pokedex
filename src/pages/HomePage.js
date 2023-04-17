import React, { useContext } from "react";
import { PokemonContext } from "../context/PokemonProvider";
import CardPokemon from "../components/CardPokemon";
import Loader from "../components/Loader";
const HomePage = () => {
  const { bunchPokemons, goToNextPage, goToPrevPage, currentPage, loading } =
    useContext(PokemonContext);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="card-list-pokemon container">
          {bunchPokemons.map((pokemon) => (
            <CardPokemon pokemon={pokemon} key={pokemon.name} />
          ))}
        </div>
      )}
      <div className="container-btn-next-page container">
        {currentPage > 1 && (
          <button className="btn-next-page" onClick={goToPrevPage}>
            Previous
          </button>
        )}

        <button className="btn-next-page" onClick={goToNextPage}>
          Next
        </button>
      </div>
    </>
  );
};

export default HomePage;
