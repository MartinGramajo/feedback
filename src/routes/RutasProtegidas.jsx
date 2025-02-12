import { Routes, Route } from "react-router-dom";
import Admin from "../views/Admin";



const RutasProtegidas = () => {
  return (
    // dominio/administrador/*
    <Routes>
      <Route
        exact
        path="/"
        element={<Admin></Admin>}
      ></Route>
    </Routes>
  );
};

export default RutasProtegidas;
