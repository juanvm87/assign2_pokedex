import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../images/Pokédex_logo-removebg-preview.png";


const Navigation = () => {
  

  const navigate = useNavigate();

  
  return (
    <>
      <header className="container">
        <Link to={"/"}>
          <img className="logo-pokedex" src={logo} alt="Logo Pokedex" />
        </Link>

        <form>
          <div className="form-group">
            <input
              type="search"
              name="valueSearch"
              id=""
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