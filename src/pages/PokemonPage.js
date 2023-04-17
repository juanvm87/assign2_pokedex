import React, { useContext, useState, useEffect } from "react";
import { PokemonContext } from "../context/PokemonProvider";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const PokemonPage = () => {
  const { getPokemonByName } = useContext(PokemonContext);

  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState({});

  const { name } = useParams();

  const fetchPokemon = async (name) => {
    const data = await getPokemonByName(name);
    setPokemon(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemon(name);
  });

  return (
    <main className="container main-pokemon">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="pokemon-name-number">
            <span className="number-pokemon">#{pokemon.id}</span>
            <h1>{firstLetterUppercase(pokemon.name)}</h1>
          </div>
          <div className="header-main-pokemon">
            <div className="container-info-pokemon">
              <div className="card-types info-pokemon-type">
                {pokemon.types.map((type) => (
                  <span key={type.type.name} className={`${type.type.name}`}>
                    {type.type.name}
                  </span>
                ))}
              </div>
              <div className="info-pokemon">
                <div className="group-info">
                  <p>Height</p>
                  <span>{pokemon.height}</span>
                </div>
                <div className="group-info">
                  <p>Weight</p>
                  <span>{pokemon.weight}KG</span>
                </div>
              </div>
            </div>
            <div className="container-img-pokemon">
              <img
                src={pokemon.sprites.front_default}
                alt={`Pokemon ${pokemon?.name}`}
              />
            </div>
          </div>

          <div className="container-stats">
            <h1>Statistics</h1>
            <div className="stats">
              <div className="stat-group">
                <span>Hp</span>
                <div className="progress-bar"></div>
                <span className="counter-stat">
                  {pokemon.stats[0].base_stat}
                </span>
              </div>
              <div className="stat-group">
                <span>Attack</span>
                <div className="progress-bar"></div>
                <span className="counter-stat">
                  {pokemon.stats[1].base_stat}
                </span>
              </div>
              <div className="stat-group">
                <span>Defense</span>
                <div className="progress-bar"></div>
                <span className="counter-stat">
                  {pokemon.stats[2].base_stat}
                </span>
              </div>
              <div className="stat-group">
                <span>Special Attack</span>
                <div className="progress-bar"></div>
                <span className="counter-stat">
                  {pokemon.stats[3].base_stat}
                </span>
              </div>
              <div className="stat-group">
                <span>Special Defense</span>
                <div className="progress-bar"></div>
                <span className="counter-stat">
                  {pokemon.stats[4].base_stat}
                </span>
              </div>
              <div className="stat-group">
                <span>Speed</span>
                <div className="progress-bar"></div>
                <span className="counter-stat">
                  {pokemon.stats[5].base_stat}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

const firstLetterUppercase = (word) => {
  return word[0].toUpperCase() + word.substring(1);
};

export default PokemonPage;
