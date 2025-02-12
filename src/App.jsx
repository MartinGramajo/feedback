import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import { useState } from "react";
import EncapsularRutas from "./routes/EncapsularRutas";
import RutasProtegidas from "./routes/RutasProtegidas";


const App = () => {

  const usuarioEnLinea = JSON.parse(sessionStorage.getItem('usuarioLogueado')) || {};
  const [usuarioActivo, setUsuarioActivo] = useState(usuarioEnLinea);
  
  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route path="/login" element={<Login setUsuarioActivo={setUsuarioActivo}></Login>} />
        <Route
          path="/admin/*"
          element={
          <EncapsularRutas>
            <RutasProtegidas></RutasProtegidas>
          </EncapsularRutas>}
        ></Route>
      </Routes>
    </Router>
      
    </div>
  )

};


export default App;
