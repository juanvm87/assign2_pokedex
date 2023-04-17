import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../images/Pokédex_logo-removebg-preview.png";
import { PokemonContext } from "../context/PokemonProvider";

const Navigation = () => {
  const { onInputChange, valueSearch, onResetForm } =
    useContext(PokemonContext);

  const navigate = useNavigate();

  const onSearchSubmit = (e) => {
    e.preventDefault();
    navigate("/search", {
      state: valueSearch,
    });
    onResetForm();
  };
  return (
    <>
      <header className="container">
        <Link to={"/"}>
          <img className="logo-pokedex" src={logo} alt="Logo Pokedex" />
        </Link>

        <form onSubmit={onSearchSubmit}>
          <div className="form-group">
            <input
              type="search"
              name="valueSearch"
              id=""
              value={valueSearch}
              onChange={onInputChange}
              placeholder="Search pokemon"
            />
          </div>

          <button className="btn-search">Search</button>
        </form>
      </header>

      <Outlet />
    </>
  );
};

export default Navigation;