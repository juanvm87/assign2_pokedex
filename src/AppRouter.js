import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}></Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
