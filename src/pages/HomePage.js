import React, { useContext } from "react";

const HomePage = () => {
  return (
    <>
      <div className="card-list-pokemon container"></div>

      <div className="container-btn-next-page container">
        <button className="btn-next-page">Previous</button>

        <button className="btn-next-page">Next</button>
      </div>
    </>
  );
};

export default HomePage;
